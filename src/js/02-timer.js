import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startTimerBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

startTimerBtn.setAttribute('disabled', '');
startTimerBtn.addEventListener('click', onStartBtnClick);

let isActive = false;
let timerId = null;
let choosedDate = null;

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
    choosedDate = selectedDates.getTime();

    if (choosedDate <= Date.now()) {
        startTimerBtn.setAttribute('disabled', '');

        Confirm.show(
        'Invalid Date For Timer',
        'Plsease choose a date in future',
        'OK');
    };

    if (choosedDate > Date.now()) {
        startTimerBtn.removeAttribute('disabled');
    };
};


function onStartBtnClick() {

    if (isActive === true) {
        return;
    };
    isActive = true;

    timerId = setInterval(startTimer, 1000);
};

function startTimer() {
    const differenceTime = choosedDate - Date.now();
    const convertedTime = convertMs(differenceTime);
    renderingTimer(convertedTime);
    if (differenceTime < 1000) {
        Notify.success('Time is end!');
        clearInterval(timerId);
    };
};


function renderingTimer({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
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

