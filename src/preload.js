const { contextBridge, ipcRenderer } = require('electron');
const { version } = require('../package.json');

// 렌더러 프로세스에 API 노출
contextBridge.exposeInMainWorld('launcher', {
  getVersions: () => {
    return {
      app: version,
      node: process.versions.node,
      chrome: process.versions.chrome,
      electron: process.versions.electron,
    };
  },
  onUpdateStatus: callback => {
    ipcRenderer.on('update-status', (_event, text) => callback(text));
  },
});
