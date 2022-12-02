const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

class MainWindow extends BrowserWindow {
  constructor(isDev) {
    super({
      width: 1024,
      height: 768,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    })

    let indexPath;
    if (isDev && process.argv.indexOf('--noDevServer') === -1) {
      indexPath = url.format({
        protocol: 'http:',
        host: 'localhost:8080',
        pathname: 'index.html',
        slashes: true
      })
    } else {
      indexPath = url.format({
        protocol: 'file:',
        pathname: path.join(__dirname, 'dist', 'index.html'),
        slashes: true
      })
    }
    this.loadURL(indexPath);

    // Don't show until we are ready and loaded
    this.once('ready-to-show', () => {
      this.show()
      if (isDev) {
        // const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

        // installExtension(REACT_DEVELOPER_TOOLS)
        //   .catch(err => console.log('Error loading React DevTools: ', err))
        // this.webContents.openDevTools()
      }
    })
  }
}

module.exports = MainWindow;