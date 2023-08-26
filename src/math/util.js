// shorthands
var pi = Math.PI
var pio2 = Math.PI/2
var twopi = 2*Math.PI
function v(){return new Vector(...arguments)}
function vp(){return Vector.polar(...arguments)}


function randRange(min,max){
    return min + rand()*(max-min)
}

function cleanAngle(a){
    a = nnmod(a,twopi)
    if( a > Math.PI ){
        a -= twopi
    }
    if( a < -Math.PI ){
        a += twopi
    }
    return a        
}

//non-negative mod
function nnmod(a,b){
    var r = a%b
    return (r>=0) ? r : r+b
}

// weighted avg
function avg(a,b,r=.5){
    return (a*(1.0-r)) + (b*r)
}
function va(a,b,r=.5){
    return v(avg(a.x,b.x,r),avg(a.y,b.y,r))
}

function normal(p1,p2,p3){
    return [
        (p2[1] - p1[1]) * (p3[2] - p1[2]) - (p2[2] - p1[2]) * (p3[1] - p1[1]),
        (p2[2] - p1[2]) * (p3[0] - p1[0]) - (p2[0] - p1[0]) * (p3[2] - p1[2]),
        (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0])
    ];
}

function calculateLightingIntensity(norm) {
    const lightDirection = global.lightDirection
    const dotProduct = norm[0] * lightDirection[0] + norm[1] * lightDirection[1] + norm[2] * lightDirection[2];
    //console.log(dotProduct)
    var result = Math.max(0,Math.min(1,(dotProduct+5)/10))
    
    return result
    
    var step = .5
    return Math.floor(result/step)*step
}

function arePointsClockwise(p1,p2,p3,p4) {
    const crossProduct = (p1[0] - p2[0]) * (p3[1] - p2[1]) - (p1[1] - p2[1]) * (p3[0] - p2[0]);
    return crossProduct > 0;
}


function rotateX(point, angle) {
    let [x, y, z] = point;
    return [
        x,
        y * Math.cos(angle) - z * Math.sin(angle),
        y * Math.sin(angle) + z * Math.cos(angle)
    ];
}

function rotateY(point, angle) {
    let [x, y, z] = point;
    return [
        z * Math.sin(angle) + x * Math.cos(angle),
        y,
        z * Math.cos(angle) - x * Math.sin(angle)
    ];
}

function rotateZ(point, angle) {
    let [x, y, z] = point;
    return [
        x * Math.cos(angle) - y * Math.sin(angle),
        x * Math.sin(angle) + y * Math.cos(angle),
        z
    ];
}

function project(point) {
    let [x, y, z] = point;
    let zoom = 200;
    let distance = 4;
    let scale = global.canvas.width / zoom;
    scale *= 5e-2
    x = x * scale;
    y = y * scale;
    z = z * scale;
    return [
        global.centerPos.x + x / (z + distance),
        global.centerPos.y + y / (z + distance)
    ];
}