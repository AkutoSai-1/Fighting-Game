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

let Timer = 60;
let Timerid;
function decreaseTimer() {
  if (Timer > 0) {
    Timerid = setTimeout(decreaseTimer, 1000);
    Timer--;
    document.querySelector("#Timer").innerHTML = Timer;

    if (Timer <= 15) {
      document.querySelector("#Timer").classList.add("timer-warning");
    }
  }

  if (Timer === 0) {
    determineWinner({ Player1, Player2, Timerid });
  }
}
