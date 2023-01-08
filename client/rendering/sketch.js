var zoff = 0;

var inc = 0.1;
var scl = 20;
var cols, rows;
var particles = [];
var flowField = [];

function setup() {
    createCanvas(windowWidth,windowHeight-10);
    cols = floor(width / scl);
    rows = floor(height / scl);

    flowField = new Array(cols * rows);

    for (var i=0; i<100; i++) {
        particles[i] = new Particle();
    }
}

function draw() {
    background(4);
    var yoff = 0;
    for (var y=0; y<rows; y++) {
        var xoff = 0;
        for (var x=0; x<cols; x++) {
            var index = x + y * cols;
            var r = noise(xoff, yoff) * 255;
            var angle = noise(xoff, yoff, zoff) * TWO_PI;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(.05);

            flowField[index] = v;
            xoff += inc;
        }
        yoff += inc;
        zoff += .0001;
    }

    for (var i=0; i<particles.length; i++) {
        particles[i].follow(flowField);
        particles[i].update();
        particles[i].show();
        particles[i].wrapEdges();
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
