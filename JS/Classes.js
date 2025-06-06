class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  // Update

  update() {
    this.draw();
  }
}

class Fighter {
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

    if (this.position.y + this.height >= canvas.height - 94) {
      this.velocity.y = 0;
      this.isJumping = false;
      this.jumpCount = 0;
      this.position.y = canvas.height - 94 - this.height; // align with the ground

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
