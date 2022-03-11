class Animation {
    constructor(){
        this.angle = 0;
        this.walking = new Image();
        this.walking.src = "./assets/player_side.svg";
        this.arms = new Image();
        this.arms.src = "./assets/player_arms.svg";
        this.frameCount = 8;
        this.height = 512.45056;
        this.currentFrame = 0;
        this.frames = {walking_e: [[0, 0, 154.896, 256.502],[154.896, 0, 153.838, 256.502], [308.734, 0, 53.190, 256.502], [361.924, 0, 105.897, 256.502], [467.821, 0, 154.896, 256.502], [622.717, 0, 153.838, 256.502], [776.555, 0,  53.189, 256.502], [829.744, 0, 105.897, 256.502], [935.641, 0, 154.896, 256.502]],
            walking_w: [[0, 256.22513, 154.896, 256.502],[154.896, 256.22513, 153.838, 256.502], [308.734, 256.22513,  53.190, 256.502], [361.924, 256.22513, 105.897, 256.502], [467.821, 256.22513, 154.896, 256.502], [622.717, 256.22513, 153.838, 256.502], [776.555, 256.22513,  53.189, 256.502], [829.744, 256.22513, 105.897, 256.502], [935.641, 256.22513, 154.896, 256.502]],
            arms: [[0, 0, 162.737, 36.873], [162.737, 0, 162.737, 36.873]]};
    }
    render() {
        if (!player.ground) {
            this.currentFrame = 3;
        }
        if (player.facing == "e") {
            canvas.drawImage(this.walking, this.frames.walking_e[this.currentFrame][0], this.frames.walking_e[this.currentFrame][1], this.frames.walking_e[this.currentFrame][2], this.frames.walking_e[this.currentFrame][3], -this.frames.walking_e[this.currentFrame][2]/2, -player.height/2, this.frames.walking_e[this.currentFrame][2], this.frames.walking_e[this.currentFrame][3]);
            canvas.strokeRect(-this.frames.walking_e[this.currentFrame][2]/2, -player.height/2, this.frames.walking_e[this.currentFrame][2], this.frames.walking_e[this.currentFrame][3]);
            canvas.drawImage(this.arms, this.frames.arms[1][0], this.frames.arms[1][1], this.frames.arms[1][2], this.frames.arms[1][3], 15 -this.frames.arms[1][2] + this.frames.walking_e[this.currentFrame][2]/15, -80 + this.frames.walking_e[this.currentFrame][2]/15, this.frames.arms[1][2], this.frames.arms[1][3]);
            player.guns[player.currentGun].position.setX( 10 - this.frames.walking_w[this.currentFrame][2]/15 );
        } else if (player.facing == "w") {
            canvas.drawImage(this.walking, this.frames.walking_w[this.currentFrame][0], this.frames.walking_w[this.currentFrame][1], this.frames.walking_w[this.currentFrame][2], this.frames.walking_w[this.currentFrame][3], -this.frames.walking_w[this.currentFrame][2]/2, -player.height/2, this.frames.walking_w[this.currentFrame][2], this.frames.walking_w[this.currentFrame][3]);
            canvas.strokeRect(-this.frames.walking_w[this.currentFrame][2]/2, -player.height/2, this.frames.walking_w[this.currentFrame][2], this.frames.walking_w[this.currentFrame][3]);
            canvas.drawImage(this.arms, this.frames.arms[0][0], this.frames.arms[0][1], this.frames.arms[0][2], this.frames.arms[0][3], -15 - this.frames.walking_w[this.currentFrame][2]/15 , -80 + this.frames.walking_w[this.currentFrame][2]/15, this.frames.arms[0][2], this.frames.arms[0][3]);
            player.guns[player.currentGun].position.setX( -2 - this.frames.walking_w[this.currentFrame][2]/15 );
        }
        player.guns[player.currentGun].position.setY(-70 + this.frames.walking_w[this.currentFrame][2]/15);
        if (player.ground == true && (keyMap.get("a") || keyMap.get("d"))) {
            this.frameCount -= 1;
            if (this.frameCount === 0) {
                this.frameCount = 8;
                this.currentFrame += 1;
                player.width = this.frames.walking_e[this.currentFrame][2];
                if (this.currentFrame == 8) {
                    this.currentFrame = 0;
                }
            }
        } else if (this.currentFrame != 4) {
            this.currentFrame = 4;
        }
    }
}