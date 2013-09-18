Bomb = function(pps) {
	this.active = true;
	this.w = 10;
	this.x = Math.floor(Math.random() * (GAME_WIDTH - this.w));
	this.y = this.w / 2;
	this.pps = pps;
	this.color = "red";
	this.value = "AVOID";
	this.name = "DRAPERSPLODE";
}

Bomb.prototype.update = function(delta) {
	if(this.active == true) {
		this.y += (delta * this.pps);
		if(this.y >= GAME_HEIGHT) {
			this.active = false;
			return;
		}
		var val = paddles.collide(this);
		if(val) {
			this.active = false;
			engine.streak = 0;
			if(paddles.destroy()) {
				setGameOver();
			}
		}
	}
}

Bomb.prototype.draw = drawBall;