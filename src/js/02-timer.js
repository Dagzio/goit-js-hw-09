import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startTimerBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');


startTimerBtn.setAttribute('disabled', '');
const startTime = Date.now();


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        validationDate(selectedDates[0]);
    },
};

flatpickr("#datetime-picker", options);




function validationDate(selectedDates) {
    const choosedDate = selectedDates.getTime();

    if (choosedDate <= Date.now()) {
        startTimerBtn.setAttribute('disabled', '');
        window.alert("Plsease choose a date in future");
    };

    if (choosedDate > Date.now()) {
        startTimerBtn.removeAttribute('disabled');
    };
}

startTimerBtn.addEventListener('click', onStartBtnClick);


function onStartBtnClick() {

    setInterval(() => { 
        const currentTime = Date.now();
        const differenceTime = currentTime - startTime;
        const convertedTime = convertMs(differenceTime);
        console.log(convertedTime);
    }, 1000);
    
};


function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

