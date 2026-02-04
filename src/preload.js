const { contextBridge } = require('electron');

// 렌더러 프로세스에 API 노출
contextBridge.exposeInMainWorld('launcher', {
  getVersions: () => {
    console.log('🚀 ~ versions:', process.versions);
    return {
      node: process.versions.node,
      chrome: process.versions.chrome,
      electron: process.versions.electron,
    };
  },
});
