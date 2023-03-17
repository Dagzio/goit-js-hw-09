import { Notify } from 'notiflix/build/notiflix-notify-aio';


const delayInput = document.querySelector('input[name="delay"');
const step = document.querySelector('input[name="step"');
const amountInput = document.querySelector('input[name="amount"');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('submit', createPromise);

 const promise = new Promise((resolve, reject) => {
   resolve = setInterval(createPromise, delayInput.value);
   
    
  });





function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
     

    } else {

    // Reject
      
  };
  
  return promise;
  
  
};







createPromise(3, 1500)
  .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
