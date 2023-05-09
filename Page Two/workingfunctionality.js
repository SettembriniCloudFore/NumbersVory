'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input[type="date"]'),
    remaining = document.getElementById('remaining'),
    btn = document.querySelector('.btn'),
    daysSlot = document.querySelectorAll('.time__slot')[0],
    hoursSlot = document.querySelectorAll('.time__slot')[1],
    minutesSlot = document.querySelectorAll('.time__slot')[2],
    secondsSlot = document.querySelectorAll('.time__slot')[3],
    wrapperContainer = document.querySelector('.wrapper'),
    noBirthday = document.querySelector('.no__birthday__wrapper');

  let inputValue = input.value;
  let changeDate = false;
  let timeInterval;

  function daysHoursMinutesSecondsCalc(dateToCalc) {
    const selectedDate = new Date(dateToCalc),
          month = selectedDate.getMonth(),
          day = selectedDate.getDate(),
          currentYear = new Date().getFullYear(),
          upcomingBirthday = new Date(currentYear, month, day),
          t = Date.parse(upcomingBirthday) - Date.parse(new Date()),
          daysUntil = Math.floor(t / (1000 * 60 * 60 * 24)),
          hoursUntil = Math.floor((t / (1000 * 60 * 60)) % 24),
          minutesUntil = Math.floor((t / (1000 * 60)) % 60),
          secondsUntil = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': daysUntil,
      'hours': hoursUntil,
      'minutes': minutesUntil,
      'seconds': secondsUntil
    };
  }

  function showZeroes(num){
    if(num <10 && num >=0){
      return `0${num}`
    } else{
      return num;
    }
  }

  function updateClock() {
    const time = daysHoursMinutesSecondsCalc(inputValue);

    daysSlot.innerHTML = showZeroes(time.days);
    hoursSlot.innerHTML = showZeroes(time.hours);
    minutesSlot.innerHTML = showZeroes(time.minutes);
    secondsSlot.innerHTML = showZeroes(time.seconds);

    if (time.total <= 0) {
      clearInterval(timeInterval);
      wrapperContainer.style.display = 'none';
      noBirthday.style.display = 'block';
    }
  }

 

  input.addEventListener('change', () => {
    changeDate = true;
    inputValue = input.value; // Update inputValue when input changes
  });

  btn.addEventListener('click', () => {
    if (inputValue === '' && !changeDate) {
      remaining.innerHTML = `You haven't selected a date`;
    } else if (inputValue && changeDate) {
    
      remaining.innerHTML = `The birthday is in:`;
      setTime();
      changeDate = false;
      wrapperContainer.style.display = 'flex';
      noBirthday.style.display = 'none';
    } else if (inputValue && !changeDate) {
      remaining.innerHTML = `Please select a new date`;
    }

    function setTime() {
      updateClock();
      timeInterval = setInterval(updateClock, 1000);
    }


  });
});