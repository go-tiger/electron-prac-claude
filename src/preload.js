const { contextBridge, ipcRenderer } = require('electron');

// 렌더러 프로세스에 API 노출
contextBridge.exposeInMainWorld('launcher', {
  getVersions: async () => {
    const appVersion = await ipcRenderer.invoke('get-app-version');
    return {
      app: appVersion,
      node: process.versions.node,
      chrome: process.versions.chrome,
      electron: process.versions.electron,
    };
  },
  onUpdateStatus: callback => {
    ipcRenderer.on('update-status', (_event, text) => callback(text));
  },
});
