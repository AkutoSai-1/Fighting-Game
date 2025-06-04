// Animate Start

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
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
