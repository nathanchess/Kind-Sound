import React from 'react';
import Sketch from 'react-p5';

var zoff = 0;

var inc = 0.1;
var scl = 20;
var cols, rows;
var particles = [];

// var flowField = new Array(cols * rows);
var flowField = []

var canvas;
export default (props) => {
    const setup = (p, canvasParentRef) => {
        canvas = p.createCanvas(p.windowWidth-10, p.windowHeight-10).parent(canvasParentRef);
        canvas.position(0,0)
        canvas.style('z-index', '0');
        
        cols = p.floor(p.width / scl);
        rows = p.floor(p.height / scl);

        // flowField = new Array(cols * rows);
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                flowField.push([0,0]);
            }
        }
    
        for (var i=0; i<100; i++) {
            
            // particles.push(Particle);
            let randX = Math.floor(Math.random()*p.width);
            let randY = Math.floor(Math.random()*p.height);
            p.fill(0,0,255);
            p.textSize(34);
            p.text(`${randX}`, 700, 40);
            p.text(`${randY}`, 900, 40);
            particles.push({
                pF: p,
                pos: [randX, randY],
                vel: [0,0],
                acc: [0,0],
                maxSpeed: 4,
            });
            particles[i].pF = p;
            
            particles[i].pos = [Math.random(p.width), Math.random(p.height)];
            particles[i].vel = [0,0];
            particles[i].acc = [0,0];
            // particles[i].pos = p.Vector(600,600);
            // particles[i].vel = p.Vector(0,0);
            // particles[i].acc = p.Vector(0,0);

            particles[i].maxSpeed = 4;

        }
    }

    const draw = (p) => {
        p.background(0,0,0,0);
        const context = p.canvas.getContext('2d');
        context.clearRect(0, 0, p.canvas.width, p.canvas.height);

        var yoff = 0;
        for (var y=0; y<rows; y++) {
            var xoff = 0;
            for (var x=0; x<cols; x++) {
                var index = x + y * cols;
                var r = p.noise(xoff, yoff) * 255;
                var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
                var mag = 0.05;
                var v = [Math.cos(angle), Math.sin(angle)];
                var scale = mag / (Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2)));
                v[0] = v[0] * scale;
                v[1] = v[1] * scale;

                flowField[index] = v;
                xoff += inc;
            }
            yoff += inc;
            zoff += .0001;
        }

        for (var i=0; i<particles.length; i++) {
            
            var x = p.floor(particles[i].pos[0] / scl);
            var y = p.floor(particles[i].pos[1] / scl);

            var index = x + y * cols;

            var forceVector = flowField[index];
            particles[i].acc[0] += forceVector[0];
            particles[i].acc[1] += forceVector[1];

            particles[i].vel[0] += particles[i].acc[0];
            particles[i].vel[1] += particles[i].acc[1];

            particles[i].pos[0] += particles[i].vel[0];
            particles[i].pos[1] += particles[i].vel[1];

            let mag = Math.sqrt(Math.pow(particles[i].vel[0], 2) + Math.pow(particles[i].vel[1],2));
            if (mag > particles[i].maxSpeed) {
                let scale = particles[i].maxSpeed / (Math.sqrt(Math.pow(particles[i].vel[0],2) + Math.pow(particles[i].vel[1],2)));
                particles[i].vel[0] = particles[i].vel[0] * scale;
                particles[i].vel[1] = particles[i].vel[1] * scale;
            }

            particles[i].acc[0] = 0;
            particles[i].acc[1] = 0;

            particles[i].pF.noStroke();
            particles[i].pF.fill(255,255,255);
            particles[i].pF.rect(particles[i].pos[0], particles[i].pos[1], 7, 7)

            if (particles[i].pos[0] > particles[i].pF.width) {
                particles[i].pos[0] = 0;
            }
            else if (particles[i].pos[0] < 0) {
                particles[i].pos[0] = particles[i].pF.width;
            }
            
            if (particles[i].pos[1] > particles[i].pF.height) {
                particles[i].pos[1] = 0;
            } else if (particles[i].pos[1] < 0) {
                particles[i].pos[1] = particles[i].pF.height;
            }
        }
	};
    return <Sketch setup={setup} draw={draw}/>;
}
