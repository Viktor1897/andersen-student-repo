const btns = document.querySelector('.stopwatch__btns')
const display = document.querySelector('.stopwatch__display');
const stopwatch = document.querySelector('.stopwatch');
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
    }
});

function start() {
    if (stopwatch.classList.contains('pause')) {
        stopwatch.classList.remove('pause');
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
}

function reset() {
    milliseconds = 0;
    display.textContent = '00 : 00 : 00 : 00'
}