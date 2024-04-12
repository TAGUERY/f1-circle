import data from "/data/pilotes.json";

let widthWin = window.innerWidth;
let heightWin = window.innerHeight;

function createGraphicsPilotes() {
  // Définir la largeur et la hauteur du graphique
  const width = widthWin / 1.1;
  const height = heightWin / 2;

  // Créer des tranches d'âge
  const tranchesAge = [
    { label: "18 - 24", min: 0, max: 24 },
    { label: "25 - 29", min: 25, max: 29 },
    { label: "30 - 34", min: 30, max: 34 },
    { label: "35+", min: 35, max: Infinity },
  ];

  // Compter le nombre de pilotes dans chaque tranche d'âge
  const counts = tranchesAge.map((tranche) => {
    const count = data.pilotes.filter((pilote) => {
      const age =
        new Date().getFullYear() -
        new Date(pilote.date_de_naissance).getFullYear();
      return age >= tranche.min && age <= tranche.max;
    }).length;
    return { label: tranche.label, count: count };
  });

  // Paramètres du graphique
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };

  // Créer l'échelle X
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(counts, (d) => d.count)])
    .range([0, width - padding.left - padding.right]);

  // Créer l'échelle Y
  const y = d3
    .scaleBand()
    .domain(counts.map((d) => d.label))
    .range([height - padding.top - padding.bottom, 0])
    .padding(0.1);

  // Créer l'axe X
  const xAxis = d3.axisBottom(x);

  // Créer l'axe Y
  const yAxis = d3.axisLeft(y);

  // Créer le SVG
  const svg = d3
    .select("#red")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

  // Ajouter un rectangle de fond gris
  svg
    .append("rect")
    .attr("width", width - padding.left - padding.right)
    .attr("height", height - padding.top - padding.bottom)
    .attr("fill", "#1b1b1b");

  // Ajouter les barres avec les couleurs basées sur l'échelle de couleur
  svg
    .selectAll(".bar")
    .data(counts)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", (d) => y(d.label))
    .attr("width", (d) => x(d.count))
    .attr("height", y.bandwidth())
    .attr("fill", "red")
    .attr("stroke", "white")
    .attr("stroke-width", 3);

  // Ajouter des étiquettes de couleur
  svg
    .selectAll(".label")
    .data(counts)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => x(d.count))
    .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
    .attr("dx", 5)
    .attr("dy", ".35em")
    .attr("fill", "red")
    .text((d) => d.count);

  // Ajouter l'axe X
  svg
    .append("g")
    .attr("stroke", "orange")
    .attr("transform", "translate(0," + (height - padding.bottom) + ")")
    .call(xAxis);

  // Ajouter l'axe Y
  svg
    .append("g")
    .attr("transform", "translate(" + -padding.right + ",0)")
    .attr("stroke", "orange")
    .call(yAxis);
}

//separation

function createWorldMap() {
  const width = window.innerWidth / 1.2;
  const height = window.innerHeight / 2;
  const svg = d3
    .select("#orange")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  const projection = d3
    .geoMercator()
    .scale(100)
    .translate([width / 2, height / 1.4]);
  const path = d3.geoPath(projection);
  const g = svg.append("g");

  // Regrouper les pilotes par pays
  const pilotesParPays = {};
  data.pilotes.forEach((pilote) => {
    if (!pilotesParPays[pilote.pays_origine]) {
      pilotesParPays[pilote.pays_origine] = [];
    }
    pilotesParPays[pilote.pays_origine].push(pilote);
  });

  // Mettre le pays en question en bleu
  const selectedCountry = "France"; // Remplacez "France" par le pays de votre choix
  g.selectAll(".country")
    .filter((d) => d.properties.name === selectedCountry)
    .style("fill", "blue");

  // Dessiner les pays
  d3.json(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  ).then((worldData) => {
    const countries = topojson.feature(worldData, worldData.objects.countries);
    g.selectAll(".country")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path)
      .style("stroke", "red"); // Contours rouges pour les pays

    // Dessiner les cercles pour les pilotes
    Object.entries(pilotesParPays).forEach(([pays, pilotes]) => {
      const piloteGroup = g.append("g").attr("class", "pilote-group");
      const countryPath = countries.features.find(
        (country) => country.properties.name === pays
      );
      const centroid = countryPath ? path.centroid(countryPath) : [-100, -100];

      pilotes.forEach((pilote, piloteIndex) => {
        const yOffset = piloteIndex * 20;
        piloteGroup
          .append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1] + yOffset)
          .attr("r", 15) // Rayon des cercles
          .attr("fill", "red") // Couleur des cercles
          .attr("opacity", 0.9)
          .on("mouseover", function () {
            // Afficher les informations de tous les pilotes du pays
            const x = centroid[0] - pays.length * 5;
            const y = centroid[1] - 55 + yOffset;
            const infoBlock = svg.append("g").attr("id", "infoBlock");

            const blockHeight = 50 + pilotes.length * 20;

            infoBlock
              .append("rect")
              .attr("x", x)
              .attr("y", y)
              .attr("width", 150)
              .attr("height", blockHeight)
              .attr("fill", "red")
              .attr("radius", 0.5)
              .attr("stroke", "white")
              .attr("opacity", 0.9);

            infoBlock
              .append("text")
              .attr("x", x + 75)
              .attr("y", y + 20)
              .attr("text-anchor", "middle")
              .text(pays)
              .style("font-size", "20px")
              .style("fill", "white");

            pilotes.forEach((pilote, index) => {
              infoBlock
                .append("text")
                .attr("text-anchor", "middle")
                .attr("x", x + 75)
                .attr("y", y + 50 + index * 20) // Espacer les informations des pilotes
                .text(pilote.nom)
                .style("font-size", "15px")
                .style("fill", "white");
            });
          })
          .on("mouseout", function () {
            d3.select("#infoBlock").remove(); // Supprimer le groupe d'informations
          });
      });
    });
  });
}

export { createGraphicsPilotes, createWorldMap };
