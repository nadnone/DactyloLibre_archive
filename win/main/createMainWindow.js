const { app, BrowserWindow, Menu, webContents, dialog, ipcMain } = require('electron');
const electron = require("electron");
const nativeImage = require("electron").nativeImage;
const rootPath = require("electron-root-path").rootPath;

const createStatsWindow = require('../../win/stats/createStatsWindow.js');
const statsWindowListener = require('../../win/stats/statsWindowListener.js');

let image = nativeImage.createFromPath(rootPath + '/res/icons/icon.png');

module.exports = function (){

  console.log(rootPath);
  image.setTemplateImage(true);

  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 800,
    height: 800,
    icon: image,
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
      ,
      {
        label: "Scores",
        click: () => {
          createStatsWindow();
          statsWindowListener(0, 0, 0);

        }
      }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
