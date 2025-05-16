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
