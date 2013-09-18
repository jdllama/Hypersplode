function setBonusGame() {
	engine.state = "bonus";
	engine.frameCount = 1;
	engine.update = bonusUpdate;
	engine.draw = bonusDraw;
	var addon = (engine.level / 3);
	var balls = 50 + (10 * (addon - 1));
	engine.fbs = (10/*seconds*/ * 1000/*frames*/) / balls;
	var currX = Math.floor(Math.random() * GAME_WIDTH);
	var targX = Math.floor(Math.random() * GAME_WIDTH);
	var move = Math.abs((targX - currX) / 4);
	var arr = [];
	for(var i = 0;i<balls;i++) {
		arr[arr.length] = new BonusBall(200 + (5 * addon), currX);
		if(currX < targX) {
			currX += move;
			if(currX >= targX) {
				targX = Math.floor(Math.random() * GAME_WIDTH);
				move = Math.abs((targX - currX) / 4);
			}
		}
		else if(currX > targX) {
			currX -= move;
			if(currX <= targX) {
				targX = Math.floor(Math.random() * GAME_WIDTH);
				move = Math.abs((targX - currX) / 4);
			}
		}
	}
	engine.ballsLeft = arr;
}

var bonusUpdate = function(delta) {
	if(this.ballsLeft.length > 0) {
		this.frameCount += delta * 1000;
		if(this.frameCount >= this.fbs) {
			this.balls.push(this.ballsLeft.shift());
			this.frameCount = 0;
		}
	}
	
	//handle keyboard input already, SHEESH
	if (37 in keys || 65 in keys) {	//left
		mouse -= (delta * GAME_WIDTH * 2);
	}
	else if (39 in keys || 68 in keys) {
		mouse += (delta * GAME_WIDTH * 2);
	}
	if(mouse < 0) mouse = 0;
	if((mouse + PADDLE_WIDTH) > GAME_WIDTH) mouse = GAME_WIDTH - PADDLE_WIDTH;
	paddles.update();
	if(this.balls.length <= 0 && this.ballsLeft.length <= 0) {
		setBonusInterim();
		return;
	}
	this.balls = this.balls.filter(function(myBall) {
		return myBall.active;
	});
	
	this.balls.forEach(function(myBall) {
		myBall.update(delta);
	});
}

var bonusDraw = function() {
	this.ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
	paddles.draw();
	this.balls.forEach(function(myBall) {
		myBall.draw(engine.ctx);
	});
	background.frameCount++;
	if(background.frameCount >= 5) {
		background.frameCount = 0;
		background.update();
		background.draw();
	}
}

BonusBall = function(pps, x) {
	this.active = true;
	this.w = 24;
	this.h = 16;
	this.x = x;
	this.y = this.w / 2;
	this.value = 200;
	this.pps = pps;
	this.color = "white";
	this.name = "SPLODE";
	this.frameCount = 0;
	this.activeFrame = splodeFrames[0];
}

BonusBall.prototype.update = function(delta) {
	if(this.active == true) {
		this.frameCount++;
		if(this.frameCount >= 64) this.frameCount = 0;
		this.activeFrame = splodeFrames[(this.frameCount / 8) | 0];
		this.y += (delta * this.pps);
		if(this.y >= GAME_HEIGHT) {
			this.active = false;
			setBonusInterim();
			return;
		}
		var val = paddles.collide(this);
		if(val) {
			this.active = false;
			engine.incrementScore(val);
		}
	}
}

BonusBall.prototype.draw = drawImage;