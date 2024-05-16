const lights = document.querySelectorAll(".light");
const startStopButton = document.getElementById("startStopButton");
const bestTime = document.querySelector(".bestTime");
const runningTime = document.querySelector("#runningTime");
const lastTimeAll = document.querySelector(".scores");

function miniGameCompare() {
  document.querySelector("#compare").innerHTML = "";
  const bestTimeToShow = bestTime.textContent; // xxx ms
  const bestTimeNumber = parseInt(bestTimeToShow); // xxx

  const pilotes = [
    {
      nom: "Lando",
      tempsDeReaction: 90,
      image: "../../data/img/pilotes/norris.png",
    },
    {
      nom: "Lewis",
      tempsDeReaction: 200,
      image: "../../data/img/pilotes/hamilton.png",
    },
    {
      nom: "You",
      tempsDeReaction: bestTimeNumber,
      image: "../../data/img/pilotes/you.png",
    },
  ];

  const windowWidth = window.innerWidth;
  const width = windowWidth * 0.9;
  const height = 200;

  // Marge pour l'axe x
  const margin = { top: 20, right: 50, bottom: 50, left: 50 }; // Réglage de la marge droite pour l'axe x
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Création de l'élément SVG
  const svg = d3
    .select("#compare")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Groupe pour les éléments de graphique principal
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Echelle pour l'axe des x
  const xScale = d3
    .scaleLinear()
    .domain([0, 1000]) // Plage de valeurs
    .range([0, innerWidth]); // Espace de sortie

  // Axe x
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  // Ajout de l'axe x
  g.append("g")
    .attr("class", "x-axis") // Ajout de la classe pour l'axe x
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis);

  // Style CSS pour la barre de l'axe x et les graduations
  d3.selectAll(".x-axis path, .x-axis line").style("stroke", "white"); // Couleur des barres de l'axe x et des graduations

  // Style CSS pour les labels de l'axe x
  d3.selectAll(".x-axis text")
    .style("fill", "white") // Couleur du texte
    .style("font-size", "14px") // Taille du texte
    .attr("dy", "1.5em"); // Décalage vertical

  // Ajout de "ms" à droite de l'axe x
  g.select(".x-axis")
    .append("text")
    .attr("x", innerWidth + 30) // Position horizontale
    .attr("y", -15) // Position verticale
    .attr("fill", "white") // Couleur du texte
    .text("ms");

  // Création des cercles pour représenter les pilotes
  g.selectAll("circle")
    .data(pilotes)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.tempsDeReaction)) // Position sur l'axe des x en fonction du temps de réaction
    .attr("cy", height / 1.6) // Position verticale fixe au centre
    .attr("r", 0) // Rayon initial à 0
    .style("fill", "red") // Couleur de remplissage
    .transition() // Ajout de la transition
    .duration(1000) // Durée de la transition en ms
    .attr("r", 5); // Rayon final

  // Ajout des images dans les cercles
  g.selectAll(".pilote-image")
    .data(pilotes)
    .enter()
    .append("image")
    .attr("class", "pilote-image")
    .attr("xlink:href", (d) => d.image)
    .attr("x", (d) => xScale(d.tempsDeReaction) - 10) // Décalage de 10 pixels pour centrer l'image
    .attr("y", height / 2 - 10) // Décalage de 10 pixels pour centrer l'image
    .attr("width", 120) // Largeur de l'image
    .attr("height", 120) // Hauteur de l'image
    .attr("transform", "translate(-60, -100)") // Modifier le translate ici
    .attr("opacity", 0) // Opacité initiale à 0
    .transition() // Ajout de la transition
    .duration(1000) // Durée de la transition en ms
    .attr("opacity", 1); // Opacité finale à 1
}

function miniSpeedGame() {
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
      setTimeout(() => startCountDown(index + 1), 800);
    } else {
      setTimeout(turnGreen, Math.random() * 600 + 300);
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
    intervalId = setInterval(updateTimer, 1);
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
      const runningTimeValue = parseInt(runningTime.textContent);
      const bestTimeValue = parseInt(bestTime.textContent);

      if (
        runningTimeValue < bestTimeValue ||
        bestTime.textContent === "--- ms"
      ) {
        bestTime.textContent = `${runningTime.textContent}`;
        miniGameCompare();
        console.log("best time");
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
