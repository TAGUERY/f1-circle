import { createPilotesCircle } from "./pilotes-section.js";
import { createCircuitsCircle } from "./circuits-section.js";
import { createFourCircle } from "./circles-section.js";
import { createGraphicsPilotes, createWorldMap } from "./graphics-section.js";
import { miniSpeedGame } from "./minigame-section.js";
const togglePilotsCircuitsBtn = document.querySelector(".switch__input");
const bgPilotsCircuits = document.querySelector("#bg-pilotesCircuits");

console.log("togglePilotsCircuitsBtn", togglePilotsCircuitsBtn);
togglePilotsCircuitsBtn.addEventListener("click", () => {
  //console.log(togglePilotsCircuitsBtn.checked);
  bgPilotsCircuits.innerHTML = "";
  if (togglePilotsCircuitsBtn.checked) {
    console.log("createPilotesCircle");
    createPilotesCircle();
  } else {
    console.log("createCircuitsCircle");
    createCircuitsCircle();
  }
});

createFourCircle();

createGraphicsPilotes();

createWorldMap();

miniSpeedGame();

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: "none", duration: 0.5 });
const timeline = gsap.timeline();
timeline
  .addLabel("start")
  .from("#bg-circuits", { yPercent: 100 })
  .addLabel("bg-circuits_end")
  .to("#bg-circuits", { yPercent: -100 })
  .from("#red", { yPercent: 100 }, "<")
  .addLabel("red_end")
  .to("#red", { xPercent: -100 })
  .from("#orange", { xPercent: 100 }, "<")
  .addLabel("orange_end")
  .from("#bleu", { xPercent: 100 })
  .to("#orange", { xPercent: -100 }, "<")
  .addLabel("bleu_end")
  .from("#gray", { yPercent: 100 })
  .addLabel("gray_end")
  .from("#pink", { yPercent: 100 })
  .addLabel("pink_end");

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
});
