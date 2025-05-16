// Main

const canvas = document.querySelector('canvas')
const c = canvas.getContext ('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7
class Sprite {
   constructor({ position, velocity }) {
     this.position = position 
     this.velocity = velocity 
     this.height = 150
   }

   draw() {
    c.fillStyle = 'Red'
    c.fillRect(this.position.x, this.position.y, 50, this.height)
  }
  
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0
      } else this.velocity.y += gravity
    }
}
 
const Player1 = new Sprite ({
  position: { x: 256, y: 100 },
  velocity: { x: 0, y: 10 }
})

const Player2 = new Sprite ({
  position: { x: 768, y: 100 },
  velocity: { x: 0, y: 10 }
})

console.log(Player1)

// Main End






// Animate Start

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  Player1.update()
  Player2.update()
  
  let speed = 4.5
  if (keys.shiftleft.pressed) speed *= 2
  if (keys.shiftright.pressed) speed *= 2

  Player1.velocity.x = 0
  Player2.velocity.x = 0
 
  // Player1

  if (keys.a.pressed && Player1.lastKey === 'a') {
    Player1.velocity.x = -speed
  } else if (keys.d.pressed && Player1.lastKey === 'd') {
    Player1.velocity.x = speed
  }
  
  // Player2
  
  if (keys.ArrowLeft.pressed && Player2.lastKey === 'ArrowLeft') {
    Player2.velocity.x = -speed
  } else if (keys.ArrowRight.pressed && Player2.lastKey === 'ArrowRight') {
    Player2.velocity.x = speed
  }
}

animate()

// Animate End






// Movement Start

const keys = {
  a: {pressed: false},
  d: {pressed: false},
  ArrowLeft: {pressed: false},
  ArrowRight: {pressed: false},
  shiftleft: {pressed: false},
  shiftright: {pressed: false}
}

let lastKey;

window.addEventListener('keydown', (event) => {
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
    case 'ShiftRight':
      keys.shiftright.pressed = true
      break
  }
  
  console.log (event.code)
})

window.addEventListener('keyup', (event) => {
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
    case 'ShiftRight':
      keys.shiftright.pressed = false
      break
  }

  console.log (event.code)
})

// Movement End