import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const audioData = [
  { file: '/data/audio/audio3.mp3', start: 1738, end: 2346 },
  { file: '/data/audio/audio3.mp3', start: 2350, end: 2958 },
  { file: '/data/audio/audio3.mp3', start: 3064, end: 3672 },
  { file: '/data/audio/audio3.mp3', start: 3780, end: 4500 },
  // Ajoutez d'autres fichiers audio avec leurs plages de défilement ici
];
const audioElements = []; // Conservez une référence aux éléments audio pour les contrôler

function setupAudio() {
  // Créez les éléments audio et ajoutez-les à la page
  audioData.forEach(({ file }) => {
    const audio = new Audio(file);
    audioElements.push(audio);
    document.body.appendChild(audio);
  });
}

function updateAudioPlayback() {
  // Obtenez la position de défilement actuelle
  const scrollY = window.scrollY || window.pageYOffset;

  // Parcourez chaque donnée audio
  audioData.forEach(({ start, end }, index) => {
    // Vérifiez si la position de défilement se situe dans la plage de ce fichier audio
    if (scrollY >= start && scrollY <= end) {
      // Si l'audio n'est pas déjà en train de jouer, lancez-le
      if (audioElements[index].paused) {
        audioElements[index].play();
      }
    } else {
      // Si la position de défilement est en dehors de la plage, mettez en pause l'audio
      audioElements[index].pause();
      audioElements.currentTime = 0;
    }
  });
}

function firstPart() {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Get the path and the car
  const path = document.querySelector("#pathCircuitHerroBanner");
  const car = document.querySelector("#f1Car");

  // Get the total length of the path
  const pathLength = path.getTotalLength();
  // Hauteur de défilement de fin

  let isPlaying = false;

  function updatePosition() {

    // Get the scroll position
    const scrollY = window.scrollY || window.pageYOffset;
    console.log(scrollY);
    // Calculate the new position on the path
    const newPathPosition = (scrollY * 4.1) / (document.body.scrollHeight - window.innerHeight);

    // Check if the current scroll position is between the specified heights

    // Get the point on the path
    const point = path.getPointAtLength(newPathPosition * pathLength);

    // Get the next point on the path
    const nextPoint = path.getPointAtLength(
      (newPathPosition + 0.00001) * pathLength
    );

    // Calculate the angle between the current point and the next point
    const angle =
      (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) /
      Math.PI -
      90;

    // Update the position and rotation of the car
    gsap.to(car, {
      x: point.x,
      y: point.y,
      rotation: angle,
      transformOrigin: "50% 50%", // Set the rotation origin to the center of the car
      duration: 0.05, // A lower duration will make the animation faster
    });
  }

  // Listen for scroll events
  window.addEventListener("scroll", updatePosition);
  window.addEventListener("scroll", updateAudioPlayback);

  // Update the position at the start
  setupAudio();
  updateAudioPlayback();
  updatePosition();

  // Initialisation de l'opacité de l'image à 0
  gsap.set("#f1LogoHerroBanner", { opacity: 0 });

  // Création d'une timeline
  const tl = gsap.timeline();

  // Animation pour épingler le contenu et l'opacité de l'image
  tl.to("#fixedArea", {
    scrollTrigger: {
      trigger: "#fixedArea",
      start: "top top", // Dès le début de l'élément de déclenchement
      end: "1500px top", // Jusqu'à 1500 pixels de défilement
      pin: true, // Fixe l'élément en place
      scrub: 10000, // Activer le mode "scrubbing" pour une animation en douceur
      onUpdate: (self) => {
        // Mettre à jour l'opacité de l'image en fonction du progrès de la timeline
        gsap.to("#f1LogoHerroBanner", {
          opacity: self.progress, // Utiliser le progrès de la timeline comme opacité
          overwrite: true, // Permet de mettre à jour l'opacité même si elle est en cours d'animation
        });
      },
    },
  });
}
export { firstPart };
