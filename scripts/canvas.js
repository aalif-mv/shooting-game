class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.events = {};
        this.mid = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        this.start = {
            x: -(this.canvas.width / 2),
            y: -(this.canvas.height / 2)
        };
        this.end = {
            x: (this.canvas.width / 2),
            y: (this.canvas.height / 2)
        };
        document.body.appendChild(this.canvas);
        this.moveTo(this.start.x, 0);
        this.lineTo(this.end.x, 0);
        this.moveTo(0, this.start.y);
        this.lineTo(0, this.end.y);
        this.stroke();
    }
    resize(width, height) {
        this.clear();
        this.canvas.width = width || document.documentElement.clientWidth;
        this.canvas.height = height || document.documentElement.clientHeight;
        this.mid = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        this.start = {
            x: -(this.canvas.width / 2),
            y: -(this.canvas.height / 2)
        };
        this.end = {
            x: (this.canvas.width / 2),
            y: (this.canvas.height / 2)
        };
        this.moveTo(this.start.x, 0);
        this.lineTo(this.end.x, 0);
        this.moveTo(0, this.start.y);
        this.lineTo(0, this.end.y);
        this.stroke();
    }
    debug() {
        this.moveTo(this.start.x, 0);
        this.lineTo(this.end.x, 0);
        this.moveTo(0, this.start.y);
        this.lineTo(0, this.end.y);
        this.stroke();
    }
    clear() {
        this.ctx.clearRect(this.mid.x + this.start.x ,this.mid.y + this.start.y, this.canvas.width, this.canvas.height)
    }
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx + canvas.mid.x, dy + canvas.mid.y, dWidth, dHeight);
    }
    fillRect(x, y, width, height) {
        this.ctx.fillRect(x + this.mid.x, y + this.mid.y, width, height);
    }
    strokeRect(x, y, width, height) {
        this.ctx.strokeRect(x + this.mid.x, y + this.mid.y, width, height);
    }
    rect(x, y, width, height) {
        this.ctx.rect(x + this.mid.x, y + this.mid.y, width, height);
    }
    arc(x, y, radius, startAngle = 0, endAngle = Math.PI * 2, counterclockwise = false) {
        this.ctx.arc(x + this.mid.x, y + this.mid.y, radius, startAngle, endAngle, counterclockwise);
    }
    moveTo(x, y) {
        this.ctx.moveTo(x + this.mid.x, y + this.mid.y);
    }
    lineTo(x, y) {
        this.ctx.lineTo(x + this.mid.x, y + this.mid.y);
    }
    stroke() {
        this.ctx.stroke();
    }
    fill(color) {
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    beginPath() {
        this.ctx.beginPath();
    }
    closePath() {
        this.ctx.closePath();
    }
    setLineDash(ld) {
        this.ctx.setLineDash(ld);
    }
    fillStyle(color) {
        this.ctx.fillStyle = color;
    }
    /** 
     * 
     * events
     * 
     * 
    **/
    addEvent(event, _function) {
        this.events[event] = this.canvas.addEventListener(event, _function);
    }
    addEvents(events, _functions) {
        for (let i = 0; i < events.length; i++) {
            this.events[events[i]] = this.canvas.addEventListener(events[i], _functions[i]);
        }
    }
}