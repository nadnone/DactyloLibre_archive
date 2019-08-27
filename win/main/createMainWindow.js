const { app, BrowserWindow, Menu, webContents, dialog, ipcMain } = require('electron');
const electron = require("electron");

module.exports = function (){

  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('./win/main/index.html');
  //win.webContents.openDevTools();
  win.on("close", () => {
    app.quit();
  });
  const template = [
    {
      label: "A propos",
      click: () => {
        electron.shell.openExternal("https://github.com/spoutnik911/DactyloLibre");
      }
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
