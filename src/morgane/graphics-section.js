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
const html = `<h1>Carte du monde des pilotes</h1>`;
document.getElementById("orange").insertAdjacentHTML("beforebegin", html);
// Séparation
// Séparation
function createWorldMap() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const svg = d3
    .select("#orange")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "relative");

  const projection = d3
    .geoMercator()
    .scale(280)
    .translate([width / 2, height / 1.7]); // Adapter la projection selon la taille de la carte

  const path = d3.geoPath(projection);
  const g = svg.append("g").attr("width", width);

  // Regrouper les pilotes par pays
  const pilotesParPays = {};
  data.pilotes.forEach((pilote) => {
    if (!pilotesParPays[pilote.pays_origine]) {
      pilotesParPays[pilote.pays_origine] = [];
    }
    pilotesParPays[pilote.pays_origine].push(pilote);
  });

  // Charger les données géographiques mondiales
  d3.json(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  ).then((worldData) => {
    const countries = topojson.feature(worldData, worldData.objects.countries);

    // Tracer les frontières des pays
    g.selectAll(".country")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path)
      .style("stroke", "white")
      .style("fill", function (d) {
        // Vérifier si le pays a des pilotes
        const countryName = d.properties.name;
        if (countryName && pilotesParPays[countryName]) {
          return "orange"; // Couleur différente pour les pays avec des pilotes
        } else {
          return "lightgray"; // Couleur par défaut pour les autres pays
        }
      })
      // Gestion des événements au survol du pays
      .on("mouseover", function (d, event) {
        const countryName = d.properties.name;
        if (countryName && pilotesParPays[countryName]) {
          const block = d3
            .select("#blockWorldMap")
            .style("display", "block")
            .style("width", "250px")
            .style("height", "70px")
            .style("padding", "5px")
            .style("border", "1px solid white")
            .style("border-radius", "5px")
            .style("color", "white")
            .style("background-color", "red")
            .style("text-align", "center")
            .style("vertical-align", "middle")
            .style("position", "absolute")
            .style("z-index", "99999")
            .html(
              "<h3> " +
                countryName +
                "<br/></h3>" +
                pilotesParPays[countryName]
                  .map((pilote) => pilote.nom)
                  .join(" & ")
            );
        }
      })
      .on("mousemove", function () {
        const event = d3.event; // Accédez à l'événement de la souris natif
        const x = event.clientX; // Position x du curseur par rapport à la fenêtre du navigateur
        const y = event.clientY; // Position y du curseur par rapport à la fenêtre du navigateur
        d3.select("#blockWorldMap")
          .style("left", x + 10 + "px")
          .style("top", y + 10 + "px");
      })
      .on("mouseout", function (event) {
        const countryName = event.properties.name;
        if (countryName) {
          if (pilotesParPays[countryName]) {
            d3.select("#blockWorldMap").style("display", "none");
          }
        }
      });
  });
}

export { createGraphicsPilotes, createWorldMap };
