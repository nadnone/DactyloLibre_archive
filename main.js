const { app, BrowserWindow, Menu, webContents, dialog, ipcMain } = require('electron');
const electron = require("electron");

const createMainwindow = require("./win/createMainWindow.js");
const createStatswindow = require("./win/createStatsWindow.js");

let reader;
var emplacement = 0;
let timerId;
let t = 0;


ipcMain.on("renderer", (event, arg) => {
    if(arg !== null && arg !== undefined) {
      reader = arg.charAt(emplacement);
    }
});

ipcMain.on("writer", (event, arg) => {
  if(arg === reader){
    emplacement++;
    event.reply("scoreChar", emplacement);
  }
  else {
    event.reply("scoreChar", emplacement);
  }
});

ipcMain.on("starter", (event, arg) => {
  if(arg === true){
    timerId = setInterval(timer, 1000);
  }
});

ipcMain.on("time", (event, arg) => {
  event.reply("time", t);
});

function timer(){
  if(emplacement == 12){
    clearTimeout(timerId);
    dialog.showMessageBox({
      title: "Votre score",
      type: "info",
      message: "Votre score est de " + emplacement + " caractères en " + t + " secondes !",
      buttons: ["Voir"]
    }, (response) => {
      if(response !== null && response !== undefined){
          createStatswindow();
      }
    });
  }
  t++;
}


app.on('ready', () => {
    createMainwindow();
});
