// Main

const canvas = document.querySelector('canvas')
const c = canvas.getContext ('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7
class Sprite {
   constructor({ position, velocity, color = 'Red' }) {
     this.position = position 
     this.velocity = velocity 
     this.width = 50
     this.height = 150
     this.lastKey
     this.color = color
     this.isAttacking
     this.attackBox = {
      position: this.position, 
      width: 100,
      height: 50
     }
   }

   draw() {
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    // AttackBox
    c.fillStyle = 'Green'
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    )
  
  }
  

  // Update


    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0
      } else this.velocity.y += gravity
    }


    // attack

    attack() {
      this.isAttacking = true
      setTimeout(() => {
        this.isAttacking = false 
      }, 100);
    }
    


}
 
const Player1 = new Sprite ({
  position: { x: 256, y: 100 },
  velocity: { x: 0, y: 10 },
  color: 'Blue'
})

const Player2 = new Sprite ({
  position: { x: 768, y: 100 },
  velocity: { x: 0, y: 10 }
})

console.log(Player1)

// Main End






// Keys

const keys = {
  a: {pressed: false},
  d: {pressed: false},
  ArrowLeft: {pressed: false},
  ArrowRight: {pressed: false},
  shiftleft: {pressed: false},
  Numpad0: {pressed: false}
}

// Keys






// Animate Start

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  Player1.update()
  Player2.update()
  
  let Player1Sprint = 4.5
  let Player2Sprint = 4.5
  if (keys.shiftleft.pressed) Player1Sprint *= 2
  if (keys.Numpad0.pressed) Player2Sprint *= 2
  
  Player1.velocity.x = 0
  Player2.velocity.x = 0
 
  // Player1

  if (keys.a.pressed && Player1.lastKey === 'a') {
    Player1.velocity.x = -Player1Sprint
  } else if (keys.d.pressed && Player1.lastKey === 'd') {
    Player1.velocity.x = Player1Sprint
  }
  
  // Player2
  
  if (keys.ArrowLeft.pressed && Player2.lastKey === 'ArrowLeft') {
    Player2.velocity.x = -Player2Sprint
  } else if (keys.ArrowRight.pressed && Player2.lastKey === 'ArrowRight') {
    Player2.velocity.x = Player2Sprint
  }

  // Detect Collision

  if (
    Player1.attackBox.position.x + Player1.attackBox.width >= Player2.position.x &&
    Player1.attackBox.position.x <= Player2.position.x + Player2.width &&
    Player1.attackBox.position.y + Player1.attackBox.height >= Player2.position.y &&
    Player1.attackBox.position.y <= Player2.position.y + Player2.height &&
    this.isAttacking
  ) {
    Player1.isAttacking = false
    console.log('Attack')
  }


}

animate()

// Animate End






// Movement Start

window.addEventListener('keydown', (event) => {

  // Player1

  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = true
      Player1.lastKey = 'a';
      break
    case 'KeyD':
      keys.d.pressed = true
      Player1.lastKey = 'd';
      break
    case 'KeyW':
      Player1.velocity.y = -20
      break
    case 'ShiftLeft':
      keys.shiftleft.pressed = true
      break
    case 'KeyU':
      Player1.attack ()
      break
  }
    
  // Player2

  switch (event.code) {  
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true 
      Player2.lastKey = 'ArrowLeft';
      break
    case 'ArrowRight': 
      keys.ArrowRight.pressed = true
      Player2.lastKey = 'ArrowRight';
      break
    case 'ArrowUp':
      Player2.velocity.y = -20
      break
    case 'Numpad0':
      keys.Numpad0.pressed = true
      break
  }
  
  console.log (event.code)
})

window.addEventListener('keyup', (event) => {

  // Player1

  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = false
      break
    case 'KeyD':
      keys.d.pressed = false
      break
    case 'ShiftLeft':
      keys.shiftleft.pressed = false
      break
  }
  
  // Player2

  switch (event.code) {  
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'Numpad0':
      keys.Numpad0.pressed = false
      break
  }

  console.log (event.code)
})

// Movement End