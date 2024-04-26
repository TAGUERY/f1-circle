import anecdotes from "/data/anecdotes.json";

let chiffre1 = anecdotes.anecdotes[5].chiffre;
let chiffre2 = anecdotes.anecdotes[6].chiffre;
let chiffre3 = anecdotes.anecdotes[7].chiffre;
let chiffre4 = anecdotes.anecdotes[8].chiffre;

let reponse1 = anecdotes.anecdotes[5].reponse;
let reponse2 = anecdotes.anecdotes[6].reponse;
let reponse3 = anecdotes.anecdotes[7].reponse;
let reponse4 = anecdotes.anecdotes[8].reponse;

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

  //cercle 1, en haut à gauche
  let circle1 = svg;
  circle1
    .append("circle")
    .attr("cx", width / 2 - radius / 1.3)
    .attr("cy", height / 4)
    .attr("r", radius / 1.5)
    .style("fill", "red");

  circle1
    .append("text")
    .text(reponse1)
    .attr("class", "reponse")
    .attr("x", width / 2 - radius / 1.3)
    .attr("y", height / 4 + 20);

  circle1
    .append("text")
    .text(chiffre1)
    .attr("class", "chiffre")
    .attr("x", width / 2 - radius / 1.3)
    .attr("y", height / 4);

  //cercle 2, en haut à droite
  // Cercle 2, en haut à droite
  let circle2 = svg;
  circle2
    .append("circle")
    .attr("cx", width / 2 + radius / 1.3)
    .attr("cy", height / 4)
    .attr("r", radius / 1.5)
    .style("fill", "red");

  circle2
    .append("text")
    .text(reponse2)
    .attr("class", "reponse")
    .attr("x", width / 2 + radius / 1.3)
    .attr("y", height / 4 + 20);

  circle2
    .append("text")
    .text(chiffre2)
    .attr("class", "chiffre")
    .attr("x", width / 2 + radius / 1.3)
    .attr("y", height / 4);

  // Cercle 3, en bas à gauche
  let circle3 = svg;
  circle3
    .append("circle")
    .attr("cx", width / 2 - radius / 1.3)
    .attr("cy", (3 * height) / 4)
    .attr("r", radius / 1.5)
    .style("fill", "red");

  circle3
    .append("text")
    .text(reponse3)
    .attr("class", "reponse")
    .attr("x", width / 2 - radius / 1.3)
    .attr("y", (3 * height) / 4 + 20);

  circle3
    .append("text")
    .text(chiffre3)
    .attr("class", "chiffre")
    .attr("x", width / 2 - radius / 1.3)
    .attr("y", (3 * height) / 4);

  // Cercle 4, en bas à droite
  let circle4 = svg;
  circle4
    .append("circle")
    .attr("cx", width / 2 + radius / 1.3)
    .attr("cy", (3 * height) / 4)
    .attr("r", radius / 1.5)
    .style("fill", "red");

  circle4
    .append("text")
    .text(reponse4)
    .attr("class", "reponse")
    .attr("x", width / 2 + radius / 1.3)
    .attr("y", (3 * height) / 4 + 20);

  circle4
    .append("text")
    .text(chiffre4)
    .attr("class", "chiffre")
    .attr("x", width / 2 + radius / 1.3)
    .attr("y", (3 * height) / 4);

}

export { createFourCircle };
