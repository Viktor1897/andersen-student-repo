const btns = document.querySelector('.stopwatch__btns')
const startBtn = document.querySelector('.stopwatch__start')
const display = document.querySelector('.stopwatch__display');
const circleTimeList = document.querySelector('.stopwatch__circle-time'); 

class Stopwatch {

  #ms = 0;
  #timer;

  constructor(display) {
    this.display = display;
  }
  
  start() {
    clearInterval(this.#timer);
    this.#timer = setInterval(() => {
      this.#ms += 10;
      this.#showTimeOnDisplay();
    }, 10);
  }

  pause() {
    clearInterval(this.#timer);
  }

  reset() {
    this.#ms = 0;
    this.display.textContent = '00:00:00:00';
  }

  getFullTime() {
    const time = new Date(this.#ms);
    return `${this.#addZeros(time.getUTCHours())}:${this.#addZeros(time.getMinutes())}:${this.#addZeros(time.getSeconds())}:${this.#addZeros(time.getMilliseconds())}`;
  }

  lap() {
    let circleTime = document.createElement('li');
    circleTime.textContent = this.getFullTime();
    circleTimeList.appendChild(circleTime);
  }

  #addZeros(time) {
    return (time < 10) ? '0' + time : (time > 99) ? String(time).slice(0,2) : time;
  }

  #showTimeOnDisplay() {
    this.display.textContent = this.getFullTime();
  }
}

let sec = new Stopwatch(display);

btns.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'start': sec.start();
            break;
        case 'pause': sec.pause();
            break;
        case 'reset': sec.reset();
            break;
        case 'lap': sec.lap();
    }
});