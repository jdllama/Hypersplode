Psyche = function(pps) {
	this.active = true;
	this.w = 10;
	this.x = Math.floor(Math.random() * (GAME_WIDTH - this.w));
	this.y = this.w / 2;
	this.frameCount = 0;
	this.pps = pps;
	this.color = "green";
	this.value = 180;
	this.name = "PALMERSPLODE";
}

Psyche.prototype.update = function(delta) {
	if(this.active) {
		this.frameCount++;
		if(this.frameCount < 30) this.y += (delta * this.pps);
		else this.y -= (delta * this.pps) / 2;
		if(this.frameCount >= 50) this.frameCount = 0;
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

Psyche.prototype.draw = drawBall;