var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const gameButton = document.getElementById("strt_game");
const modalEl = document.getElementById("ModalEl");

var animation;
var score = 0;
var scores = [];

var playerImg = new Image();
playerImg.src = "nithyananda.png";

var keys = [];

canvas.addEventListener('mousemove', e => {
    g1.rotation=Math.atan2(e.offsetY - g1.y, e.offsetX - g1.x);
});

canvas.addEventListener('click', ev => {
    const angle = Math.atan2(ev.offsetY - canvas.height/2, ev.offsetX - canvas.width/2);
    const velocity = {
        x: Math.cos(angle)*4,
        y: Math.sin(angle)*4
    }
    bullets.push(new Bullet(g1.x, g1.y, 4, "cyan", velocity));
});

class Gun {
    constructor(img, x, y, width, height) {
        this.image = new Image();
        this.image.src = img;
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.rotation = 0;
    }

    draw() {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.image, 0, 0, 40, 25);

        ctx.restore();
    };
}

var g1 = new Gun("pistol.png", canvas.width/2, canvas.height/2, 10, 50);

var spawnE = setInterval(spawnEnemy, 1500);

rect(0, 0, canvas.width, canvas.height);

function reset(){
    enemies = [];
    bullets = [];
    particles = [];
    score = 0;
    ModalEl.style.display = "none";
    spawnE = setInterval(spawnEnemy, 1000);
    draw();
}

function draw(){
    animation = requestAnimationFrame(draw);
    rect(0, 0, canvas.width, canvas.height, "rgba(0, 0, 0, 0.22)");
    ctx.fillStyle = "blue";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30); 
    particles.forEach((particle, index) => {
        if(particle.alpha <= 0){
           particles.splice(index, 1);
        } else{
          particle.update();
        }
    });
    bullets.forEach((bullet, index) => {
        bullet.draw();
        if(bullet.x>canvas.width || bullet.x<0 || bullet.y<0 || bullet.y>canvas.height){
            bullets.splice(index, 1);
        }
        enemies.forEach((enemy, i) => {
            const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
            if(dist - enemy.r - bullet.radius<1){
                for(let i = 0; i<enemy.r*2; i++){
                    particles.push(new Particle(bullet.x, bullet.y, Math.random()*2, "red", {x: (Math.random() - 0.5) * (Math.random() * 5),y: (Math.random() - 0.5) * (Math.random() * 5)}))
                }

                if(enemy.r - 15 > 15){
                    enemy.r-=15;
                    score+=50;
                    bullets.splice(index, 1);
                  } else{
                    setTimeout(() => {
                      score+=50;
                      enemies.splice(i, 1);
                      bullets.splice(index, 1);
                    }, 0);
                  }
            }
        });
    });
    
    ctx.drawImage(playerImg, g1.x-35, g1.y-35, 70, 70);
    g1.draw();
    enemies.forEach((enemy, index) => {
        if(enemy.distance-35-enemy.r<1){
            cancelAnimationFrame(animation);
            scores.push(score);
            clearInterval(spawnE);
            ModalEl.style.display = "flex";
            document.querySelector("#score").innerHTML = score;
            document.querySelector("#highscore").innerHTML = Math.max(...scores);
        }
        if(enemy.r<10){
           enemies.splice(index);
        }
        enemy.draw();
    });
}

function rect(x, y, width, height, color="black"){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function circle(x, y, radius, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.fill();
}

gameButton.addEventListener("click", () => {
    reset();
});
