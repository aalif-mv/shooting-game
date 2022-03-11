class Ui {
    constructor() {
        this.uiItems = { health: {x: -400 , y: -300, width: 200, height: 20, innerWidth: 200},
            fuel: {x: 200, y: -300, width: 200, height: 20, innerWidth: 200}
        }
    }
    render() {
        for (const item in this.uiItems) {
            canvas.fillStyle("gray");
            canvas.fillRect(this.uiItems[item].x, this.uiItems[item].y, this.uiItems[item].width, this.uiItems[item].height);
            canvas.fillStyle("red");
            canvas.fillRect(this.uiItems[item].x + 2, this.uiItems[item].y + 2, this.uiItems[item].innerWidth - 4, this.uiItems[item].height - 4);
        }
    }
}