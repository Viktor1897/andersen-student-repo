const main = document.querySelector('#main');
const newStopwatchBtn = document.querySelector('#new-stopwatch');
class Stopwatch {
  #timer;

  constructor(parentNode) {
    this.display;
    this.btns;
    this.display;
    this.circleTimeList;
    this.ms = 0;
    this.parentNode = parentNode;
    this.laps = [];
  }
  
  start() {
    clearInterval(this.#timer);
    this.#timer = setInterval(() => {
      this.ms += 10;
      this.#showTimeOnDisplay();
    }, 10);
  }

  pause() {
    clearInterval(this.#timer);
  }

  reset() {
    this.ms = 0;
    this.display.textContent = '00:00:00:00';
    this.laps = [];
      while(this.circleTimeList.lastChild) {
        this.circleTimeList.lastChild.remove();
      }
  }

  getFullTime() {
    const time = new Date(this.ms);
    return `${this.#addZeros(time.getUTCHours())}:${this.#addZeros(time.getMinutes())}:${this.#addZeros(time.getSeconds())}:${this.#addZeros(time.getMilliseconds())}`;
  }

  lap() {
    this.laps.push(this.getFullTime());
    let circleTime = document.createElement('li');
    circleTime.textContent = this.getFullTime();
    this.circleTimeList.appendChild(circleTime);
  }

  #addZeros(time) {
    return (time < 10) ? '0' + time : (time > 99) ? String(time).slice(0,2) : time;
  }

  #showTimeOnDisplay() {
    this.display.textContent = this.getFullTime();
  }
  
  makeUI() {
    let ui = document.createElement('section');
    ui.classList.add(`stopwatch`);
    ui.innerHTML = `<p class="stopwatch__display">00:00:00:00</p>
    <div class="stopwatch__btns">
      <button class="stopwatch__start" id="start"></button>
      <button class="stopwatch__pause" id="pause"></button>
      <button class="stopwatch__reset" id="reset"></button>
      <button class="stopwatch__lap" id="lap"></button>
    </div>
    <ol class="stopwatch__circle-time"></ol>`;
    this.parentNode.append(ui);
    this.btns = ui.querySelector('.stopwatch__btns')
    this.display = ui.querySelector('.stopwatch__display');
    this.circleTimeList = ui.querySelector('.stopwatch__circle-time');
    this.addListeners() 
  }

  addListeners() {
    this.btns.addEventListener('click', (e) => {
      switch (e.target.id) {
          case 'start': this.start();
              break;
          case 'pause': this.pause();
              break;
          case 'reset': this.reset();
              break;
          case 'lap': this.lap();
      }
  });
  }
}

newStopwatchBtn.addEventListener('click', () => {
  createNewStopwatch(main);
});

function createNewStopwatch(parentNode) {
  let newStopwatch = new Stopwatch(parentNode);
  newStopwatch.makeUI();
}