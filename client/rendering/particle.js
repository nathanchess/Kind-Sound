class Particle {
    constructor() {
        this.pos = createVector(random(width),random(height));
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxSpeed = 4;

        this.color = color(255, 222, 77);
    }

    update = () => {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);
    }

    applyForce = (force) => {
        this.acc.add(force);
    }

    show = () => {
        noStroke();
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = this.color;
        fill(this.color);
        rect(this.pos.x, this.pos.y, 10, 10)

    }

    wrapEdges = () => {
        if (this.pos.x > width) {
            this.pos.x = 0;
        }
        else if (this.pos.x < 0) {
            this.pos.x = width;
        }
        
        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    follow = (vectors) => {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        this.applyForce(vectors[index]);
    }
}
