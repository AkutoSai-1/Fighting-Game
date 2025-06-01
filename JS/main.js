// Main

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
class Sprite {
  constructor({ position, velocity, color = "Red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.health = 100;
    this.lastKey;
    this.color = color;
    this.isJumping = false;
    this.jumpKeyPressed = false;
    this.jumpCount = 0;
    this.maxJumps = 2;
    this.isAttacking;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      offset,
      width: 100,
      height: 50,
    };
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // AttackBox

    if (this.isAttacking) {
      c.fillStyle = "Green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  // Update

  update() {
    this.draw();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height >= canvas.height) {
      this.velocity.y = 0;
      this.isJumping = false;
      this.jumpCount = 0;
      this.position.y = canvas.height - this.height;

      if (this.jumpKeyPressed) {
        this.jump();
      }
    } else {
      this.velocity.y += gravity;
    }
  }

  jump() {
    if (this.jumpCount < this.maxJumps) {
      this.velocity.y = -15;
      this.isJumping = true;
      this.jumpCount++;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const Player1 = new Sprite({
  position: { x: 256, y: 100 },
  velocity: { x: 0, y: 10 },
  color: "Blue",
  offset: { x: 0, y: 0 },
});

const Player2 = new Sprite({
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

// Collision

function RectCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ Player1, Player2, Timerid }) {
  document.querySelector("#Game-Over").style.display = "flex";
  if (Player1.health === Player2.health) {
    document.querySelector("#Game-Over").innerHTML = "Tie!!";
  } else if (Player1.health > Player2.health) {
    document.querySelector("#Game-Over").innerHTML = "Player 1 Wins!!";
  } else if (Player1.health < Player2.health) {
    document.querySelector("#Game-Over").innerHTML = "Player 2 Wins!!";
  }
}

// Timer

let Timer = 5;
let Timerid;
function decreaseTimer() {
  if (Timer > 0) {
    Timerid = setTimeout(decreaseTimer, 1000);
    Timer--;
    document.querySelector("#Timer").innerHTML = Timer;
  }

  if (Timer === 0) {
    determineWinner({ Player1, Player2 });
  }
}

decreaseTimer();

// Animate Start

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  Player1.update();
  Player2.update();

  let Player1Sprint = 4.5;
  let Player2Sprint = 4.5;
  if (keys.shiftleft.pressed) Player1Sprint *= 2;
  if (keys.Numpad0.pressed) Player2Sprint *= 2;

  Player1.velocity.x = 0;
  Player2.velocity.x = 0;

  // Player1

  if (keys.a.pressed && Player1.lastKey === "a") {
    Player1.velocity.x = -Player1Sprint;
  } else if (keys.d.pressed && Player1.lastKey === "d") {
    Player1.velocity.x = Player1Sprint;
  }

  // Player2

  if (keys.ArrowLeft.pressed && Player2.lastKey === "ArrowLeft") {
    Player2.velocity.x = -Player2Sprint;
  } else if (keys.ArrowRight.pressed && Player2.lastKey === "ArrowRight") {
    Player2.velocity.x = Player2Sprint;
  }

  // Detect Collision

  if (
    RectCollision({ rectangle1: Player1, rectangle2: Player2 }) &&
    Player1.isAttacking
  ) {
    Player1.isAttacking = false;
    Player2.health -= 20;
    document.querySelector("#Player2-Health-Bar").style.width =
      Player2.health + "%";
    console.log("%cAttack (ON WHAT!?)", "color:red");
  }

  if (
    RectCollision({ rectangle1: Player2, rectangle2: Player1 }) &&
    Player2.isAttacking
  ) {
    Player2.isAttacking = false;
    Player1.health -= 20;
    document.querySelector("#Player1-Health-Bar").style.width =
      Player1.health + "%";
    console.log("%cOn Titan!!", "color:cyan");
  }

  // End Game
  if (Player1.health <= 0 || Player2.health <= 0) {
    determineWinner({ Player1, Player2 });
  }
}

animate();

// Movement Start

window.addEventListener("keydown", (event) => {
  // Player1

  switch (event.code) {
    case "KeyA":
      keys.a.pressed = true;
      Player1.lastKey = "a";
      break;
    case "KeyD":
      keys.d.pressed = true;
      Player1.lastKey = "d";
      break;
    case "KeyW":
      Player1.jumpKeyPressed = true;
      Player1.jump();
      break;
    case "ShiftLeft":
      keys.shiftleft.pressed = true;
      break;
    case "KeyU":
      Player1.attack();
      break;
  }

  // Player2

  switch (event.code) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      Player2.lastKey = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      Player2.lastKey = "ArrowRight";
      break;
    case "ArrowUp":
      Player2.jumpKeyPressed = true;
      Player2.jump();
      break;
    case "Numpad0":
      keys.Numpad0.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  // Player1

  switch (event.code) {
    case "KeyA":
      keys.a.pressed = false;
      break;
    case "KeyD":
      keys.d.pressed = false;
      break;
    case "KeyW":
      Player1.jumpKeyPressed = false;
      break;
    case "ShiftLeft":
      keys.shiftleft.pressed = false;
      break;
  }

  // Player2

  switch (event.code) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowUp":
      Player2.jumpKeyPressed = false;
      break;
    case "Numpad0":
      keys.Numpad0.pressed = false;
      break;
    case "Enter":
      Player2.attack();
      break;
  }
});
