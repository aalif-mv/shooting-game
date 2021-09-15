var gameArea, joystick;

function startgame() {
  gameArea.start();
  crosshair(400, 200, 60);
  joystick = new joyStick();
  player = new player();
}

gameArea = {
  canvas : document.createElement("canvas"),
  start: function() {
    //this.canvas.width = 480;
    //this.canvas.height = 280;
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  stop: function() {
      clearInterval(this.interval);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function crosshair(x, y, r) {
  var ctx = gameArea.context;
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.fillStyle = "white";
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.fillStyle = "black";
  ctx.arc(x, y, r - 20, 0, Math.PI * 2)
  ctx.fill();
  
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.strokeStyle = "white";
  ctx.moveTo(x - (r + 10), y);
  ctx.lineTo(x + (r + 10), y);
  ctx.stroke();
  
  ctx.moveTo(x, y - (r + 10));
  ctx.lineTo(x, y + (r + 10));
  ctx.stroke();
}
function joyStick() {
  this.x = 150;
  this.y = 150;
  this.bodyPos = [150, 150];
  this.dragX = 0;
  this.dragY = 0;
  this.distance = 0;
  this.radius = 30;
  this.newPos = function() {
    //this.distance = hyp(this.x, this.y, x, y);
    var ctx = gameArea.context;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.arc(this.bodyPos[0], this.bodyPos[1], 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, this.radius, 0 ,Math.PI * 2);
    ctx.fill();
  }
  this.getPos = function() {
    return {x:this.x,
    y:this.y,
    dis:hyp(this.bodyPos[0], this.bodyPos[1], this.x, this.y),
    pos:this.bodyPos};
  }
  gameArea.canvas.addEventListener('touchmove', function(e) {
    if (joystick.distance <= 20 || joystick.distance < 100) {
      joystick.dragX = e.touches[0].clientX /* - gameArea.canvas.offsetTop*/ ;
      joystick.dragY = e.touches[0].clientY /* - gameArea.canvas.offsetLeft*/ ;
      if (hyp(joystick.dragX, joystick.dragY, 150, 150) <= 99 - joystick.radius) {
        joystick.x = joystick.dragX;
        joystick.y = joystick.dragY;
      } else {
        joystick.x = joystick.bodyPos[0] + crossmultiply(hyp(joystick.dragX, joystick.dragY, 150, 150), 100 - joystick.radius, joystick.dragX - 150);
        joystick.y = joystick.bodyPos[0] + crossmultiply(hyp(joystick.dragX, joystick.dragY, 150, 150), 100 - joystick.radius, joystick.dragY - 150);
      }
    }
  });
  gameArea.canvas.addEventListener('touchstart', function(e) {
    joystick.dragX = e.touches[0].clientX /* - gameArea.canvas.offsetTop*/ ;
    joystick.dragY = e.touches[0].clientY /* - gameArea.canvas.offsetLeft*/ ;
    joystick.distance = hyp(joystick.x, joystick.y, joystick.dragX, joystick.dragY);
  });
  gameArea.canvas.addEventListener('touchend', function(e) {
    joystick.x = 150;
    joystick.y = 150;
  });
}
function player() {
  this.controls = null;
  this.position = {x:0, y:0};
  this.velocity = {x:200, y:50};
  this.acceleration = {x:0, y:10};
  this.head = {x:0, y:0};
  this.leftArm = {x:0, y:0, rotation:0};
  this.rightArm = [0, 0];
  this.body = {x:0, y:0, width:20, height:60};
  this.leftLeg = {x:this.body.x + this.body.width, y:this.body.y + this.body.height, angle:45, dir:"r"};
  this.rightLeg = {x:50, y:50, angle:-45};
  this.newPos = function() {
    this.body.y += this.acceleration.y;
    this.controls = joystick.getPos();
    if (this.controls.x > this.controls.pos[0]) {
      this.body.x += (this.controls.dis / 5);
    }
    if (this.controls.x < this.controls.pos[0]) {
      this.body.x -= (this.controls.dis / 5);
    }
    if (this.controls.y < this.controls.pos[1]) {
      this.body.y -= (this.controls.dis / 5);
    }
    if (this.controls.y > this.controls.pos[1]) {
      this.body.y += (this.controls.dis / 5);
    }
    if (this.leftLeg.dir == "r") {
      if (this.leftLeg.angle <= -45) {
        this.leftLeg.dir = "l"
      }
      this.leftLeg.angle -= 2;
    } else {
      if (this.leftLeg.angle >= 45) {
        this.leftLeg.dir = "r"
      }
      this.leftLeg.angle += 2;
    }
    if (this.leftLeg.angle < 0) {
      this.rightLeg.angle = Math.abs(this.leftLeg.angle);
    } else {
      this.rightLeg.angle = -Math.abs(this.leftLeg.angle);
    }
    this.leftLeg.x = this.body.x + (this.body.width / 2);
    this.leftLeg.y = this.body.y + this.body.height;
    this.rightLeg.x = this.body.x + (this.body.width / 2);
    this.rightLeg.y = this.body.y + this.body.height;
    this.bottom();
    this.update();
  }
  this.animation = function() {
    
  }
  this.bottom = function() {
    if (this.body.y >= gameArea.canvas.height - this.body.height - 80) {
      this.body.y = gameArea.canvas.height - this.body.height - 80;
    }
  }
  this.update = function() {
    let ctx = gameArea.context;
    ctx.fillRect(this.body.x, this.body.y, this.body.width, this.body.height)
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.leftLeg.x, this.leftLeg.y);
    ctx.rotate(this.leftLeg.angle * Math.PI / 180);
    ctx.fillStyle = "blue";
    ctx.fillRect(0 - 10, 0, 20, 70);
    ctx.restore();
    
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.rightLeg.x, this.rightLeg.y);
    ctx.rotate(this.rightLeg.angle * Math.PI / 180);
    ctx.fillStyle = "green";
    ctx.fillRect(0 - 10, 0, 20, 70);
    ctx.restore();
  }
}
function gun(name) {
  this.name = name;
  this.pos = {x:200, y:200}
  this.angle = 0;
  this.damage = 2;
  this.bullet = {x:0, y:0, angle:0, speed:20};
}

function updateGameArea() {
  gameArea.clear();
  crosshair(400, 200, 60);
  joystick.newPos();
  player.newPos();
}

function asin(opp, hyp) {
  return Math.asin((opp) / (hyp)) * 180 / Math.PI;
}
function acos(adj, hyp) {
  return Math.acos((adj) / (hyp)) * 180 / Math.PI;
}
function atan(opp, adj) {
  return Math.atan((opp) / (adj)) * 180 / Math.PI;
}
function sin(opp, hyp) {
  return Math.sin((opp) / (hyp)) * 180 / Math.PI;
}
function cos(adj, hyp) {
  return Math.cos((adj) / (hyp)) * 180 / Math.PI;
}
function tan(opp, adj) {
  return Math.tan((opp) / (adj)) * 180 / Math.PI;
}

function hyp(x1, y1, x2, y2) {
  let adj, opp;
  opp = y1 - y2;
  adj = x1 - x2;
  return Math.sqrt(Math.pow(opp, 2) + Math.pow(adj, 2));
}
function opp(hyp, adj) {
  return Math.sqrt(Math.pow(hyp, 2) - Math.pow(adj, 2));
}
function adj(hyp, opp) {
  return Math.sqrt(Math.pow(hyp, 2) - Math.pow(opp, 2));
}
function crossmultiply(hypB, hypS, other) {
  return ((other * hypS) / hypB);
}
