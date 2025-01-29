// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer')
/* const { remote } = require('electron')
 */

contextBridge.exposeInMainWorld('appAPI', {
    minimize: () => ipcRenderer.send('window-action', 'minimize'),
    maximize: () => ipcRenderer.send('window-action', 'maximize'),
    close: () => ipcRenderer.send('window-action', 'close'),
})
contextBridge.exposeInMainWorld('GoidaZvonAPI', {
    sendEvent: (...event) => ipcRenderer.send(...event),
    receiveEvent: (...event) => ipcRenderer.on(...event),
    createServer: (serverInfo) => {
      ipcRenderer.send('create-server', serverInfo)
    },
    createChannel: (channelInfo) => {
      ipcRenderer.send('create-channel', channelInfo)
    },

/*   minimize: () => {
    console.log('[preload] minimize');
    remote.getCurrentWindow().minimize();
  },
  maximize: () => {
    console.log('[preload] maximize');
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  },
  close: () => {
    console.log('[preload] close');
    remote.getCurrentWindow().close();
  } */
})

contextBridge.exposeInMainWorld('app', {
    isDebugEnabled: true
})