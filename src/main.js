const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

// 개발 모드에서 핫 리로드 활성화
try {
  require('electron-reloader')(module);
} catch {}

let mainWindow = null;

// IPC 핸들러: 앱 버전 정보 요청
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// 자동 업데이트 이벤트 리스너
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('업데이트 확인 중...');
});

autoUpdater.on('update-available', info => {
  sendStatusToWindow(`새 버전 발견: v${info.version}`);
});

autoUpdater.on('update-not-available', () => {
  sendStatusToWindow('최신 버전입니다');
});

autoUpdater.on('error', err => {
  sendStatusToWindow(`업데이트 오류: ${err}`);
});

autoUpdater.on('download-progress', progressObj => {
  let message = `다운로드 중: ${Math.round(progressObj.percent)}%`;
  sendStatusToWindow(message);
});

autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow('업데이트 다운로드 완료. 재시작 후 적용됩니다.');
  // 5초 후 자동 재시작
  setTimeout(() => {
    autoUpdater.quitAndInstall();
  }, 5000);
});

function sendStatusToWindow(text) {
  console.log(text);
  if (mainWindow) {
    mainWindow.webContents.send('update-status', text);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    frame: true,
    backgroundColor: '#1a1a1a',
  });

  mainWindow.loadFile('src/renderer/index.html');

  // 개발 중에는 DevTools 열기
  mainWindow.webContents.openDevTools();

  // 윈도우가 로드된 후 업데이트 확인
  mainWindow.webContents.on('did-finish-load', () => {
    autoUpdater.checkForUpdates();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
