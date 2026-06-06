# 📌 Sticky Note — Desktop App

A lightweight, always-on-top desktop sticky note built with **Electron + HTML/CSS/JS**.  
Supports themes, custom fonts, resizable window, and auto-save.

![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![Electron](https://img.shields.io/badge/Electron-29-47848F?logo=electron)
![Node](https://img.shields.io/badge/Node.js-20%20LTS-339933?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 📌 Always on top of all windows
- 🎨 7 built-in themes — Yellow, Pink, Blue, Green, Purple, Orange, Dark
- 🔤 5 font choices with adjustable font size
- ↔ Resizable by dragging any edge or corner
- 💾 Auto-saves note text, position, size, and settings
- 📅 Shows today's date inside the note
- 🔢 Live character counter
- 🔲 Minimize to just the title bar

---

## 📸 Preview

> Amber header · Ruled paper lines · Handwriting fonts · Settings panel

---

## 📁 Project Structure

```
sticky-notes-electron/
│
├── main.js          ← Electron main process (window, save/load, IPC)
├── preload.js       ← Secure bridge between renderer and main process
├── index.html       ← All UI — HTML, CSS, and JavaScript in one file
├── package.json     ← Project config and dependencies
└── README.md        ← This file
```

Your note data is saved automatically to your OS app-data folder:
- **Windows:** `C:\Users\<you>\AppData\Roaming\sticky-note\note_data.json`
- **macOS:** `~/Library/Application Support/sticky-note/note_data.json`
- **Linux:** `~/.config/sticky-note/note_data.json`

---

## ⚙️ Requirements

| Tool | Version | Download |
|------|---------|----------|
| Node.js | **20 LTS** (recommended) | https://nodejs.org |
| npm | Comes with Node.js | — |

> ⚠️ Node.js v21+ may cause issues with Electron. Use **v20 LTS** for best compatibility.

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/ParvezAli12/sticky-notes-electron.git
cd sticky-notes-electron
```

### 2. Install dependencies

```bash
npm install
```

> This downloads Electron (~150MB). Only needed once.

### 3. Run the app

```bash
npm start
```

The sticky note window will appear in the **bottom-right corner** of your screen.

---

## 🖱️ How to Use

| Action | How |
|--------|-----|
| **Write a note** | Click the yellow area and start typing |
| **Move the window** | Click and drag the colored header bar |
| **Resize** | Hover over any edge or corner → drag to resize |
| **Open Settings** | Click the ⚙ button in the header |
| **Change theme** | Settings → pick a color theme |
| **Change font** | Settings → pick a font style |
| **Adjust font size** | Settings → drag the size slider |
| **Minimize** | Click `─` → shrinks to just the title bar |
| **Restore** | Click `□` → expands back to full size |
| **Close** | Click `✕` → saves and closes |

Everything is **auto-saved** — text, position, size, theme, and font.

---

## 🎨 Themes

| Theme | Header | Background |
|-------|--------|------------|
| Yellow (default) | Amber | Warm yellow |
| Pink | Hot pink | Soft pink |
| Blue | Blue | Light blue |
| Green | Green | Mint |
| Purple | Violet | Lavender |
| Orange | Orange | Cream |
| Dark | Dark navy | Dark slate |

---

## 🔤 Fonts

| Font | Style |
|------|-------|
| Caveat | Handwriting (default) |
| Patrick Hand | Clean handwriting |
| Indie Flower | Playful handwriting |
| Nunito | Rounded sans-serif |
| Courier Prime | Monospace / typewriter |

---

## 🪟 Auto-start on Windows (Optional)

To make the note open every time Windows starts:

1. Press `Win + R` → type `shell:startup` → press Enter
2. Create a shortcut to `run.bat` (or to `npm start` in the project folder)
3. Place the shortcut in the Startup folder

---

## 📦 Build a Standalone .exe (Optional)

To package the app into a distributable `.exe` installer:

```bash
npm install --save-dev electron-builder
```

Add to `package.json` under `"scripts"`:
```json
"build": "electron-builder --win"
```

Then run:
```bash
npm run build
```

Output will be in the `dist/` folder. No Node.js required to run the `.exe`.

---

## 🛠️ Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm install` fails | Make sure Node.js 20 LTS is installed — run `node -v` to check |
| Electron failed to install | Delete `node_modules` folder, then run `npm install` again |
| Window doesn't appear | It opens bottom-right by default — check behind other windows. Delete `note_data.json` to reset position |
| Fonts look wrong | Requires internet connection on first launch to load Google Fonts |
| Path errors on Windows | Avoid spaces in the folder path. Use `C:\StickyNote` instead of `C:\sticky note` |

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## 👤 Author

**Parvez Ali**  
GitHub: [@ParvezAli12](https://github.com/ParvezAli12)
