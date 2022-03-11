class Squre {
    constructor(pos, width, height) {
        this.position = pos;
        this.width = width;
        this.height = height;
    }
    render() {
        canvas.fillRect(this.position.getX + world.worldCordinates.getX, this.position.getY + world.worldCordinates.getY, this.width, this.height);
    }
}