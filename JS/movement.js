window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = true
      player.lastKey = 'a';
      break
    case 'KeyD':
      keys.d.pressed = true
      player.lastKey = 'd';
      break
    case 'KeyW':
      player.velocity.y = -10
      break
    case 'ShiftLeft':
      keys.shiftleft.pressed = true
      break
  }
    
  // Enemy

  switch (event.code) {  
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true 
      lastKey = 'ArrowLeft';
      break
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      lastKey = 'ArrowRight';
      break
    case 'ArrowUp':
      player.velocity.y = -10
      break
    case 'ShiftRight':
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
  
  // Enemy

  switch (event.code) {  
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ShiftRight':
      keys.shiftleft.pressed = false
      break
  }

  console.log (event.code)
})
