const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  loadNote:       ()        => ipcRenderer.invoke('load-note'),
  saveNote:       (text)    => ipcRenderer.send('save-note', text),
  saveSettings:   (s)       => ipcRenderer.send('save-settings', s),
  toggleMinimize: (state)   => ipcRenderer.send('toggle-minimize', state),
  moveWindow:     (delta)   => ipcRenderer.send('move-window', delta),
  resizeWindow:   (data)    => ipcRenderer.send('resize-window', data),
  closeApp:       ()        => ipcRenderer.send('close-app'),
});
