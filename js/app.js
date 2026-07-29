const root = document.documentElement;
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let animationFrameId;
let pointerX = 0;
let pointerY = 0;

const updatePerspective = () => {
  root.style.setProperty("--move-x", `${pointerX}deg`);
  root.style.setProperty("--move-y", `${pointerY}deg`);
  animationFrameId = undefined;
};

document.addEventListener("pointermove", (event) => {
  if (reduceMotionQuery.matches) {
    return;
  }

  pointerX = (event.clientX - window.innerWidth / 2) * -0.005;
  pointerY = (event.clientY - window.innerHeight / 2) * -0.01;

  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(updatePerspective);
  }
});
