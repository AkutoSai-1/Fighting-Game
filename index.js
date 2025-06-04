// Main

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./Assets/oak_woods_v1.0/background/background.png",
});

const Player1 = new Fighter({
  position: { x: 256, y: 100 },
  velocity: { x: 0, y: 10 },
  color: "Blue",
  offset: { x: 0, y: 0 },
});

const Player2 = new Fighter({
  position: { x: 768, y: 100 },
  velocity: { x: 0, y: 10 },
  offset: { x: -50, y: 0 },
});

// Keys

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  shiftleft: { pressed: false },
  Numpad0: { pressed: false },
};

decreaseTimer();

animate();
