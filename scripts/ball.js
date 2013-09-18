Ball = function(pps) {
	this.active = true;
	this.w = 24;
	this.h = 16;
	this.x = Math.floor(Math.random() * (GAME_WIDTH - this.w));
	this.y = this.w / 2;
	this.value = 100;
	this.pps = pps;
	this.color = "white";
	this.frameCount = 0;
	this.name = "SPLODE";
	this.activeFrame = splodeFrames[0];
}

Ball.prototype.update = function(delta) {
	if(this.active == true) {
		this.frameCount++;
		if(this.frameCount >= 64) this.frameCount = 0;
		this.activeFrame = splodeFrames[(this.frameCount / 8) | 0];
		this.y += (delta * this.pps);
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

Ball.prototype.draw = drawImage;