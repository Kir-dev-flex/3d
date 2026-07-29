const canvas = document.querySelector(".layers__rain");
const context = canvas.getContext("2d");
const rainToggle = document.querySelector(".hero__button");
const rainMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const dropCount = 140;

let drops = [];
let isPaused = false;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

class RainDrop {
  constructor() {
    this.reset(true);
  }

  reset(useRandomHeight = false) {
    this.x = randomBetween(0, canvas.width);
    this.y = useRandomHeight ? randomBetween(-500, 0) : -100;
    this.length = randomBetween(2, 12);
    this.velocity = randomBetween(2, 20);
    this.opacity = randomBetween(0.1, 0.55);
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y - this.length);
    context.lineWidth = 1;
    context.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    context.stroke();
  }

  update() {
    this.y += this.velocity;

    if (this.y >= canvas.height + 100) {
      this.reset();
    }

    this.draw();
  }
}

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops = Array.from({ length: dropCount }, () => new RainDrop());
};

const animateRain = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drops.forEach((drop) => drop.update());

  if (!rainMotionQuery.matches && !isPaused) {
    requestAnimationFrame(animateRain);
  }
};

resizeCanvas();
animateRain();
window.addEventListener("resize", resizeCanvas);

rainToggle.addEventListener("click", () => {
  isPaused = !isPaused;
  rainToggle.textContent = isPaused ? "Resume rain" : "Pause rain";

  if (!isPaused) {
    animateRain();
  }
});
