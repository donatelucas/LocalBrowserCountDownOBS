// Connect to OBS WebSocket
const obs = new WebSocket('ws://localhost:4455');
obs.onopen = () => {
    obs.send(JSON.stringify({
        "request-type": "SetSourceSettings",
        "sourceName": "YourBrowserSourceName",
        "sourceSettings": {
            "url": "http://localhost:5500/obs-overlay.html?t=" + Date.now()
        }
    }));
};
const titleInput = document.getElementById('title');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let totalSeconds = 0;
let timerInterval = null;
let isRunning = false;

// Update display (HH:MM:SS)
function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    display.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start timer
function startTimer() {
    if (isRunning) return;
    
    // Set initial time from inputs
    if (timerInterval === null) {
        totalSeconds = 
            (parseInt(hoursInput.value) || 0) * 3600 + 
            (parseInt(minutesInput.value) || 0) * 60;
        updateDisplay();
    }

    isRunning = true;
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            return;
        }
        totalSeconds--;
        updateDisplay();
    }, 1000);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

// Pause timer
function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    totalSeconds = 0;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);