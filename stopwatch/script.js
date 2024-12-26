let timerInterval;
let running = false;
let elapsedTime = 0; // in seconds
let lastStartTime = 0;
let lapTimes = [];

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(num) {
    return num < 10 ? `0${num}` : num;
}

function startStopwatch() {
    if (running) {
        clearInterval(timerInterval);
        document.getElementById('startStop').textContent = 'Resume';
    } else {
        lastStartTime = Date.now() - elapsedTime * 1000;
        timerInterval = setInterval(updateTime, 1000);
        document.getElementById('startStop').textContent = 'Pause';
    }
    running = !running;
}

function updateTime() {
    elapsedTime = Math.floor((Date.now() - lastStartTime) / 1000);
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    document.getElementById('display').textContent = formatTime(elapsedTime);
    document.getElementById('startStop').textContent = 'Start';
    lapTimes = [];
    updateLapList();
}

function recordLap() {
    if (running) {
        lapTimes.push(elapsedTime);
        updateLapList();
    }
}

function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = ''; // Clear previous lap times
    lapTimes.forEach((lapTime, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapList.appendChild(lapItem);
    });
}
