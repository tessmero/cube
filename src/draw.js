
    
    
// Render graphics
function draw(fps, t) {
    
    var ctx = global.ctx
    var canvas = global.canvas
    ctx.fillStyle = global.backgroundColor
    ctx.fillRect( 0, 0, canvas.width, canvas.height )


    if( false ){
        //debug
        // draw screen corners
        var r = .1
        ctx.fillStyle = 'red'
        global.screenCorners.forEach(c => ctx.fillRect( c.x-r, c.y-r, 2*r, 2*r ))
    }
    
    const center = global.centerPos
    
    const angleX = global.angleX
    const angleY = global.angleY
    const angleZ = global.angleZ
    
    
    let rotated = global.cube.map(point => rotateX(point, angleX));
    rotated = rotated.map(point => rotateY(point, angleY));
    rotated = rotated.map(point => rotateZ(point, angleZ));
    let projected = rotated.map(project);

    // draw verts
    if( false ){
        projected.forEach((point, i) => {
            ctx.beginPath();
            ctx.arc(point[0], point[1], 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }


    // draw edges
    ctx.lineWidth = global.edgeWidth
    if( false ){
        global.edges.forEach(edge => {
            let point1 = projected[edge[0]];
            let point2 = projected[edge[1]];
            ctx.beginPath();
            ctx.moveTo(point1[0], point1[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.stroke();
        });
    }
    
    // draw faces
    global.faces.forEach(face => {
        let point1 = projected[face[0]];
        let point2 = projected[face[1]];
        let point3 = projected[face[2]];
        let point4 = projected[face[3]];
        
        // skip hidden face
        if( face[5]==arePointsClockwise(point1,point2,point3,point4) ) return
        
        // compute lighting
        const norm = ( face[5] ?
                 normal(rotated[face[0]],rotated[face[1]],rotated[face[2]])
                :normal(rotated[face[0]],rotated[face[2]],rotated[face[1]])
            )
        const lightingIntensity = calculateLightingIntensity(norm);
        
        if( false ) ctx.fillStyle = face[4] // color code face for debugging
        
        // fill solid color
        //const val = 100 + (155 * lightingIntensity)
        ctx.fillStyle = 'white'; //`rgb(${val},${val},${val})`;
        ctx.beginPath();
        ctx.lineTo(point1[0], point1[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.lineTo(point3[0], point3[1]);
        ctx.lineTo(point4[0], point4[1]);
        ctx.closePath();
        ctx.fill();
        
        // draw dot pattern
        fillDots( ctx, [point1,point2,point3,point4], lightingIntensity )
        
        // outline edges
        //const val = 100 + (155 * lightingIntensity)
        ctx.strokeStyle = 'black'; //`rgb(${val},${val},${val})`;
        ctx.beginPath();
        ctx.lineTo(point1[0], point1[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.lineTo(point3[0], point3[1]);
        ctx.lineTo(point4[0], point4[1]);
        ctx.closePath();
        ctx.stroke();
    })

    // debug cube orientation
    if( false ){
        ctx.fillStyle = 'black'
        ctx.font = ".001em Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${global.angleX.toFixed(2)},${global.angleY.toFixed(2)},${global.angleZ.toFixed(2)}`, .5,.5);
    }
            
    //ctx.clearRect( 0, 0, canvas.width, canvas.height )

    //debug
    //drawFilledChunks(ctx)

    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}

function dotSize( lightIntensity ){
    return .001//.003 - .002*lightIntensity
}

function dotSpacing( lightIntensity ){
    return .0002 + .007*lightIntensity
}

function fillDots( g, faceVerts, lightIntensity ){
    var xr = [Infinity,-Infinity]
    var yr = [Infinity,-Infinity]
    var tx = 0
    var ty = 0
    faceVerts.forEach(xy => {
        if( xy[0] < xr[0] ) xr[0] = xy[0]       
        if( xy[0] > xr[1] ) xr[1] = xy[0]  
        if( xy[1] < yr[0] ) yr[0] = xy[1]       
        if( xy[1] > yr[1] ) yr[1] = xy[1]    
        tx += xy[0]
        ty += xy[1]
    })
    
    var step = dotSpacing( lightIntensity )
    var rad = dotSize( lightIntensity )
    var rad2 = 2*rad
    
    var cx = (tx/faceVerts.length)
    var cy = (tx/faceVerts.length)
    var startX = cx 
    while( startX > xr[0] ) startX -= step
    var startY = cy
    while( startY > yr[0] ) startY -= step
    var endX = cx 
    while( endX < xr[1] ) endX += step
    var endY = cy
    while( endY < yr[1] ) endY += step
    
    // define clipping region for dots
    g.beginPath();
    faceVerts.forEach(xy => g.lineTo(...xy))
    g.save()
    g.clip();
    
    // draw dots
    g.fillStyle = 'black'
    g.beginPath()
    var i = 0
    for( var y = startY ; y < endY ; y += step ){
        i += 1
        for( var x = startX ; x < endX ; x += step ){
            var xx = x //+ (i%2?step/2:0)
            //g.moveTo(xx,y)
            //g.arc( xx, y, rad, 0, twopi )
            g.fillRect( xx-rad, y-rad, rad2, rad2 )
        }
    }
    //g.fill()
    
    // reset clipping
    g.restore()
    
}