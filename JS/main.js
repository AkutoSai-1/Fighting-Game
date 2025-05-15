const canvas = document.querySelector('canvas')
const c = canvas.getContext ('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2 
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
 
const player = new Sprite ({
  position: { x: 256, y: 100 },
  velocity: { x: 0, y: 10 }
})

const enemy = new Sprite ({
  position: { x: 768, y: 100 },
  velocity: { x: 0, y: 10 }
})

console.log(player)

const keys = {
  a: {pressed: false},
  d: {pressed: false},
  shiftleft: {pressed: false}
}

let lastKey;

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()
  
  let speed = 4.5
  if (keys.shiftleft.pressed) speed *= 2

  player.velocity.x = 0
  
  if (keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -speed
  } else if (keys.d.pressed && lastKey === 'd') {
    player.velocity.x = speed
  }
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = true
      lastKey = 'a';
      break
    case 'KeyD':
      keys.d.pressed = true
      lastKey = 'd';
      break
    case 'KeyW':
      player.velocity.y = -10
      break
    case 'ShiftLeft':
      keys.shiftleft.pressed = true
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
  
  console.log (event.code)
})
