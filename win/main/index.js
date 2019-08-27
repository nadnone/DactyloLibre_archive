const electron = require("electron");
const ipc = electron.ipcRenderer;

let reader = "";
let scoreChar = document.getElementById("char");
let emplacement = 0;
let isStarted = false;
let timerUpdate;
let waitFor;
let initialized = false;
let argMemo;

window.onload = () => {
  init();
};

function init(){
  compare_text();
}

function generate_reader(){
  for (let i = 0; i < 120; i++) {

    let reader_letters = document.createElement("span");
    reader_letters.setAttribute("id", "readerChar"+i);
    reader_letters.setAttribute("class", "readerChar");
    document.getElementById("what2write").appendChild(reader_letters);
  }
}

function update(){
  ipc.send("time");
  if(isStarted === false){
    clearTimeout(timerUpdate);
  }
}
function compare_text(){

  window.addEventListener("keypress", (event, arg) => {
      if(isStarted && initialized){
        let writerChar = event.key.toString();
        document.getElementById("affichage_lettres").innerText = event.key.toString();
        ipc.send("writer", writerChar);
      }
      else if(event.keyCode === 32 && !isStarted && !initialized){
          ipc.send("initW2W");
      }
      else if(event.keyCode === 32 && initialized && !isStarted){
          document.getElementById("start_info").innerText = "Le temps est compté !";
          timerUpdate = setInterval(update, 600);
          isStarted = true;
          ipc.send("starter", true);
      }
    });
}
ipc.on("scoreChar", (event, arg) => {
  if(argMemo === arg){
    document.getElementById("affichage_lettres").style.color = "rgba(207, 0, 15, 1)";
  }
  else {
    document.getElementById("affichage_lettres").style.color = "black";
  }
  scoreChar.innerText = arg+1;
  emplacement = arg;
  document.getElementById("affichage_readerm2").innerText = reader.charAt(arg-2);
  document.getElementById("affichage_readerm1").innerText = reader.charAt(arg-1);
  document.getElementById("affichage_reader").innerText = reader.charAt(arg);
  document.getElementById("affichage_readerp1").innerText = reader.charAt(arg+1);
  document.getElementById("affichage_readerp2").innerText = reader.charAt(arg+2);
  argMemo = arg;
  for (let i = 0; i < 120; i++) {
      let readerChar = document.getElementById("readerChar"+i);
      if(reader.charAt(arg+i) !== undefined && reader.charAt(arg+i) !== null){
        readerChar.innerText = reader.charAt(arg+i);
      }
  }
  //console.log(arg);
});
ipc.on("time", (event, arg) => {

  let h = (parseFloat(arg)/parseFloat(3600)).toString();
  let min = (parseFloat(arg)/parseFloat(60)).toString();
  let sec = ((((parseFloat(arg)/parseFloat(60)) - parseFloat((parseFloat(arg)/parseFloat(60)).toString().split(".")[0])))*60).toString();
      sec = (sec.charAt(0) + sec.charAt(1)).replace(".", "");

  h = h.split(".")[0];
  min = min.split(".")[0];



  document.getElementById("time").innerText = h + ":" + min +":" + sec;
});
ipc.on("initW2W", (event, arg) => {
  //document.getElementById("what2write").innerHTML = arg;
  reader = arg;
  generate_reader();
  initialized = true;
});
