

function update(dt) {    

    // cube physics
    if( global.autoSpin ){
        global.avX += global.gX*dt
        global.avY += global.gY*dt
        global.avZ += global.gZ*dt
    } else if (!global.isDragging) {
        global.autoSpinCountdown -= dt 
        if( global.autoSpinCountdown < 0 ){
            global.autoSpin = true
        }
    }
    var fm = 1.0 - (global.friction * dt)
    global.avX *= fm
    global.avY *= fm
    global.avZ *= fm
    
    global.angleX += global.avX*dt
    global.angleY += global.avY*dt
    global.angleZ += global.avZ*dt
    

    // check for resized window
    fitToContainer()    
}


var lastCanvasOffsetWidth = -1;
var lastCanvasOffsetHeight = -1;
function fitToContainer(){
    
    var cvs = global.canvas
    if( (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
        var padding = 0; // (extra zoom IN) thickness of pixels CUT OFF around edges
        if( (cvs.width < cvs.height) ){
            padding = cvs.width*3
        }
        if( cvs.height<500 ){
            padding = cvs.height
        }
        var dimension = Math.max(cvs.width, cvs.height) + padding*2;
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
        
        var xr = -global.canvasOffsetX / global.canvasScale
        var yr = -global.canvasOffsetY / global.canvasScale
        global.screenCorners = [v(xr,yr),v(1-xr,yr),v(1-xr,1-yr),v(xr,1-yr)]
    }
}