const stopwatch = document.getElementById("stopwatch");
const playPauseButton = document.getElementById("play-pause");
const secondsSphere = document.getElementById("seconds-sphere");
const lapsList = document.getElementById("laps-list");

let stopwatchInterval;
let runningTime = 0;
let lapCount = 0;
let lastLapTime = 0;

const playPause = () => {
  const isPaused = !playPauseButton.classList.contains("running");
  if (isPaused) {
    playPauseButton.classList.add("running");
    start();
  } else {
    playPauseButton.classList.remove("running");
    pause();
  }
};

const pause = () => {
  secondsSphere.style.animationPlayState = "paused";
  clearInterval(stopwatchInterval);
};

const stop = () => {
  secondsSphere.style.transform = "rotate(-90deg) translateX(90px)";
  secondsSphere.style.animation = "none";
  playPauseButton.classList.remove("running");
  runningTime = 0;
  lastLapTime = 0;
  lapCount = 0;
  clearInterval(stopwatchInterval);
  stopwatch.textContent = "00:00";
  lapsList.innerHTML = "";
};

const start = () => {
  secondsSphere.style.animation = "rotacion 60s linear infinite";
  let startTime = Date.now() - runningTime;
  secondsSphere.style.animationPlayState = "running";
  stopwatchInterval = setInterval(() => {
    runningTime = Date.now() - startTime;
    stopwatch.textContent = calculateTime(runningTime);
  }, 100);
};

const calculateTime = (runningTime) => {
  const total_seconds = Math.floor(runningTime / 1000);
  const total_minutes = Math.floor(total_seconds / 60);
  const total_milliseconds = Math.floor((runningTime % 1000) / 10);

  const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
  const display_minutes = total_minutes.toString().padStart(2, "0");
  const display_milliseconds = total_milliseconds.toString().padStart(2, "0");

  return `${display_minutes}:${display_seconds}`;
};

const formatTimeWithMilliseconds = (time) => {
  const total_seconds = Math.floor(time / 1000);
  const total_minutes = Math.floor(total_seconds / 60);
  const total_milliseconds = Math.floor((time % 1000) / 10);

  const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
  const display_minutes = total_minutes.toString().padStart(2, "0");
  const display_milliseconds = total_milliseconds.toString().padStart(2, "0");

  return `${display_minutes}:${display_seconds}.${display_milliseconds}`;
};

const addLap = () => {
  // Solo añadir vuelta si el cronómetro está en marcha
  if (playPauseButton.classList.contains("running") && runningTime > 0) {
    lapCount++;
    const lapTime = runningTime - lastLapTime;
    lastLapTime = runningTime;

    const lapItem = document.createElement("li");
    lapItem.innerHTML = `
      <span class="lap-number">Vuelta ${lapCount}</span>
      <span class="lap-time">${formatTimeWithMilliseconds(lapTime)}</span>
    `;

    // Añadir al principio de la lista para que la más reciente esté arriba
    lapsList.insertBefore(lapItem, lapsList.firstChild);
  }
};
