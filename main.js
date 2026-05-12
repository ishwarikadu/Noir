const { app, BrowserWindow, ipcMain, dialog, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');

nativeTheme.themeSource = 'dark';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 760,
    minHeight: 520,
    backgroundColor: '#080808',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'hidden',
    frame: false,
    icon: path.join(__dirname, 'assets', process.platform === 'win32' ? 'noir.ico' : 'noir-512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false
    },
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Window controls
ipcMain.on('window-minimize', () => mainWindow?.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized()) mainWindow.unmaximize();
  else mainWindow?.maximize();
});
ipcMain.on('window-close', () => mainWindow?.close());

// File dialog
ipcMain.handle('open-files', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Audio Files', extensions: ['mp3','wav','ogg','flac','m4a','aac','wma','opus'] }]
  });
  if (result.canceled) return [];
  return result.filePaths.map(fp => ({
    path: fp,
    name: path.basename(fp),
    buffer: fs.readFileSync(fp).toString('base64'),
    mime: getMime(fp)
  }));
});

function getMime(fp) {
  const ext = path.extname(fp).toLowerCase();
  const map = { '.mp3':'audio/mpeg','.wav':'audio/wav','.ogg':'audio/ogg','.flac':'audio/flac','.m4a':'audio/mp4','.aac':'audio/aac','.wma':'audio/x-ms-wma','.opus':'audio/ogg' };
  return map[ext] || 'audio/mpeg';
}
