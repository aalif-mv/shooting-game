const keyMap = new Map();
const mouse = {
    x: 0,
    y: 0
};

var init = function() {
    canvas.resize();
    engine.start();
}
var update = function() {
    player.update();
    camera.calculate();
}
var render = function() {
    canvas.clear();
    world.render();
    player.render();
    ui.render();
    canvas.debug();
}

const canvas = new Canvas();
const engine = new Engine(1000/30, update, render);
const player = new Player();
const animation = new Animation();
const world = new World();
const camera = new Camera();
const ui = new Ui();

window.addEventListener('keydown', function(e) {
    keyMap.set(e.key, e.type === "keydown");
});
window.addEventListener('keyup', function(e) {
    keyMap.set(e.key, !(e.type === "keyup"));
});
window.addEventListener('mousemove', function(e) {
    mouse.x = -canvas.mid.x + (e.clientX - canvas.canvas.offsetLeft);
    mouse.y = -canvas.mid.y + (e.clientY - canvas.canvas.offsetTop);
});
window.addEventListener('click', function(e) {
    // player.shootGun(e.clientX, e.clientY);
});

init();