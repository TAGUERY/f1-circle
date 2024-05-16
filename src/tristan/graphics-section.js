import data from "/data/pilotes.json";

let widthWin = window.innerWidth;
let heightWin = window.innerHeight;

function createGraphicsPilotes() {
  const width = widthWin / 1.5;
  const height = heightWin / 2;

  // Créer des tranches d'âge
  const tranchesAge = [
    { label: "18 à 24 ans", min: 0, max: 24 },
    { label: "25 à 29 ans", min: 25, max: 29 },
    { label: "30 à 34 ans", min: 30, max: 34 },
    { label: "35ans +", min: 35, max: Infinity },
  ];

  // Compter le nombre de pilotes dans chaque tranche d'âge
  const totalPilotes = data.pilotes.length;
  const counts = tranchesAge.map((tranche) => {
    const count = data.pilotes.filter((pilote) => {
      const age =
        new Date().getFullYear() -
        new Date(pilote.date_de_naissance).getFullYear();
      return age >= tranche.min && age <= tranche.max;
    }).length;
    return {
      label: tranche.label,
      count: count,
      percentage: (count / totalPilotes) * 100,
    };
  });

  // Créer l'échelle X
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(counts, (d) => d.count)])
    .range([0, width]);

  // Créer l'échelle Y avec un remplissage plus grand
  const y = d3
    .scaleBand()
    .domain(counts.map((d) => d.label))
    .range([height, 0])
    .padding(0.3); // Ajustez la valeur de remplissage ici pour augmenter l'espace entre les tranches d'âge

  // Créer l'axe X
  const xAxis = d3.axisBottom(x).tickSize(0); // Supprimer les ticks de l'axe X

  // Créer l'axe Y
  const yAxis = d3.axisLeft(y);

  // Calculer le décalage en pixels
  const xOffset = 0.1 * widthWin;
  const yOffset = 0.2 * heightWin;

  // Créer le SVG avec la transformation pour placer le graphe en bas
  const svg = d3
    .select("#tableauAge")
    .append("svg")
    .attr("width", widthWin)
    .attr("height", heightWin)
    .append("g")
    .attr("transform", "translate(" + xOffset + ", " + yOffset + ")");

  // Ajouter un rectangle de fond gris
  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "transparent");

  // Utilisez le motif de remplissage pour vos barres
  svg
    .selectAll(".bar")
    .data(counts)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 30) // Translate de 30 à droite
    .attr("y", (d) => y(d.label))
    .attr("width", (d) => x(d.count))
    .attr("height", y.bandwidth())
    .attr("fill", (d, i) => {
      if (i % 2 === 0) {
        const gradient = svg
          .append("defs")
          .append("linearGradient")
          .attr("id", "gradient" + i)
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "0%");
        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "white");
        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "gray");
        return "url(#gradient" + i + ")";
      } else {
        const gradient = svg
          .append("defs")
          .append("linearGradient")
          .attr("id", "gradient" + i)
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "0%");
        gradient.append("stop").attr("offset", "0%").attr("stop-color", "red");
        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "darkred");
        return "url(#gradient" + i + ")";
      }
    })
    .attr("rx", 10) // Arrondir les angles de 10px
    .attr("ry", 10); // Arrondir les angles de 10px

  // Ajouter les pourcentages à la fin de chaque barre
  svg
    .selectAll(".percentage")
    .data(counts)
    .enter()
    .append("text")
    .attr("class", "percentage")
    .attr("x", (d) => x(d.count) + 5) // Décaler le texte à droite de la barre
    .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .style("fill", "white")
    .style("font-size", "3rem")
    .attr("transform", "translate(-30, -40)") // Modifier le translate ici
    .text((d) => Math.round(d.percentage) + "%");

  // Ajouter l'axe Y
  svg
    .append("g")
    .attr("stroke", "white")
    .call(yAxis)
    .selectAll("text") // Sélectionnez tous les éléments texte
    .style("font-size", "20px") // Modifiez la taille de la police
    .attr("fill", "white");

  // Ajouter le titre en haut
  const text = svg
    .append("text")
    .text("Grid by age")
    .attr("class", "title")
    .attr("text-anchor", "end")
    .attr("fill", "red")
    .style("stroke", "white")
    .style("stroke-width", "3.5px")
    .attr("x", "75%")
    .attr("y", "-5%") // Positionner le titre en haut
    .style("position", "absolute");
}

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
    .scale(220)
    .translate([width / 2, height / 1.49]); // Adapter la projection selon la taille de la carte

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
        const countryName = d.properties.name;
        if (countryName && pilotesParPays[countryName]) {
          return "lightcoral";
        } else {
          return "lightgray";
        }
      })
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

    const text = g
      .append("text")
      .text("Pilot's origin")
      .attr("class", "title world")
      .attr("fill", "red")
      .style("stroke", "white")
      .style("stroke-width", "3.5px")
      .attr("x", 100)
      .attr("y", height - 100)
      .style("position", "absolute");
  });
}

// Création d'un podium
function createPodium() {
  // stock les 3 pilotes avec les plus de championnats du monde
  const podium = data.pilotes
    .sort((a, b) => b.nombre_de_coupes_du_monde - a.nombre_de_coupes_du_monde)
    .slice(0, 3);

  const documentPodium = [];
  documentPodium.push(document.getElementById("podium1"));
  documentPodium.push(document.getElementById("podium2"));
  documentPodium.push(document.getElementById("podium3"));

  documentPodium.forEach((element, i) => {
    element.querySelector(
      ".piloteName"
    ).textContent = `${podium[i].prenom} ${podium[i].nom}`;
    element.querySelector(".piloteImage").src = podium[i].photo;
    element.querySelector(
      ".nbTitles"
    ).textContent = `${podium[i].nombre_de_coupes_du_monde}x`;
  });
}

export { createGraphicsPilotes, createWorldMap, createPodium };
