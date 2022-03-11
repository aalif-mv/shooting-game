class World {
    constructor() {
        this.scale = "1:1";
        this.worldCordinates = new Vector2();
        this.items = [new Squre(new Vector2(-800, 200), 1600, 20)];
    }
    render() {
        canvas.fill("green");
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].render();
        }
    }
}