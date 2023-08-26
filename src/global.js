resetRand()

const global = {
    
    // graphics context
    canvas: null,
    ctx: null,

    // 
    backgroundColor: 'black',
    edgeWidth: .002,
    
    // relate screen pixels to virtual 2D units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,
    centerPos: v(.5,.5),
    screenCorners: null, 
    
    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //virtual units
    
    // cube orientation
    angleX: 0,
    angleY: 0,
    angleZ: 0,
    
    // cube spin
    avX: 0,
    avY: 0,
    avZ: 0,
    friction: 1e-3, //fraction of av lost per ms
    autoSpin: true,
    autoSpinCountdown: 0, //ms    
    autoSpinDelay: 3000, //ms
    
    // passive spin force (change in av per ms)
    gX: 1e-7,
    gY: 1e-6,
    gZ: 0,
    
    isDragging:  false,
    prevMouseX: null,
    prevMouseY: null,
    cube: [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ],

    edges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
    ],
    
    faces: [
        [0, 1, 2, 3,'red',true], // Front face
        [4, 5, 6, 7,'green',false], // Back face
        [0, 1, 5, 4,'blue',false], // Bottom face
        [2, 3, 7, 6,'orange',false], // Top face
        [1, 2, 6, 5,'black',false], // Right face
        [0, 3, 7, 4,'pink',true]  // Left face
    ],
    
    //lighting
    lightDirection: [0, 1, 1], // Light direction 
}