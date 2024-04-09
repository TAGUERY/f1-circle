import circuits from "/data/circuits.json";

function createCircuitsCircle() {
  // Obtenir la largeur et la hauteur de la fenêtre
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Définir le rayon du cercle comme la moitié de la plus petite dimension de la fenêtre
  let radius = Math.min(width, height) / 3;

  // Créer un SVG
  let svg = d3
    .select("#bg-circuits")
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
    .text("Circuits in 2024");

  let circuitLeftImage = svg
    .append("g")
    .append("image")
    .attr("x", width / 2 - radius * 0.7)
    .attr("y", height / 2 - radius * 0.25)
    .attr("width", radius / 1.5)
    .attr("height", radius / 1.5);

  let circuitNameZone = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2 - radius * 0.15)
    .style("font-size", "2rem")
    .style("fill", "#f2f2f2")
    .style("text-anchor", "left") // Aligner horizontalement
    .style("dominant-baseline", "middle"); // Aligner verticalement

  let circuitInfoZone = svg
    .append("g")
    .style("fill", "#f2f2f2")
    .style("font-size", "1.2rem")
    .style("text-anchor", "left") // Aligner horizontalement
    .style("dominant-baseline", "middle"); // Aligner verticalement

  let middleZone = svg.append("g").attr("id", "middleZone");
  middleZone.append(() => baseImageAboveText.node());
  middleZone.append(() => baseTexteZone.node());

  // Calculer l'angle entre chaque image
  let angleStep = (2 * Math.PI) / circuits.circuits.length;

  // Ajouter les images autour du cercle
  circuits.circuits.forEach((url, i) => {
    let angle = i * angleStep;
    let x = width / 2 + radius * Math.cos(angle) - radius / 8;
    let y = height / 2 + radius * Math.sin(angle) - radius / 8;

    let image = svg
      .append("image")
      .attr(
        "xlink:href",
        "https://enseignants.lumni.fr/images_v5/lumni-v2/notice/1200x630/210/ME00000005180.jpeg"
      )
      .attr("x", x)
      .attr("y", y)
      .attr("width", radius / 2.5)
      .attr("height", radius / 2.5);

    image.on("mouseover", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("x", x - radius / 20) // Déplacer l'image vers la gauche
        .attr("y", y - radius / 20) // Déplacer l'image vers le haut
        .attr("width", radius / 2)
        .attr("height", radius / 2)
        .style("fill", "red");

      circuitLeftImage.attr(
        "xlink:href",
        "https://enseignants.lumni.fr/images_v5/lumni-v2/notice/1200x630/210/ME00000005180.jpeg"
      );
      middleZone.selectAll("*").remove();
      middleZone.append(() => circuitLeftImage.node());
      middleZone.append(() => circuitNameZone.node());
      middleZone.append(() => circuitInfoZone.node());
      circuitNameZone.text(url.pays);

      circuitInfoZone
        .append("text")
        .style("fill", "red") // Mettre le texte en couleur rouge
        .attr("x", width / 2)
        .attr("y", height / 2 - radius * 0.05) // déplacez le texte vers le bas de 20 unités
        .text(url.nom);

      circuitInfoZone
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + radius * 0.08) // déplacez le texte vers le bas de 20 unités
        .text("First Grand Prix : " + url.premiere_apparition);

      circuitInfoZone
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + radius * 0.16) // déplacez le texte vers le bas de 20 unités
        .text("Number of laps : " + url.nombre_de_tour);

      circuitInfoZone
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + radius * 0.24) // déplacez le texte vers le bas de 20 unités
        .text("Circuit length : " + url.longueur_km);

      circuitInfoZone
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + radius * 0.32) // déplacez le texte vers le bas de 20 unités
        .text("Lap record : " + url.record_du_tour);
    });

    //Réinitialiser l'image à sa taille et couleur d'origine lorsque la souris n'est plus dessus
    image.on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("x", x) // Réinitialiser la position x de l'image
        .attr("y", y) // Réinitialiser la position y de l'image
        .attr("width", radius / 2.5)
        .attr("height", radius / 2.5);
      middleZone.selectAll("*").remove();
      middleZone.append(() => baseImageAboveText.node());
      middleZone.append(() => baseTexteZone.node());
    });
  });
}

export { createCircuitsCircle };
