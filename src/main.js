const { app, BrowserWindow } = require('electron')
const path = require('path')

// 개발 모드에서 핫 리로드 활성화
try {
  require('electron-reloader')(module)
} catch {}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    frame: true,
    backgroundColor: '#1a1a1a'
  })

  win.loadFile('src/renderer/index.html')

  // 개발 중에는 DevTools 열기
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
