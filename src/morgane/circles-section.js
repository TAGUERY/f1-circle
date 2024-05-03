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
  // Cercle 1, en haut à gauche
  let circle1 = svg;
  circle1
    .append("circle")
    .attr("cx", width / 2 - radius / 1.3)
    .attr("cy", height / 4)
    .attr("r", radius / 1.5)
    .style("fill", "red");

  // Diviser la réponse 1 en deux parties si elle est trop longue
  let halfLength1 = Math.ceil(reponse1.length / 2); // Longueur de la moitié de la chaîne
  let firstHalf1 = reponse1.substring(0, halfLength1); // Première moitié de la chaîne
  let secondHalf1 = reponse1.substring(halfLength1); // Deuxième moitié de la chaîne

  // Afficher la première moitié de la réponse
  circle1
    .append("text")
    .text(firstHalf1)
    .attr("class", "reponse")
    .attr("x", width / 2 - radius / 1.3)
    .attr("y", 1.1 * height / 4 + 20); // Position de la première ligne

  // Afficher la deuxième moitié de la réponse
  circle1
    .append("text")
    .text(secondHalf1)
    .attr("class", "reponse")
    .attr("x", width / 2 - radius / 1.3)
    .attr("y", 1.1 * height / 4 + 40); // Position de la deuxième ligne

  // Afficher le chiffre
  circle1
    .append("text")
    .text(chiffre1)
    .attr("class", "chiffre")
    .attr("x", width / 2 - radius / 1.3)
    .attr("y", height / 4);


  // Cercle 2, en haut à droite
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
    .attr("y", 1.1 * height / 4 + 20);

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

  // Diviser la réponse 3 en deux parties si elle est trop longue
  let halfLength3 = Math.ceil(reponse3.length / 2); // Longueur de la moitié de la chaîne
  let firstHalf3 = reponse3.substring(0, halfLength3); // Première moitié de la chaîne
  let secondHalf3 = reponse3.substring(halfLength3); // Deuxième moitié de la chaîne

  // Afficher la première moitié de la réponse
  circle3
    .append("text")
    .text(firstHalf3)
    .attr("class", "reponse")
    .attr("x", width / 2 - radius / 1.3)
    .attr("y", (3.1 * height) / 4 + 20); // Position de la première ligne

  // Afficher la deuxième moitié de la réponse
  circle3
    .append("text")
    .text(secondHalf3)
    .attr("class", "reponse")
    .attr("x", width / 2 - radius / 1.3)
    .attr("y", (3.1 * height) / 4 + 40); // Position de la deuxième ligne

  // Afficher le chiffre
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

  // Diviser la réponse 4 en deux parties
  let halfLength = Math.ceil(reponse4.length / 2); // Longueur de la moitié de la chaîne
  let firstHalf = reponse4.substring(0, halfLength); // Première moitié de la chaîne
  let secondHalf = reponse4.substring(halfLength); // Deuxième moitié de la chaîne

  circle4
    .append("text")
    .text(firstHalf) // Première moitié de la réponse
    .attr("class", "reponse")
    .attr("x", width / 2 + radius / 1.3)
    .attr("y", (3.1 * height) / 4 + 20); // Position de la première ligne

  circle4
    .append("text")
    .text(secondHalf) // Deuxième moitié de la réponse
    .attr("class", "reponse")
    .attr("x", width / 2 + radius / 1.3)
    .attr("y", (3.1 * height) / 4 + 40); // Position de la deuxième ligne

  circle4
    .append("text")
    .text(chiffre4)
    .attr("class", "chiffre")
    .attr("x", width / 2 + radius / 1.3)
    .attr("y", (3 * height) / 4);

  circle1.attr("class", "circle");
  circle2.attr("class", "circle");
  circle3.attr("class", "circle");
  circle4.attr("class", "circle");

  // Fonction pour détecter le défilement et déclencher l'apparition des cercles
  function handleScroll() {
    // Spécifiez la quantité de défilement avant d'activer l'apparition
    let scrollThreshold = window.innerHeight / 3;
    let circles = document.querySelectorAll('.circle');

    circles.forEach(circle => {
      let bounding = circle.getBoundingClientRect();
      if (bounding.top < window.innerHeight - scrollThreshold && bounding.bottom >= 0) {
        // Ajoutez une classe pour activer la transition d'apparition
        circle.classList.add('appear');
      } else {
        // Supprimez la classe pour désactiver la transition d'apparition
        circle.classList.remove('appear');
      }
    });
  }

  // Écouteur d'événement de défilement
  window.addEventListener('scroll', handleScroll);
}

export { createFourCircle };