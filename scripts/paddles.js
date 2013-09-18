Paddles = function() {
	this.paddles = [];
	var len = 3;
	for(var i = 0;i<len;i++) {
		this.paddles[i] = {
			active: true,
			w: PADDLE_WIDTH,
			h: PADDLE_HEIGHT,
			x: 0,
			y: GAME_HEIGHT - (PADDLE_HEIGHT * (len - i)) - (PADDLE_HEIGHT * (len - i)),
			color: "white",
			activeFrame: paddleShort,
			multiplier: i + 1
		}
	}
}

Paddles.prototype.extend = function() {
	this.paddles.forEach(function(myPaddle) {
		myPaddle.w = PADDLE_WIDTH * 2;
		myPaddle.activeFrame = paddleLong;
	});
}

Paddles.prototype.retract = function() {
	this.paddles.forEach(function(myPaddle) {
		myPaddle.w = PADDLE_WIDTH;
		myPaddle.activeFrame = paddleShort;
	});
}

Paddles.prototype.collide = function(shot) {
	//Collision function care of http://cakeandturtles.comoj.com/goblin.php
	for(var i in this.paddles) {
		if(this.paddles[i].active
				&& (shot.x <= (this.paddles[i].x + this.paddles[i].w))
				&& (this.paddles[i].x <= (shot.x + shot.w))
				&& (shot.y <= (this.paddles[i].y + this.paddles[i].h))
				&& (this.paddles[i].y <= (shot.y + shot.w))) {
					//console.log(shot.value);
					if(typeof shot.value == "string") return 1;
					else return shot.value * this.paddles[i].multiplier;
		}
	}
	return false;
}

Paddles.prototype.reset = function() {
	this.paddles.forEach(function(paddle) {
		paddle.active = true;
	});
}

Paddles.prototype.destroy = function() {	
	for(var i = 0;i<this.paddles.length;i++) {
		if(this.paddles[i].active == true) {
			this.paddles[i].active = false;
			this.retract();
			playSound(paddleDestroyPlayer);
			if(i < this.paddles.length - 1) return false;
		}
	}
	this.retract();
	return true;
}

Paddles.prototype.update = function() {
	this.paddles.forEach(function(paddle) {
		paddle.x = mouse;
	});
}

Paddles.prototype.draw = function() {
	this.paddles.forEach(function(paddle) {
		if(paddle.active == true) {
			engine.ctx.drawImage(paddle.activeFrame, paddle.x, paddle.y, paddle.w, paddle.h);
		}
	});
}

Paddles.prototype.restorePaddle = function() {
	for(var i = this.paddles.length-1;i>=0;i--) {
		//alert(i + " " + this.paddles[i].active);
		if(this.paddles[i].active == false) {
			//alert("Made it");
			this.paddles[i].active = true;
			return;
		}
	}
	engine.incrementScore(2000);
}