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
      Player1.velocity.y = -10
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
      Player1.velocity.y = -10
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
  
  // Player2

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
