const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const fs   = require('fs');

const SAVE_FILE = path.join(app.getPath('userData'), 'note_data.json');

function loadData() {
  try {
    if (fs.existsSync(SAVE_FILE))
      return JSON.parse(fs.readFileSync(SAVE_FILE, 'utf-8'));
  } catch (_) {}
  return { text: '', x: null, y: null, w: 300, h: 340, minimized: false, theme: 'yellow', font: 'Caveat' };
}

function saveData(data) {
  fs.writeFileSync(SAVE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

let win;
const MIN_W = 220, MIN_H = 180, HEADER_H = 48;

function createWindow() {
  const data    = loadData();
  const display = screen.getPrimaryDisplay().workAreaSize;
  const W = data.w || 300;
  const H = data.h || 340;
  const X = data.x ?? (display.width  - W - 30);
  const Y = data.y ?? (display.height - H - 30);

  win = new BrowserWindow({
    width: W, height: H, x: X, y: Y,
    minWidth: MIN_W, minHeight: MIN_H,
    frame: false, transparent: true,
    alwaysOnTop: true, resizable: false, hasShadow: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
  if (data.minimized) win.setSize(W, HEADER_H);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());

// ── IPC ───────────────────────────────────────────────────────────────────────
ipcMain.handle('load-note', () => loadData());

ipcMain.on('save-note', (_, text) => {
  const d = loadData(); d.text = text; saveData(d);
});

ipcMain.on('save-settings', (_, settings) => {
  const d = loadData();
  Object.assign(d, settings);
  saveData(d);
});

ipcMain.on('toggle-minimize', (_, minimized) => {
  const [w, h] = win.getSize();
  const d = loadData();
  if (minimized) {
    win.setSize(w, HEADER_H);
  } else {
    win.setSize(d.w || 300, d.h || 340);
  }
  d.minimized = minimized;
  saveData(d);
});

// Move window — only called from header drag, NOT from resize
ipcMain.on('move-window', (_, { dx, dy }) => {
  const [x, y] = win.getPosition();
  win.setPosition(x + dx, y + dy);
  const d = loadData(); d.x = x + dx; d.y = y + dy; saveData(d);
});

// Resize window — only called from edge handles
ipcMain.on('resize-window', (_, { dx, dy, dir }) => {
  const [x, y] = win.getPosition();
  const [w, h] = win.getSize();
  let nx = x, ny = y, nw = w, nh = h;

  if (dir.includes('e'))  nw = Math.max(MIN_W, w + dx);
  if (dir.includes('s'))  nh = Math.max(MIN_H, h + dy);
  if (dir.includes('w')) { nw = Math.max(MIN_W, w - dx); if (nw !== w) nx = x + dx; }
  if (dir.includes('n')) { nh = Math.max(MIN_H, h - dy); if (nh !== h) ny = y + dy; }

  win.setBounds({ x: nx, y: ny, width: nw, height: nh });
  const d = loadData(); d.w = nw; d.h = nh; d.x = nx; d.y = ny; saveData(d);
});

ipcMain.on('close-app', () => app.quit());
