import pilotes from "/data/pilotes.json";
import anecdotes from "/data/anecdotes.json";

function createFourCircle() {
  // Obtenir la largeur et la hauteur de la fenêtre
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Définir le rayon du cercle comme la moitié de la plus petite dimension de la fenêtre
  let radius = Math.min(width, height) / 3;

  // Créer un SVG
  let svg = d3
    .select("#bg-cercles")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Récupérer les anecdotes spécifiques en fonction de leurs clés
  let pilotesAnecdote = anecdotes.anecdotes.find(
    (anecdote) => anecdote.chiffre === "1004"
  );
  let viewersAnecdote = anecdotes.anecdotes.find(
    (anecdote) => anecdote.chiffre === "90 millions"
  );
  let timeAnecdote = anecdotes.anecdotes.find(
    (anecdote) => anecdote.chiffre === "10.6 seconds"
  );
  let priceAnecdote = anecdotes.anecdotes.find(
    (anecdote) => anecdote.chiffre === "12 millions dollars"
  );

  // Afficher le texte dans chaque cercle avec les anecdotes spécifiques
  let circlesData = [
    { anecdote: pilotesAnecdote, x: width / 2 - radius / 1.3, y: height / 4 },
    { anecdote: viewersAnecdote, x: width / 2 + radius / 1.3, y: height / 4 },
    { anecdote: timeAnecdote, x: width / 2 - radius / 1.3, y: (3 * height) / 4 },
    { anecdote: priceAnecdote, x: width / 2 + radius / 1.3, y: (3 * height) / 4 }
  ];

  circlesData.forEach((circleData) => {
    let circle = svg
      .append("circle")
      .attr("cx", circleData.x)
      .attr("cy", circleData.y)
      .attr("r", radius / 1.5)
      .style("fill", "red");

    circle
      .append("text")
      .text(circleData.anecdotes.chiffre + " - " + circleData.anecdotes.reponse)
      .style("fill", "white")
      .style("font-size", "1.5rem")
      .style("text-anchor", "middle")
      .attr("x", circleData.x)
      .attr("y", circleData.y);
  });
}

export { createFourCircle };
