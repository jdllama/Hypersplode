Reflect = function(pps) {
	this.active = true;
	this.w = 24;
	this.h = 18;
	this.x = Math.floor(Math.random() * (GAME_WIDTH - this.w));
	this.y = this.w / 2;
	this.angle = Math.floor(Math.random() * (85 - 45 + 1) + 45);
	var boost = 0;
	boost = 100 - this.angle;
	this.lORr = "";
	var temp = Math.floor(Math.random() * 2);
	if(temp == 1) this.lORr = "r";
	else this.lORr = "l";
	this.pps = pps + boost;
	this.color = "orange";
	this.value = 150;
	this.name = "SPADASPLODE";
	this.activeFrame = reflect1;
	this.frameCount = 0;
}

Reflect.prototype.update = function(delta) {
	if(this.active) {
		this.frameCount++;
		if(this.frameCount >= 30) this.frameCount = 0;
		if(this.frameCount < 15) this.activeFrame = reflect1;
		else this.activeFrame = reflect2;
		//this.activeFrame = splodeFrames[(this.frameCount / 8) | 0];
		if(this.lORr == "r") this.x += Math.cos(this.angle*Math.PI/180) * (delta * this.pps);
		else this.x -= Math.cos(this.angle*Math.PI/180) * (delta * this.pps);
		if(this.x <= this.w && this.lORr == "l") {
			this.lORr = "r";
		}
		if(this.x >= GAME_WIDTH - this.w && this.lORr == "r") {
			this.lORr = "l";
		}
		this.y += Math.sin(this.angle*Math.PI/180) * (delta * this.pps);

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

Reflect.prototype.draw = drawImage;