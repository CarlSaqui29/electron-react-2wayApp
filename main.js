const { app, ipcMain, screen } = require('electron');
const MainWindow = require('./MainWindow');
const SecondWindow = require('./SecondWindow');

let mainWindow;
let secondWindow;
let isDev = false
let externalDisplay;

// variable value for 2nd screen
let x, y = 0;

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
  isDev = true
}

const createMainWindow = () => {
  mainWindow = new MainWindow(isDev);
  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

const createSecondWindow = (x,y) => {
  secondWindow = new SecondWindow({x,y}, isDev);
}

app.whenReady().then(() => {
  // display main window
  createMainWindow();
    
  // get the displays if there is 2nd monitor
  const displays = screen.getAllDisplays();
  // set the external positin values
  externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })
  
  if (externalDisplay) {
    x = externalDisplay.bounds.x + 50;
    y = externalDisplay.bounds.y + 50;
    
  }
})

ipcMain.on('msg', () => {
  createSecondWindow(x,y);
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})
