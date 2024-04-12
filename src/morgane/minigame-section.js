function miniSpeedGame() {
  const lights = document.querySelectorAll(".light");
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("gray");
  let timer;

  function turnRed(index) {
    if (index < lights.length) {
      lights[index].style.backgroundColor = "red";
      setTimeout(() => turnRed(index + 1), 1000); // Déclencher le prochain cercle après 0.3s
    } else {
      setTimeout(turnGreen, Math.random() * 600 + 300); // Déclencher le passage au vert après un délai aléatoire (entre 0.3 et 0.9s)
    }
  }

  function turnGreen() {
    lights.forEach((light) => {
      light.style.backgroundColor = "green";
    });
    const startTime = Date.now(); // Enregistrer le temps de départ

    stopButton.onclick = function () {
      const endTime = Date.now(); // Enregistrer le temps d'arrêt
      const reactionTime = endTime - startTime;
      alert("Votre temps de réaction : " + reactionTime + " ms");
      reset();
    };
  }

  function reset() {
    lights.forEach((light) => {
      light.style.backgroundColor = "gray";
    });
  }

  startButton.onclick = function () {
    turnRed(0);
  };
}
export { miniSpeedGame };
