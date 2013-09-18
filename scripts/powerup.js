PowerUp = function() {
	this.active = true;
	this.w = 30;
	this.x = Math.floor(Math.random() * (GAME_WIDTH - this.w));
	this.y = this.w / 2;
	var temp = null;
	var level = engine.level - 1;
	if(typeof l[level] == "undefined") {
		temp = l[l.length-1];
	}
	else temp = l[level];
	this.pps = temp.pps * 1.25;	//200;
	this.value = true;
	this.activeFrame = null;
	this.frameCount = 0;
	this.frames = [];
	this.framesIndex = 0;
	this.choose();
}

PowerUp.prototype.update = function(delta) {
	if(this.active == true) {
		this.frameCount++;
		if(this.frameCount >= (60 / this.frames.length)) {
			this.frameCount = 0;
			this.framesIndex++;
			if(this.framesIndex >= this.frames.length) this.framesIndex = 0;
		}
		this.activeFrame = this.frames[this.framesIndex];
		this.y += (delta * this.pps);
		if(this.y >= GAME_HEIGHT) {
			this.active = false;
			return;
		}
		var val = paddles.collide(this);
		if(val) {
			this.active = false;
			if(this.type == "extend") {
				paddles.extend();
				playSound(extendPlayer);
				//playExtend();
				//playSound(extendSound);
				return;
			}
			else if(this.type == "bonus") {
				engine.incrementScore(100 * engine.level);
			}
			else if(this.type == "slow") {
				engine.balls.forEach(function(myBall) {
					myBall.pps /= 2;
				});
				engine.ballsLeft.forEach(function(myBall) {
					myBall.pps /= 2;
				});
				return;
			}
			else if(this.type == "clear") {
				engine.balls.forEach(function(myBall) {
					myBall.active = false;
					var score = myBall.value;
					score /= 10;
					score /= 2;
					score = Math.ceil(score);
					score *= 10;
					engine.incrementScore(score);
				});
				engine.ballsLeft.forEach(function(myBall) {
					myBall.active = false;
					var score = myBall.value;
					score /= 10;
					score /= 2;
					score = Math.ceil(score);
					score *= 10;
					engine.incrementScore(score);
				});
				engine.ballsLeft = [];
			}
			else {
				paddles.restorePaddle();
			}
		}
	}
}

PowerUp.prototype.draw = drawImage;

PowerUp.prototype.choose = function() {
	var score = engine.currScore;
	
	var pick = Math.floor(((score / 100) + (score / 1000)) % 10);
	if(pick <= 9) {
		this.type = "extend";
		this.w = 58;
		this.h = 10;
		this.frames = extendFrames;
	}
	else if(pick < 4) {
		this.type = "extra";
		this.w = 40;
		this.h = 34;
		this.frames = extraLifeFrames;
	}
	else if(pick <= 9) {
		this.type = "bonus";
		this.w = 36;
		this.h = 44;
		this.frames = bonusFrames;
	}
	else {
		console.log(pick);
	}/*
	else if(pick < 0) {
		this.type = "bonus";
		this.color = "orange";
	}
	else if(pick < 0) {
		this.type = "slow";
		this.color = "orange";
	}
	else if(pick < 0) {
		this.type = "clear";
		this.color = "orange";
	}
	else {
		this.type = "extra";
		this.w = 40;
		this.h = 34;
		this.frames = extraLifeFrames;
		//this.color = "orange";
	}*/
}