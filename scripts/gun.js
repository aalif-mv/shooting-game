class Gun {
    constructor(range, damage, scope) {
        this.damage = damage;
        this.range = range;
        this.scope = scope;
        this.bullets = [];
        this.position = new Vector2();
    }
    shoot(x, y) {
        this.bullets.push(new Bullet(-player.width/2, -player.height/2, x, y, 3));
    }
    trace() {
        let xTo = crossMultiply(this.range, hypotenuse(this.position.getX - mouse.x, this.position.getY - mouse.y), (this.position.getX - mouse.x));
        let yTo = crossMultiply(this.range, hypotenuse(this.position.getX - mouse.x, this.position.getY - mouse.y), (this.position.getY - mouse.y));
        canvas.beginPath();
        canvas.setLineDash([5, 15]);
        canvas.moveTo(this.position.getX, this.position.getY);
        canvas.lineTo(this.position.getX - xTo, this.position.getY - yTo);
        canvas.stroke();
    }
    render() {
        // 
    }
    renderbullets() {
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
            canvas.beginPath();
            canvas.arc(this.bullets[i].position.getX, this.bullets[i].position.getY, 5, 0, Math.PI * 2);
            canvas.fill("red");
        }
        // console.log(this.bullets)
    }
}
class Bullet {
    constructor(posX, posY, x, y, speed) {
        this.position = new Vector2(posX, posY);
        this.speed = new Vector2(crossMultiply(speed, hypotenuse(posX - x, posY - y), (posX - x)), crossMultiply(speed, hypotenuse(posX - x, posY - y), (posY - y)));
    }
    update() {
        this.position.x -= this.speed.getX;
        this.position.y -= this.speed.getY;
    }
}