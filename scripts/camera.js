class Camera {
    constructor() {
        this.cameraBoundary = {x: 0, y: 0, width: 0, height: 0};
    }
    calculate() {
        world.worldCordinates.copy(new Vector2(-player.body.x, -player.body.y));
    }
}