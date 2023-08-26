

function mouseDown(e){
      global.isDragging = true;
      global.prevMouseX = event.clientX;
      global.prevMouseY = event.clientY;
}

function mouseMove(e){
    
  if (!global.isDragging) return;
  
  global.autoSpin = false
  global.autoSpinCountdown = global.autoSpinDelay
      
    let dx = event.movementX;
    let dy = event.movementY;

    let scale = 1e-5
    global.avY -= dx * scale;
    global.avX += dy * scale;
}

function mouseUp(e){
    global.isDragging = false
      global.prevMouseX = null;
      global.prevMouseY = null;
}