import pilotes from "/data/pilotes.json";

function createPilotesCircle() {
  // Obtenir la largeur et la hauteur de la fenêtre
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Définir le rayon du cercle comme la moitié de la plus petite dimension de la fenêtre
  let radius = Math.min(width, height) / 3;

  // Créer un SVG
  let svg = d3
    .select("#bg-pilotesCircuits")
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

  let baseImageAboveText = svg
    .append("image")
    .attr(
      "xlink:href",
      "https://logos-world.net/wp-content/uploads/2023/12/F1-Logo.png"
    )
    .attr("y", height / 2 - radius / 1.7) // Positionner l'image au-dessus du texte
    .attr("x", width / 2 - radius / 2 + radius * 0.05)
    .attr("width", radius)
    .attr("height", radius);

  let baseTexteZone = svg
    .append("text")
    .attr("x", width / 2 + radius * 0.05)
    .attr("y", height / 2 + radius / 4)
    .style("fill", "#f2f2f2")
    .style("text-anchor", "middle") // Aligner horizontalement
    .style("font-family", "Arial") // Replace "Arial" with the desired font family name
    .attr("font-size", "30px") // Set the font size
    .text("Drivers in 2024");

  let piloteLeftImage = svg
    .append("g")
    .append("image")
    .attr("x", width / 2 - radius * 0.7)
    .attr("y", height / 2 - radius * 0.25)
    .attr("width", radius / 1.5)
    .attr("height", radius / 1.5);

  let piloteLeftLine = svg
    .append("line")
    .attr("x1", width / 2 - radius * 0.65)
    .attr("y1", height / 2 + radius * 0.42)
    .attr("x2", width / 2)
    .attr("y2", height / 2 + radius * 0.42);

  let piloteNameZone = svg
    .append("text")
    .attr("class", "circuitPiloteName")
    .attr("x", width / 2)
    .attr("y", height / 2 - radius * 0.15)
    .style("fill", "#f2f2f2")
    .style("text-anchor", "left") // Aligner horizontalement
    .style("dominant-baseline", "middle"); // Aligner verticalement

  let piloteInfoZone = svg
    .append("g")
    .attr("class", "circuitPiloteInfoZone")
    .style("fill", "#f2f2f2")
    .style("text-anchor", "left") // Aligner horizontalement
    .style("dominant-baseline", "middle"); // Aligner verticalement

  let middleZone = svg.append("g").attr("id", "middleZone");
  middleZone.append(() => baseImageAboveText.node());
  middleZone.append(() => baseTexteZone.node());

  // Calculer l'angle entre chaque image
  let angleStep = (2 * Math.PI) / pilotes.pilotes.length;

  // Ajouter les images autour du cercle
  pilotes.pilotes.forEach((url, i) => {
    let angle = i * angleStep;
    let x = width / 2 + radius * Math.cos(angle) - radius / 8;
    let y = height / 2 + radius * Math.sin(angle) - radius / 8;

    let image = svg
      .append("image")
      .attr("xlink:href", url.casques)
      .attr("x", x - radius / 15)
      .attr("y", y - radius / 15)
      .attr("class", "onCircle")
      .attr("width", radius / 2.5)
      .attr("height", radius / 2.5)
      .style("opacity", 1);

    image.on("mouseover", function () {
      d3.select(this)
        .transition()
        .duration(300)
        .attr("x", x - radius / 7)
        .attr("y", y - radius / 7)
        .attr("width", radius / 1.8)
        .attr("height", radius / 1.8)
        .style("z-index", 10000)
        .style("fill", "red");

      d3.selectAll("image.onCircle:not(:hover)").style("opacity", 0.4);

      piloteLeftImage.attr("xlink:href", url.photo);
      middleZone.selectAll("*").remove();
      middleZone.append(() => piloteLeftImage.node());
      middleZone.append(() => piloteNameZone.node());
      middleZone.append(() => piloteInfoZone.node());
      middleZone.append(() => piloteLeftLine.node());
      piloteNameZone.text(url.nom + " " + url.prenom);

      piloteLeftLine.style("stroke", "red").style("stroke-width", "10px");

      piloteInfoZone
        .append("text")
        .style("fill", "red")
        .attr("class", "circuitPiloteNameNumber")
        .attr("x", width / 2)
        .attr("y", height / 2 - radius * 0.05) // déplacez le texte vers le bas de 20 unités
        .text("Number : " + url.numero_pilote);

      piloteInfoZone
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + radius * 0.08) // déplacez le texte vers le bas de 20 unités
        .text("Team : " + url.equipe);

      piloteInfoZone
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + radius * 0.16) // déplacez le texte vers le bas de 20 unités
        .text("World title : " + url.nombre_de_coupes_du_monde);

      piloteInfoZone
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + radius * 0.24) // déplacez le texte vers le bas de 20 unités
        .text("Wins : " + url.nombre_de_victoires);

      piloteInfoZone
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + radius * 0.32) // déplacez le texte vers le bas de 20 unités
        .text("Grand prix entered : " + url.grands_prix_effectues);
    });

    //Réinitialiser l'image à sa taille et couleur d'origine lorsque la souris n'est plus dessus
    image.on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("x", x - radius / 15)
        .attr("y", y - radius / 15)
        .attr("width", radius / 2.5)
        .attr("height", radius / 2.5)
        .style("z-index", 1);

      middleZone.selectAll("*").remove();
      d3.selectAll("image").style("opacity", 1); // Réinitialiser l'opacité de toutes les images à 100%
      middleZone.append(() => baseImageAboveText.node());
      middleZone.append(() => baseTexteZone.node());

      baseImageAboveText.style("opacity", 1);
    });
  });
}

export { createPilotesCircle };
