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
  clearTimeout(Timerid);
  const gameOverElement = document.querySelector("#Game-Over");
  gameOverElement.classList.add("show");
  if (Player1.health === Player2.health) {
    document.querySelector("#Game-Over").innerHTML = "Tie!!";
  } else if (Player1.health > Player2.health) {
    document.querySelector("#Game-Over").innerHTML = "Player 1 Wins!!";
  } else if (Player1.health < Player2.health) {
    document.querySelector("#Game-Over").innerHTML = "Player 2 Wins!!";
  }
}

// Timer

let Timer = 15;
let Timerid;
function decreaseTimer() {
  if (Timer > 0) {
    Timerid = setTimeout(decreaseTimer, 1000);
    Timer--;
    document.querySelector("#Timer").innerHTML = Timer;

    if (Timer <= 10) {
      document.querySelector("#Timer").classList.add("timer-warning");
    }
  }

  if (Timer === 0) {
    determineWinner({ Player1, Player2, Timerid });
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
    determineWinner({ Player1, Player2, Timerid });
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
