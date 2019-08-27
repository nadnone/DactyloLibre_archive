const { app, BrowserWindow, Menu, webContents, dialog, ipcMain } = require('electron');
const electron = require("electron");


module.exports = function statsWindowListener(score, temps){

  ipcMain.on("score-request", (event, arg) => {
    event.reply("score-reply", score + "," + temps);
  });

};
