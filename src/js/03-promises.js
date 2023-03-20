import { Notify } from 'notiflix/build/notiflix-notify-aio';


const formEl = document.querySelector(".form");
formEl.addEventListener('submit', onSubmitForm);


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
    } else {
        reject({ position, delay });
    }
    }, delay)
    
    
  });

};


function onSubmitForm(event) {
  event.preventDefault();
  let delayValue = Number(formEl.delay.value);
  for (let i = 0; i <= formEl.amount.value; i += 1){
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
    delayValue += Number(formEl.step.value);
  }
};


