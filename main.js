const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'Brain.fm',
    webSecurity: false,
    'node-integration': false,
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL('http://brain.fm/app/player');
  //mainWindow.webContents.openDevTools();

  mainWindow.on('app-command', function(e, cmd) {
    if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack();
    } else if (
      cmd === 'browser-forward' &&
      mainWindow.webContents.canGoForward()
    ) {
      mainWindow.webContents.goForward();
    }
  });

  // Global shortcuts..
  globalShortcut.register('MediaNextTrack', skip);
  globalShortcut.register('MediaPlayPause', playPause);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

function skip() {
  if (mainWindow == null) {
    return;
  }

  mainWindow.webContents.executeJavaScript('document.getElementsByClassName(\'modules-music-player-css-Skip__skip___iZcPm\')[0].click()');
}

function playPause() {
  if (mainWindow == null) {
    return;
  }

  mainWindow.webContents.executeJavaScript('document.getElementsByClassName(\'modules-music-player-css-PlayControl__wrapper___2ROhW\')[0].click()');
}
