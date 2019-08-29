const { app, BrowserWindow, Menu, webContents, dialog, ipcMain, session} = require('electron');
const electron = require("electron");


const createMainwindow = require("./win/main/createMainWindow.js");
const createStatswindow = require("./win/stats/createStatsWindow.js");
const loadWhat2Write = require("./func/loadWhat2Write.js");
const statsWindowListener = require("./win/stats/statsWindowListener.js");

let reader;
let emplacement = 0;
let timerId;
let t = 0;
let scoreMax = 0;
let what2write_str = false;
let what2write_path = false;
let fautes = 0;

ipcMain.on("fautes", (event, arg) => {
  fautes = arg;
});

ipcMain.on("writer", (event, arg) => {
  reader = what2write_str.charAt(emplacement);
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
    event.reply("scoreChar", 0);
    timerId = setInterval(timer, 1000);

  }
});

ipcMain.on("time", (event, arg) => {
  event.reply("time", t);
});
ipcMain.on("initW2W", (event, arg) => {
  what2write_str = loadWhat2Write();
  if(what2write_str !== false && what2write_str !== undefined && what2write_str !== null){
    what2write_str = what2write_str.replace("\n", "");
    event.reply("initW2W", what2write_str);
    scoreMax = what2write_str.length;
  }
  else {
    console.log(what2write_str);
  }
});

function timer(){
  if(emplacement === scoreMax){
    clearTimeout(timerId);
    dialog.showMessageBox({
      title: "Votre score",
      type: "info",
      message: "Votre score est de " + emplacement + " caractères en " + t + " secondes !",
      buttons: ["Voir"]
    }, (response) => {
      if(response !== null && response !== undefined){
          createStatswindow();
          statsWindowListener(emplacement+1, t, fautes);
      }
    });
  }
  t++;
}


app.on('ready', () => {
    createMainwindow();
});
