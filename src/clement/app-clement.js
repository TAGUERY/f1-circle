/*


const svg = d3.select("#section1");
const path = svg.select("#pathCircuitHerroBanner");
const circle = svg.select("#animatedCircle");
const image = document.querySelector('#f1LogoHerroBanner');
const div = document.querySelector('#fixedArea');
const divScroll = document.querySelector('#scrollArea');
const svgElement = document.querySelector('#section1');


const pathLength = path.node().getTotalLength();


const pathNode = path.node();

function positionImage() {
    let points = [
        pathNode.getPointAtLength(pathLength * 1 / 16.2),
        pathNode.getPointAtLength(pathLength * 1 / 8.5),
        pathNode.getPointAtLength(pathLength * 1 / 5.750),
        pathNode.getPointAtLength(pathLength * 1 / 4.35)
    ];

    let svgRect = pathNode.getBoundingClientRect();

    let centerX = (points[0].x + points[1].x + points[2].x + points[3].x) / 4 + svgRect.left;
    let centerY = (points[0].y + points[1].y + points[2].y + points[3].y) / 4 + svgRect.top;

    let img = document.getElementById('centerImage');
    img.style.left = centerX + 'px';
    img.style.top = centerY + 'px';
}

let img = document.createElement('img');
img.src = 'https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg';
img.style.position = 'absolute';
img.style.transform = 'translate(-50%, -50%)'; // déplace l'image de 50% de sa largeur et de sa hauteur vers la gauche et vers le haut
img.id = 'centerImage'; // ID de l'image

//fixedArea.appendChild(img);

//positionImage(); // positionne l'image initialement

//window.addEventListener('resize', positionImage); // repositionne l'image chaque fois que la taille de la fenêtre change



















// Fonction pour mettre à jour la position du cercle en fonction du défilement
function updateCirclePosition() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollSpeedFactor = 0.7; // Augmentez cette valeur pour faire bouger le cercle plus rapidement
    const scrollFraction = (scrollPosition * scrollSpeedFactor) / maxScroll;
    const pathPoint = scrollFraction * pathLength;
    const { x, y } = path.node().getPointAtLength(pathPoint);

    // Mise à jour de la position du cercle sur le chemin
    circle.attr('cx', x)
        .attr('cy', y);

    // Animer la taille et l'opacité de l'image en fonction de la position de défilement

}

function updateImage() {
    const scrollPosition = window.pageYOffset;
    const stopScrollPosition = document.documentElement.scrollHeight * 0.3; // 30% de la hauteur totale de la page

    // Calculez la fraction de défilement basée sur le point d'arrêt
    const scrollFraction = scrollPosition / stopScrollPosition;

    // Si la position de défilement n'a pas encore atteint le point d'arrêt, continuez à mettre à jour l'opacité de l'image
    if (scrollPosition <= stopScrollPosition) {
        const minOpacity = 0; // Opacité minimale de l'image
        const maxOpacity = 1; // Opacité maximale de l'image
        const newOpacity = minOpacity + scrollFraction * (maxOpacity - minOpacity);

        // Mettez à jour la propriété CSS de l'image
        image.style.opacity = newOpacity;
    } else {
        // Si la position de défilement a dépassé le point d'arrêt, fixez l'opacité de l'image à la valeur maximale
        image.style.opacity = '1';
    }
}



function updateStyleHerroBanner() {
    const scrollPosition = window.pageYOffset;
    const stopScrollPosition = document.documentElement.scrollHeight * 0.34;

    div.style.transition = 'top 0.3s ease-out';

    if (scrollPosition >= stopScrollPosition) {
        // Changez le style de l'élément ici
        div.style.backgroundColor = 'white';
        svgElement.setAttribute('viewBox', '0 0 1920 4000');
        div.style.position = 'absolute';
        image.style.display = 'none';
        div.style.top = '1300px';
    } else {
        div.style.backgroundColor = 'rebeccapurple';
        div.style.position = 'fixed';
        image.style.display = 'block';
        div.style.top = '0';
        svgElement.setAttribute('viewBox', '0 0 1920 975');
    }
}

function updateCircleAndImage() {
    updateCirclePosition();
    updateImage();
    updateStyleHerroBanner();
}

// Mettre à jour la position initiale du cercle
updateCirclePosition();
updateImage();


// Mettre à jour la position du cercle lors du défilement
window.addEventListener('scroll', updateCircleAndImage);

*/

/*let img = document.createElement('img');
img.src = 'https://www.formula1.com/etc/designs/fom-website/images/f1_logo.svg';
img.style.position = 'absolute';
img.style.transform = 'translate(-50%, -50%)'; // déplace l'image de 50% de sa largeur et de sa hauteur vers la gauche et vers le haut
img.id = 'centerImage'; // ID de l'image*/

// Create a timeline
/*const tl = gsap.timeline({
    scrollTrigger: {
        trigger: div,
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom bottom", // when the bottom of the trigger hits the bottom of the viewport
        scrub: true // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    }
});

// Add animations to the timeline
tl.to(circle.node(), {
    attr: {
        cx: () => {
            const scrollPosition = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollSpeedFactor = 0.7;
            const scrollFraction = (scrollPosition * scrollSpeedFactor) / maxScroll;
            const pathPoint = scrollFraction * pathLength;
            return path.node().getPointAtLength(pathPoint).x;
        },
        cy: () => {
            const scrollPosition = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollSpeedFactor = 0.7;
            const scrollFraction = (scrollPosition * scrollSpeedFactor) / maxScroll;
            const pathPoint = scrollFraction * pathLength;
            return path.node().getPointAtLength(pathPoint).y;
        }
    }
})
    .to(image, { opacity: 1 })
    .to(div, { backgroundColor: 'white', position: 'absolute', top: '1300px' })
    .to(image, { display: 'none' })
    .to(svgElement, { attr: { viewBox: '0 0 1920 4000' } }, "<")
    .to(div, { backgroundColor: 'rebeccapurple', position: 'fixed', top: '0' }, "<")
    .to(image, { display: 'block' }, "<")
    .to(svgElement, { attr: { viewBox: '0 0 1920 975' } }, "<");
    */

/*
gsap.to(circle.node(), {
scrollTrigger: {
    trigger: div,
    start: "top top",
    end: "bottom+=1000 bottom",
    scrub: true
},// Animation duration in seconds
ease: "power1.inOut", // Easing function
motionPath: {
    path: pathNode,
    align: path.node(),
    autoRotate: true,
    start: 0,
    end: 1,
    alignOrigin: [0.5, 0.5]
}
});

// Change the height of the div
gsap.to(div, {
scrollTrigger: {
    trigger: div,
    start: "top top", // Start the animation at the top of the div
    end: "top+=45%", // Change the position at 15% of the total scroll
    scrub: true,
    onLeave: (self) => {
        gsap.set(div, { position: 'relative' }); // Change the position to relative when the scrollTrigger leaves the start point
    },
    onEnterBack: (self) => {
        gsap.set(div, { position: 'fixed' }); // Change the position back to fixed when the scrollTrigger enters the start point backwards
    }
},
height: "4000px", // Change the height to 4000px
ease: "power1.inOut"
});

*/
// Set the scroll speed factor
let scrollSpeed = 0.5;

// Add an event listener for the 'wheel' event
document.addEventListener(
  "wheel",
  function (event) {
    // Prevent default scrolling behavior
    event.preventDefault();

    // Calculate the new scroll position
    let delta = event.deltaY;
    let scrollPosition = window.scrollY + delta * scrollSpeed;

    // Set the new scroll position
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  },
  { passive: false }
);
