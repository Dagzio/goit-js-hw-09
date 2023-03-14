const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let startBtnId = null;

stopBtn.setAttribute('disabled', '');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartBtnClick() {

    startBtn.setAttribute('disabled', '');
    stopBtn.removeAttribute('disabled');

   startBtnId = setInterval(() => {
        document.querySelector("body").style.backgroundColor = getRandomHexColor();
   }, 1000);
    
};

function onStopBtnClick() {

    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', '');

    clearInterval(startBtnId);
}


