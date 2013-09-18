Sine = function(pps) {
	var maxHeight = 100;
	var minHeight = 30;
	var maxLength = 150;
	var minLength = 100;
	this.name = "HYPERSPLODE";
	this.active = true;
	//this.w = 10;
	this.h = 23;
	this.w = 23;
	this.x = Math.floor(Math.random() * (GAME_WIDTH - this.w));
	this.y = this.w / 2;
	this.waveHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
	this.waveLength = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength);
	if(this.x < this.waveHeight)  this.x = this.waveHeight;
	if(this.x > (GAME_WIDTH - this.waveHeight)) this.x = (GAME_WIDTH - this.waveHeight);
	this.origX = this.x;
	this.value = 200;
	this.pps = pps;
	//this.color = "blue";
	this.frameCount = 0;
	this.activeFrame = sineFrames[0];
}

Sine.prototype.update = function(delta) {
	if(this.active == true) {
		this.frameCount++;
		if(this.frameCount >= 64) this.frameCount = 0;
		this.activeFrame = sineFrames[(this.frameCount / 16) | 0];
		this.x = (this.origX + (Math.sin(( 2 * Math.PI * this.y ) / this.waveLength )) * this.waveHeight)
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

Sine.prototype.draw = drawImage;