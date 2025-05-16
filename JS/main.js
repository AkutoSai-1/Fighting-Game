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
