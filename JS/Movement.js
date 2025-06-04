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
