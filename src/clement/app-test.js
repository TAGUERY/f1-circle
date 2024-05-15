import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function firstPart() {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Get the path and the car
  const path = document.querySelector("#pathCircuitHerroBanner");
  const car = document.querySelector("#f1Car");

  // Get the total length of the path
  const pathLength = path.getTotalLength();

  const lastPoint = 0;

  function updatePosition() {
    // Get the scroll position
    const scrollY = window.scrollY || window.pageYOffset;

    // Calculate the new position on the path
    const newPathPosition = (scrollY * 1.19) / document.body.scrollHeight;

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

    console.log(point.x);

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

  // Update the position at the start
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
      end: "1200px top", // Jusqu'à 1500 pixels de défilement
      pin: true, // Fixe l'élément en place
      scrub: 1, // Activer le mode "scrubbing" pour une animation en douceur
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
