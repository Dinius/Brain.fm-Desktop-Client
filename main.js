var app            = require('app'),
		browserWindow  = require('browser-window'),
		globalShortcut = require('global-shortcut'),
		mainWindow     = null;

app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', function () {
	mainWindow = new browserWindow({
		width             : 1280,
		height            : 720,
		'title'           : 'Brain.fm',
		webSecurity       : false,
		'node-integration': false
	});

	mainWindow.setMenu(null);
	mainWindow.loadURL('http://brain.fm');
	//mainWindow.webContents.openDevTools();

	mainWindow.on('app-command', function (e, cmd) {
		if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
			mainWindow.webContents.goBack();
		}
		else if (cmd === 'browser-forward' && mainWindow.webContents.canGoForward()) {
			mainWindow.webContents.goForward();
		}
	});

	// Global shortcuts..
	globalShortcut.register('MediaNextTrack', function () {skip();});
	globalShortcut.register('MediaPlayPause', function () {playPause();});
	//globalShortcut.register('MediaPreviousTrack', function() {});

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});


function skip() {
	if (mainWindow == null) {
		return;
	}
	// todo
}

function playPause() {
	if (mainWindow == null) {
		return;
	}

	mainWindow.webContents.executeJavaScript('$("#play_button").click()');
}
