import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPilotesCircle } from "./pilotes-section.js";
import { createCircuitsCircle } from "./circuits-section.js";
import { createFourCircle } from "./circles-section.js";
import { firstPart } from "./race-section.js";
import {
  createGraphicsPilotes,
  createWorldMap,
  createPodium,
} from "./graphics-section.js";
import { miniSpeedGame } from "./minigame-section.js";

const togglePilotsCircuitsBtn = document.querySelector(".switch__input");
const bgPilotsCircuits = document.querySelector("#bg-pilotesCircuits");
let finalSection = document.querySelector("#finishDamier");
let audio = new Audio("../data/audio/end.mp3");

//bloque le scroll à la fin de la page
window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    document.body.style.overflow = "hidden";
  }
});
firstPart();

function createPilotesCircuitCircle() {
  if (togglePilotsCircuitsBtn.checked) {
    createPilotesCircle();
  } else {
    createCircuitsCircle();
  }
}

createPilotesCircuitCircle();

togglePilotsCircuitsBtn.addEventListener("click", () => {
  //console.log(togglePilotsCircuitsBtn.checked);
  bgPilotsCircuits.innerHTML = "";
  createPilotesCircuitCircle();
});

createFourCircle();

createGraphicsPilotes();

createWorldMap();

miniSpeedGame();

createPodium();

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: "none", duration: 0.5 });
const timeline = gsap.timeline();
timeline
  .addLabel("start")
  .from("#tableauAge", { yPercent: 100 }, "<")
  .addLabel("tableauAge_end")
  .to("#tableauAge", { xPercent: -100 })
  .from("#orange", { xPercent: 100 }, "<")
  .addLabel("orange_end")
  .from("#bleu", { xPercent: 100 })
  .to("#orange", { xPercent: -100 }, "<")
  .addLabel("bleu_end")
  .from("#gray", { yPercent: 100 })
  .to("#bleu", { yPercent: -100 }, "<")
  .addLabel("gray_end")
  .add(() => {
    audio.currentTime = 13;
    audio.volume = 0.13;
    audio.play();
  }, "gray_end") // Change this line
  .from("#pink", { yPercent: 100 })
  .addLabel("pink_end")
  .eventCallback("onReverseComplete", function () {
    audio.pause();
    audio.currentTime = 0;
  });

ScrollTrigger.create({
  animation: timeline,
  trigger: "#container",
  start: "top top",
  end: "+=14000",
  scrub: 1,
  snap: {
    snapTo: "labels", // snap to the closest label in the timeline
    duration: { min: 0, max: 0.5 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
    delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
    ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
  },
  pin: true,
  onEnd: function () {
    document.body.style.overflow = "hidden";
  },
});

// Sélectionnez l'élément conteneur
const f1Container = document.querySelector("#f1Emoji");

// Nombre d'emojis F1 à afficher pour couvrir toute la largeur de la page
const numberOfCars = Math.floor(window.innerWidth / 90); // Taille approximative d'une voiture

// Créez une chaîne contenant l'emoji F1
const f1Emoji = "🏎️";

// Créez une chaîne contenant plusieurs emojis F1
const f1EmojiString = f1Emoji.repeat(numberOfCars);

// Mettez cette chaîne dans le contenu de l'élément conteneur
f1Container.textContent = f1EmojiString;
