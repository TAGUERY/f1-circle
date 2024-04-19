function miniSpeedGame() {
  const lights = document.querySelectorAll(".light");
  const startStopButton = document.getElementById("startStopButton");
  const bestTime = document.querySelector(".bestTime");
  const runningTime = document.querySelector("#runningTime");
  const lastTimeAll = document.querySelector(".scores");

  let gameIsRunning = false;
  let timerRunning = false;
  let startTime;
  let intervalId;

  const tabScores = [];
  let contenu;
  let html;

  function checkScore() {
    if (tabScores.length === 0) {
      html = `<div class="score">No score yet</div>`;
      lastTimeAll.innerHTML = html;
    }
  }

  checkScore();

  function startCountDown(index) {
    if (!gameIsRunning) return;
    startStopButton.textContent = "Wait...";
    runningTime.textContent = "000 ms";

    if (index < lights.length) {
      lights[index].style.backgroundColor = "red";
      setTimeout(() => startCountDown(index + 1), 800); // Call startCountDown recursively with the next index after 0.8s
    } else {
      setTimeout(turnGreen, Math.random() * 600 + 300); // Trigger the green light after a random delay (between 0.3 and 0.9s)
    }
  }

  function turnGreen() {
    if (!gameIsRunning) return;
    timerRunning = true;
    startStopButton.textContent = "CLICK !";
    lights.forEach((light) => {
      light.style.backgroundColor = "green";
    });
    startTime = Date.now();
    startTimer();
  }

  function startTimer() {
    intervalId = setInterval(updateTimer, 1); // Update the timer every millisecond
  }

  function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    runningTime.textContent = `${elapsedTime} ms`;
  }

  function stopTimer() {
    clearInterval(intervalId);
  }

  startStopButton.onclick = function () {
    if (!gameIsRunning && !timerRunning) {
      gameIsRunning = true;
      startCountDown(0);
    } else if (gameIsRunning && !timerRunning) {
      alert("Too early!");
      reset();
      return;
    } else {
      if (
        runningTime.textContent < bestTime.textContent ||
        bestTime.textContent === "--- ms"
      ) {
        bestTime.textContent = `${runningTime.textContent}`;
      }
      reset();
    }
  };

  function reset() {
    if (runningTime.textContent == `000 ms`) {
      contenu = "too early";
    } else {
      contenu = `${runningTime.textContent}`;
    }
    checkScore();
    tabScores.unshift(contenu);
    if (tabScores.length > 4) {
      tabScores.pop();
    }

    lastTimeAll.innerHTML = "";

    tabScores.forEach((score, i) => {
      if (i === 0) {
        html = `<div class="score">Last : ${score}</div>`;
      } else {
        html = `<div class="score">+${i} : ${score}</div>`;
      }
      lastTimeAll.insertAdjacentHTML("beforeend", html);
    });

    startStopButton.textContent = "Start";
    stopTimer();
    gameIsRunning = false;
    timerRunning = false;
    lights.forEach((light) => {
      light.style.backgroundColor = "gray";
    });
  }
}

export { miniSpeedGame };
