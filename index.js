const electron = require("electron");
const ipc = electron.ipcRenderer;

let reader = document.getElementById("what2write").innerText;
let scoreChar = document.getElementById("char");
let emplacement = 0;
let isStarted = false;
let timerUpdate;

window.onload = () => {
  init();
};

function init(){
  compare_text();
  timerUpdate = setInterval(update, 600);
}

function update(){
  ipc.send("time");
  if(isStarted === false){
    clearTimeout(timerUpdate);
  }
}

function compare_text(){

  window.addEventListener("keypress", (event, arg) => {
    if(isStarted){
      let writerChar = event.key.toString();
      document.getElementById("affichage_lettres").innerText = event.key.toString();
      ipc.send("renderer", reader);
      ipc.send("writer", writerChar);
    }else {
      if(event.keyCode === 32){
        ipc.send("starter", true);
        isStarted = true;
        document.getElementById("start_info").innerText = "Le temps est compté !";
      }
    }
  });
}

ipc.on("scoreChar", (event, arg) => {
  scoreChar.innerText = arg+1;
  emplacement = arg;
  console.log(arg);
});
ipc.on("time", (event, arg) => {
  document.getElementById("time").innerText = arg;
});
