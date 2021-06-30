class Bullet {
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        circle(this.x, this.y, this.radius, this.color);
    }
}

var bullets = [];