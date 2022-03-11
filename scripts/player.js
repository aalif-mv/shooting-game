class Player {
    constructor() {
        this.body = new Vector2();
        this.height = 256.22513;
        this.width = 155;
        this.facing = "w";
        this.gravity = 0.23;
        this.friction = 0.8;
        this.jetFuel = 100;
        this.health = 100;
        this.ground = false;
        this.speed = new Vector2();
        this.guns = {1:new Gun(400, 15, 300), 2:new Gun(800, 35, 600)};
        this.currentGun = "1";
        this.image = new Image();
        this.image.src = "./assets/player_side_animation.png";
    }
    update() {
        if (keyMap.get("a")) {
            this.speed.x = -6;
            this.facing = "e";
        }
        if (keyMap.get("d")) {
            this.speed.x = 6;
            this.facing = "w";
        }
        if (keyMap.get("w") && this.jetFuel > 0 ) {
            this.speed.y = -3.5;
            this.jetFuel -= 1;
            this.ground = false;
            ui.uiItems.fuel.innerWidth -= 2;
            if (ui.uiItems.fuel.innerWidth <= 4) {
                ui.uiItems.fuel.innerWidth = 4;
            }
        }
        if (keyMap.get("s")) {
            this.speed.y = 1;
        }
        if (keyMap.get(" ") && this.ground) {
            this.speed.y = -3;
            this.ground = false;
        }
        if (this.jetFuel < 100 && ! keyMap.get("w")) {
            this.jetFuel += 0.18;
            ui.uiItems.fuel.innerWidth += 0.18 * 2;
        }
        this.speed.x *= this.friction;
        this.speed.y += this.gravity;
        this.body.add(new Vector2(this.speed.x, this.speed.y));
        this.collusion();
    }
    collusion() {
        for (let i = 0; i < world.items.length; i++) {
            if (this.body.y + this.height/2 > world.items[i].position.getY && this.body.x + this.width/2 > world.items[i].position.getX && this.body.x - this.width/2 < world.items[i].position.getX + world.items[i].width && this.body.y - this.height/2 < world.items[i].position.getY + world.items[i].height) {
                this.speed.y = 0;
                this.friction = 0.8;
                this.ground = true;
                this.body.y = (world.items[i].position.getY - this.height/2);
            }
        }
        if (this.body.y > 2000) {
            console.log("dead");
        }
    }
    render() {
        canvas.fillStyle("blue");
        animation.render();
        // canvas.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        // canvas.drawImage(this.image,-this.width/2, -this.height/2, this.width, this.height);
        this.guns[this.currentGun].trace();
        // this.guns[this.currentGun].renderbullets();
    }
    shootGun(x, y) {
        this.guns[this.currentGun].shoot(x,y);
    }
    dropGun() {
        // 
    }
    pickGun() {
        // 
    }
}