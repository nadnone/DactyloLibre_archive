const { app, BrowserWindow, Menu, webContents, dialog, ipcMain } = require('electron');
const electron = require("electron");
let path = require("path");
const nativeImage = require("electron").nativeImage;
const rootPath = require("electron-root-path").rootPath;

let image = nativeImage.createFromPath(rootPath + '/res/icons/icon.png');

module.exports = function (){

  image.setTemplateImage(true);

  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 800,
    height: 500,
    icon: image,
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
