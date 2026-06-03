let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const statusDot = document.getElementById('statusDot');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');
const lapCounter = document.getElementById('lapCounter');

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    
    let hrs = Math.floor(elapsedTime / 3600000);
    let mins = Math.floor((elapsedTime % 3600000) / 60000);
    let secs = Math.floor((elapsedTime % 60000) / 1000);
    let ms = Math.floor((elapsedTime % 1000) / 10);

    let displayHrs = hrs > 0 ? (hrs < 10 ? "0" + hrs : hrs) + ":" : "";
    let displayMins = (mins < 10 ? "0" + mins : mins);
    let displaySecs = (secs < 10 ? "0" + secs : secs);
    let displayMs = (ms < 10 ? "0" + ms : ms);

    display.innerHTML = `${displayHrs}${displayMins}:${displaySecs}<span class="ms">.${displayMs}</span>`;
}

function getFormattedLapTime() {
    let hrs = Math.floor(elapsedTime / 3600000);
    let mins = Math.floor((elapsedTime % 3600000) / 60000);
    let secs = Math.floor((elapsedTime % 60000) / 1000);
    let ms = Math.floor((elapsedTime % 1000) / 10);
    
    let pad = (num) => num < 10 ? "0" + num : num;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms)}`;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        
        statusDot.classList.add('active');
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        statusDot.classList.remove('active');
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        lapCount++;
        lapCounter.textContent = `${lapCount} ${lapCount === 1 ? 'Lap' : 'Laps'}`;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="lap-index">LAP ${String(lapCount).padStart(2, '0')}</span> 
            <span class="lap-val">${getFormattedLapTime()}</span>
        `;
        lapsList.prepend(li);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 0;
    
    statusDot.classList.remove('active');
    display.innerHTML = '00:00:00<span class="ms">.00</span>';
    lapsList.innerHTML = "";
    lapCounter.textContent = "0 Laps";
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});