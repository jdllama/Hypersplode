Avoid = function(pps) {
	this.active = true;
	this.w = 10;
	this.x = Math.floor(Math.random() * (GAME_WIDTH - this.w));
	this.y = this.w / 2;
	this.value = 160;
	this.name = "STUDERSPLODE";
	this.pps = pps;
	this.color = "gray";
}

Avoid.prototype.update = function(delta) {
	if(this.active == true) {
		this.y += (delta * this.pps);
		if(mouse < this.x) this.x++;
		else this.x--;
		if(this.x >= GAME_WIDTH) this.x = GAME_WIDTH;
		if(this.x <= 0) this.x = 0;
		if(this.y >= GAME_HEIGHT) {
			this.active = false;
			engine.streak = 0;
			if(paddles.destroy()) {
				setGameOver();
			}
			return;
		}
		var val = paddles.collide(this);
		if(val) {
			this.active = false;
			engine.streakHandle();
			engine.incrementScore(val);
		}
	}
}

Avoid.prototype.draw = drawBall;