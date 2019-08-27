const electron = require("electron");
const ipc = electron.ipcRenderer;
const fs = require("fs");
const getAppdataPath = require('appdata-path');

let score = 0;
let temps = 0;

let scoreSpan = document.getElementById("scoreChar");
let tableScore = document.getElementById("tableau_des_scores");

window.onload = () => {
  init();
};


function init(){
  afficherScore();
}

function afficherScore(){
  ipc.send("score-request");
}

ipc.on("score-reply", (event, arg) => {
  let data = arg.split(",");
  score = data[0];
  temps = data[1];

  let scoreShow = (parseFloat(score)/parseFloat(temps)).toString();

  function getdecimales(){
    if(scoreShow.split(".") !== null && scoreShow.split(".") !== undefined){
      scoreShow = scoreShow.split(".");
      scoreShow = scoreShow[0] + "." + scoreShow[1].charAt(0) + scoreShow[1].charAt(1);
    }
  }


  scoreSpan.innerText = scoreShow;

  try {
    let d = new Date();
    fs.appendFileSync(getAppdataPath("dactylolibre")+"/stats", score + "," + temps + "," + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + "\n");
  } catch (e) {
    console.log(e);
  }

  try {
    let fileR = fs.readFileSync(getAppdataPath("dactylolibre")+"/stats");
    fileR = fileR.toString().split("\n");
    let tr = document.createElement("div");
    let thScore = document.createElement("div");
    let thTime = document.createElement("div");
    let thRatio = document.createElement("div");
    let thDate = document.createElement("div");

    tr.className = "tr";
    thScore.className = "th"; thTime.className = "th";
    thRatio.className = "th"; thDate.className = "th";

    thScore.innerText = "Caractères tapés\n[char]";
    thTime.innerText = "Temps final\n[sec]";
    thRatio.innerText = "Caractères /\nTemps\n[char/sec]";
    thDate.innerText = "Date\n[J/M/A]";

    tr.appendChild(thScore);
    tr.appendChild(thTime);
    tr.appendChild(thRatio);
    tr.appendChild(thDate);
    tableScore.appendChild(tr);

    let tableDiv = document.createElement("div");
    tableDiv.className = "tableDiv";
    for (var i = 0; i < fileR.length-1; i++) {
      let tr = document.createElement("div");
      let tdscore = document.createElement("div");
      let tdTime = document.createElement("div");
      let tdRatio = document.createElement("div");
      let tdDate = document.createElement("div");

      tr.className = "tr";
      tdscore.className = "td"; tdTime.className = "td";
      tdRatio.className = "td"; tdDate.className = "td";

      tdDate.innerText = fileR[i].split(",")[2];
      tdscore.innerText = fileR[i].split(",")[0];
      tdTime.innerText = fileR[i].split(",")[1];
      let ratio = (parseFloat(fileR[i].split(",")[0])/parseFloat(fileR[i].split(",")[1])).toString();
      if(ratio.split(".")[1] !== null && ratio.split(".")[1] !== undefined){
        tdRatio.innerText = ratio.split(".")[0] + "," + ratio.split(".")[1].charAt(0) + ratio.split(".")[1].charAt(1);
      }
      else {
        tdRatio.innerText = ratio;
      }

      tr.appendChild(tdscore);
      tr.appendChild(tdTime);
      tr.appendChild(tdRatio);
      tr.appendChild(tdDate);
      tableDiv.appendChild(tr);
    }
    tableScore.appendChild(tableDiv);

  } catch (e) {
    console.log(e);
  }

});
