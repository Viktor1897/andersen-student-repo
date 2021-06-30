const main = document.querySelector('#main');
const newStopwatchBtn = document.querySelector('#new-stopwatch');
let stopwatches = [];
let objectID;

class Stopwatch {
  #timer;
  constructor(parentNode, id = 0, ms = 0, isWorking = false, laps = []) {
    this.id = id;
    this.isWorking = isWorking;
    this.btnsContainer;
    this.display;
    this.circleTimeList;
    this.ms = +ms;
    this.parentNode = parentNode;
    this.laps = laps;
  }
  
  start() {
    this.isWorking = true;
    this.setBtnsState();
    clearInterval(this.#timer);
    this.#timer = setInterval(() => {
      this.ms += 10;
      this.showTimeOnDisplay();
      this.#saveToLocalStorage();
    }, 10);
    
  }

  pause() {
    clearInterval(this.#timer);
    this.isWorking = false;
    this.setBtnsState();
    this.#saveToLocalStorage();
  }

  reset() {
    this.ms = 0;
    this.display.textContent = '00:00:00:00';
    this.laps = [];
      while(this.circleTimeList.lastChild) {
        this.circleTimeList.lastChild.remove();
      }
    this.#saveToLocalStorage();
  }

  getFullTime() {
    const time = new Date(this.ms);
    return `${this.#addZeros(time.getUTCHours())}:${this.#addZeros(time.getMinutes())}:${this.#addZeros(time.getSeconds())}:${this.#addZeros(time.getMilliseconds())}`;
  }

  lap() {
    this.laps.push(this.getFullTime());
    this.addLapToList();
  }
  addLapToList() {
    let lapTime = document.createElement('li');
    lapTime.textContent = this.getFullTime();
    this.circleTimeList.appendChild(lapTime);
  }
  showLaps() {
      for (let lap of this.laps) {
        if (lap === '') continue;
        let lapTime = document.createElement('li');
        lapTime.textContent = lap;
        this.circleTimeList.appendChild(lapTime);
      }
  }

  #addZeros(time) {
    return (time < 10) ? '0' + time : (time > 99) ? String(time).slice(0,2) : time;
  }

  showTimeOnDisplay() {
    this.display.textContent = this.getFullTime();
  }
  
  makeUI() {
    let ui = document.createElement('section');
    ui.classList.add(`stopwatch`);
    ui.innerHTML = `<p class="stopwatch__display">00:00:00:00</p>
    <p class="timer-id">id:${this.id}</p>
    <div class="stopwatch__btns">
      <button class="stopwatch__start" id="start"></button>
      <button class="stopwatch__pause" id="pause"></button>
      <button class="stopwatch__reset" id="reset"></button>
      <button class="stopwatch__lap" id="lap"></button>
    </div>
    <ol class="stopwatch__circle-time"></ol>`;
    this.parentNode.append(ui);
    this.btnsContainer = ui.querySelector('.stopwatch__btns');
    this.btns = ui.querySelectorAll('button');
    this.display = ui.querySelector('.stopwatch__display');
    this.circleTimeList = ui.querySelector('.stopwatch__circle-time');
    this.addListeners() 
  }

  setBtnsState() {
    this.btns[0].disabled = this.isWorking;
    this.btns[1].disabled = !this.isWorking;
    this.btns[2].disabled = this.isWorking;
    this.btns[3].disabled = !this.isWorking;
  }

  addListeners() {
    this.btnsContainer.addEventListener('click', (e) => {
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

  #saveToLocalStorage() {
    localStorage.setItem(`obj${this.id}`, [this.id, this.ms, this.isWorking, this.laps.toString()]);
  }
}

newStopwatchBtn.addEventListener('click', () => {
  createNewStopwatch(main, objectID++);
});

function createNewStopwatch(parentNode, id, ms = 0, isWorking = false, laps = []) {
  let newStopwatch = new Stopwatch(parentNode, id, ms, isWorking, laps);
  newStopwatch.makeUI();
  newStopwatch.showTimeOnDisplay();
  newStopwatch.showLaps();
  newStopwatch.setBtnsState();
  if (isWorking) {
    newStopwatch.start();
  }
  if (localStorage.getItem(`obj${id}`) === null) {
    localStorage.setItem(`obj${id}`, [id, 0, false, []]);
  }
  localStorage.setItem('id', id);
}

function loadStopwatches() {
  for (let elem of Object.keys(localStorage).reverse()) {
    if (elem.includes('obj')) {
      objProperties = localStorage.getItem(elem).split(',');
      let [id, ms, isWorking, ...laps] = objProperties;
      createNewStopwatch(main, id, ms, JSON.parse(isWorking), laps);
    }
  }
}

function loadLastID() {
  objectID = (localStorage.getItem('id') !== null) ? +localStorage.getItem('id') + 1 : 0;
}

loadStopwatches();
loadLastID();