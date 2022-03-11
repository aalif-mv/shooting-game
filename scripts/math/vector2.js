class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	add(v) {
		this.x += v.x;
		this.y += v.y;
	}
	addScalar(s) {
		this.x += s;
		this.y += s;
	}
    minus(v) {
		this.x -= v.x;
		this.y -= v.y;
	}
	minusScalar(s) {
		this.x -= s;
		this.y -= s;
	}
	equals(v) {
		if (v.x === this.x && v.y === this.y) {
			return true;
		} else {
			return false;
		}
	}
	lenght() {
		return Math.sqrt(Math.pow((this.x), 2) + Math.pow((this.y), 2));
	}
	manhattanLength() {
		return this.x + this.y;
	}
	lenghtSq() {
		return Math.pow(this.lenght(), 2);
	}
	distanceTo(v) {
		return Math.sqrt(Math.pow((this.x) - v.x, 2) + Math.pow((this.y - v.y), 2));
	}
	manhattanDistanceTo(v) {
		return (this.x - v.x) + (this.y - v.y);
	}
	distanceToSquared() {
		return Math.pow(this.distanceTo(), 2);
	}
	clone() {
		return new Vector2(this.x, this.y);
	}
	copy(v) {
		this.x = v.x;
		this.y = v.y;
	}
	floor() {
		Math.floor(this.x);
		Math.floor(this.y);
	}
	random() {
		return Math.random();
	}
    setX(x) {
		this.x = x;
	}
	setY(y) {
		this.y = y;
	}
    get getX() {
        return this.x;
    }
    get getY() {
        return this.y;
    }
}