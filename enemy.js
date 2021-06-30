class Enemy{
    constructor(x, y, radius){
        this.image = new Image();
        this.image.src = "./enemy.png";
        this.x = x;
        this.y = y;
        this.r = radius;
        this.distanceX = this.x - g1.x;
        this.distanceY = this.y - g1.y;
        this.distance = Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY);
        this.velocity = {x: this.distanceX*(-0.003), y: this.distanceY*(-0.003)};
    }
    draw(){
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        this.distanceX = this.x - g1.x;
        this.distanceY = this.y - g1.y;
        this.distance = Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY);
        ctx.drawImage(this.image, this.x-this.r, this.y-this.r, this.r*2, this.r*2);
    }
}

var enemies = [];

function spawnEnemy(){
    var rad = Math.random() * (45 - 15) + 15;
    enemies.push(new Enemy(Math.random()>0.5?0 - rad:canvas.width + rad, Math.random()*canvas.height, rad));
}