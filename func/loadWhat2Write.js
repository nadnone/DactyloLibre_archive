const { app, BrowserWindow, Menu, webContents, dialog, ipcMain } = require('electron');
const electron = require("electron");
const readTextFile = require("./readTextFile.js");


module.exports = function loadWhat2Write() {
  try {
    options = {
      title: "Fichier texte à lire",
      filters: [
        {
          name: "Fichier texte",
          extensions: ["txt"]
        }
      ]
    }
    let result = dialog.showOpenDialogSync(options)
      if(result.canceled){
        app.exit(0);
      }
      let str = readTextFile(result[0]);
      if(str !== false && str !== undefined && str !== null){
        //console.log(str);
        return str;
      }
      else {
        return false;
      }
  } catch (e) {
    console.log(e);
  }


};
