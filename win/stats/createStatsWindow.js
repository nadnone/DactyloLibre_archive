const { app, BrowserWindow, Menu, webContents, dialog, ipcMain } = require('electron');
const electron = require("electron");

module.exports = function (){

  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./win/stats/stats.html');
  //win.webContents.openDevTools();

  const template = [
    {
      label: "A propos",
      click: () => {
        electron.shell.openExternal("https://nadirfelder.xyz");
      }
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
