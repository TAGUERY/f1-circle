import pilotes from "/data/pilotes.json";

// Obtenir la largeur et la hauteur de la fenêtre
let width = window.innerWidth;
let height = window.innerHeight;

console.log(width, height);

// Définir le rayon du cercle comme la moitié de la plus petite dimension de la fenêtre
let radius = Math.min(width, height) / 3;

// Créer un SVG
let svg = d3
  .select("#bg")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Créer un cercle
let circle = svg
  .append("circle")
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr("r", radius)
  .style("fill", "none");
//.style("stroke", "black");

d3.select(window).on("scroll", function () {
  // Obtenir la position de défilement actuelle
  let scrollPos = d3.select(window).node().pageYOffset;

  // Appliquer une transformation de rotation à l'élément SVG parent
  circle.attr(
    "transform",
    "rotate(" + scrollPos / 10 + "," + width / 2 + "," + height / 2 + ")"
  );

  // Faire disparaître les images lorsque vous atteignez une certaine position de défilement
  if (scrollPos > 500) {
    // Ajuster cette valeur en fonction de vos besoins
    svg.selectAll("image").transition().duration(500).style("opacity", 0);
  } else {
    svg.selectAll("image").transition().duration(500).style("opacity", 1);
  }
});

let imageAboveText = svg
  .append("image")
  .attr("xlink:href", "/data/img/casques/albon.png") // Remplacez par l'URL de votre image
  .attr("x", width / 2 - radius / 8) // Centrer l'image horizontalement
  .attr("y", height / 2 - radius / 4) // Positionner l'image au-dessus du texte
  .attr("width", radius / 4)
  .attr("height", radius / 4);

let texteZone = svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height / 2)
  .text("Cliquez sur une image pour voir le détail")
  .style("fill", "black")
  .style("text-anchor", "middle") // Aligner horizontalement
  .style("dominant-baseline", "middle"); // Aligner verticalement

// Calculer l'angle entre chaque image
let angleStep = (2 * Math.PI) / pilotes.pilotes.length;

console.log(pilotes.pilotes);
// Ajouter les images autour du cercle
pilotes.pilotes.forEach((url, i) => {
  let angle = i * angleStep;
  let x = width / 2 + radius * Math.cos(angle) - radius / 8;
  let y = height / 2 + radius * Math.sin(angle) - radius / 8;

  let image = svg
    .append("image")

    //.attr("xlink:href", "../../data/img/casques/albon.png")
    .attr("xlink:href", url.casques)
    .attr("x", x)
    .attr("y", y)
    .attr("width", radius / 4)
    .attr("height", radius / 4);

  image.on("mouseover", function () {
    d3.select(this)
      .transition()
      .duration(200)
      .attr("x", x - radius / 45) // Déplacer l'image vers la gauche
      .attr("y", y - radius / 45) // Déplacer l'image vers le haut
      .attr("width", radius / 3.5)
      .attr("height", radius / 3.5)
      .style("fill", "red");

    texteZone.text(url.prenom + " " + url.nom);
  });

  //Réinitialiser l'image à sa taille et couleur d'origine lorsque la souris n'est plus dessus
  image.on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(200)
      .attr("x", x) // Réinitialiser la position x de l'image
      .attr("y", y) // Réinitialiser la position y de l'image
      .attr("width", radius / 4)
      .attr("height", radius / 4)
      .style("fill", "none");

    texteZone.text("Cliquez sur une image pour voir le détail");
  });
});
