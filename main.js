const {app, BrowserWindow, globalShortcut, Menu} = require('electron');

let mainWindow;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
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
  mainWindow.loadURL('http://www1.brain.fm/app/player');
  //mainWindow.webContents.openDevTools();

  mainWindow.on('app-command', function(e, cmd) {
    if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack();
    } else if (cmd === 'browser-forward' && mainWindow.webContents.canGoForward()) {
      mainWindow.webContents.goForward();
    }
  });

  // Global shortcuts
  globalShortcut.register('MediaNextTrack', skip);
  globalShortcut.register('MediaPlayPause', playPause);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  addMenu();
});

function skip() {
  if (mainWindow == null) {
    return;
  }

  mainWindow.webContents.executeJavaScript('document.getElementsByClassName("modules-music-player-css-Skip__skip___iZcPm")[0].click()');
}

function playPause() {
  if (mainWindow == null) {
    return;
  }

  mainWindow.webContents.executeJavaScript('document.getElementsByClassName("modules-music-player-css-PlayControl__wrapper___2ROhW")[0].click()');
}

function addMenu() {
  if (process.platform === 'win32') {
    return
  }

  var menuTemplate = [{
    label: 'Brain.fm',
    submenu: [
      {label: 'About Application', selector: 'orderFrontStandardAboutPanel:'},
      {type:  'separator'},
      {role:  'minimize'},
      {label: 'Hide Brain.fm', role: 'hide'},
      {role:  'hideothers'},
      {role:  'unhide'},
      {type:  'separator'},
      {label: 'Quit', accelerator: 'Command+Q', click: function(){app.quit();}}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {label: 'Undo',       accelerator: 'CmdOrCtrl+Z',       selector: 'undo:'},
      {label: 'Redo',       accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
      {type:  'separator'},
      {label: 'Cut',        accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
      {label: 'Copy',       accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
      {label: 'Paste',      accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
      {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'}
    ]
  }];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}