import { createPilotesCircle } from "./pilotes-section.js";
import { createCircuitsCircle } from "./circuits-section.js";
import { createFourCircle } from "./circles-section.js";
import { createGraphicsPilotes, createWorldMap } from "./graphics-section.js";
import { miniSpeedGame } from "./minigame-section.js";

createFourCircle();

createPilotesCircle();

createCircuitsCircle();

createGraphicsPilotes();

createWorldMap();

miniSpeedGame();

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: "none", duration: 0.5 });
const timeline = gsap.timeline();
timeline
  .addLabel("start") // Ajoute une étiquette nommée "start" au début de la timeline
  .from("#orange", { xPercent: 100 })
  .addLabel("orange_end") // Ajoute une étiquette nommée "orange_end" après l'animation de #orange
  .from("#bleu", { xPercent: 100 })
  .addLabel("bleu_end")
  .from("#gray", { yPercent: 100 })
  .addLabel("gray_end")
  .from("#pink", { yPercent: 100 })
  .addLabel("pink_end");

ScrollTrigger.create({
  animation: timeline,
  trigger: "#container",
  start: "top top",
  end: "+=4000",
  scrub: 1,
  snap: {
    snapTo: "labels", // snap to the closest label in the timeline
    duration: { min: 0.1, max: 1 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
    delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
    ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
  },
  pin: true,
});
