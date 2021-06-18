const btns = document.querySelector('.stopwatch__btns')
const startBtn = document.querySelector('.stopwatch__start')
const display = document.querySelector('.stopwatch__display');
const stopwatch = document.querySelector('.stopwatch');
const circleTimeList = document.querySelector('.stopwatch__circle-time'); 
let milliseconds = 0;
let timer;

btns.addEventListener('click', (e) => {
    switch (e.target.textContent) {
        case 'Start': start();
            break;
        case 'Pause': pause();
            break;
        case 'Reset': reset();
            break;
        case 'Time': noteCircleTime();
    }
});

function start() {
    if (stopwatch.classList.contains('pause')) {
        stopwatch.classList.remove('pause');
        startBtn.textContent = 'Time';
        clearInterval(timer);
        timer = setInterval(() => {
            milliseconds += 10;
            let time = new Date(milliseconds);
            display.textContent = `
            ${(time.getUTCHours() < 10) ? '0' + time.getUTCHours() : time.getUTCHours()} :
            ${(time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes()} :
            ${(time.getSeconds() < 10) ? '0' + time.getSeconds() : time.getSeconds()} :
            ${(time.getMilliseconds() < 10) ? '00' + time.getMilliseconds() : 
            (time.getMilliseconds() < 100) ? '0' + time.getMilliseconds() : time.getMilliseconds()}`;
        }, 10);
    }
}

function pause() {
    clearInterval(timer);
    stopwatch.classList.add('pause');
    startBtn.textContent = 'Start';
}

function reset() {
    milliseconds = 0;
    display.textContent = '00 : 00 : 00 : 00'
    while (circleTimeList.firstChild) {
        circleTimeList.removeChild(circleTimeList.firstChild);
    }
}

function noteCircleTime() {
    let circleTime = document.createElement('li');
    circleTime.textContent = display.textContent;
    circleTimeList.appendChild(circleTime);
}