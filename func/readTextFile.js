const { app, BrowserWindow, Menu, webContents, dialog, ipcMain } = require('electron');
const electron = require("electron");

let fs = require('fs');

module.exports = function readTextFile(filePath){
    try {
        let data = fs.readFileSync(filePath);
        data = data.toString();
        if(data !== null && data !== undefined && data !== false){
          //console.log(data);
          return data;
        }
        else {
          return false;
        }
    } catch (e) {
      console.log(e);
    }
  };
