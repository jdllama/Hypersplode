function startGame() {
	document.getElementById("story").innerHTML = document.getElementById("story").innerText = "";
	engine.state = "game";
	//soundManager.play("InsertCoin");
	engine.frameCount = 1;
	engine.newGame();
	engine.startLevel();
	engine.update = mainGameUpdate;
	engine.draw = mainGameDraw;
}

function setGame() {
	document.getElementById("story").innerHTML = document.getElementById("story").innerText = "";
	engine.state = "game";
	engine.frameCount = 1;
	engine.startLevel();
	engine.update = mainGameUpdate;
	engine.draw = mainGameDraw;
}

var mainGameUpdate = function(delta) {
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
	if(this.balls.length <= 0 && this.ballsLeft.length <= 0 && this.powerUp.length <= 0) {
		setInterim();
		return;
	}
	this.balls = this.balls.filter(function(myBall) {
		return myBall.active;
	});
	
	this.balls.forEach(function(myBall) {
		myBall.update(delta);
	});
	
	this.powerUp = this.powerUp.filter(function(powerup) {
		return powerup.active;
	});
	
	this.powerUp.forEach(function(powerup) {
		powerup.update(delta);
	});
}

var mainGameDraw = function() {
	this.ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
	paddles.draw();
	this.balls.forEach(function(myBall) {
		myBall.draw(engine.ctx);
	});
	this.powerUp.forEach(function(powerup) {
		powerup.draw(engine.ctx);
	});
	background.frameCount++;
	if(background.frameCount >= 5) {
		background.frameCount = 0;
		background.update();
		background.draw();
	}
}

function returnShots(level) {
	var arr = [];
	if(level < 0) return arr;
	if(level >= 256) {
		for(var i = 0;i<1000;i++) {
			arr[i] = new Ball(300);
		}
	}
	else {
		var temp = null;
		if(typeof l[level] == "undefined") {
			temp = l[l.length-1];
		}
		else temp = l[level];
		var arr2 = [];
		for(var i in temp.balance) {
			var wha = temp.balance[i];
			for(var j = 0;j<wha;j++) {
				arr2[arr2.length] = i;
			}
		}
		for(var i = 0;i<temp.shots;i++) {
			var rnd = Math.floor(Math.random() * arr2.length);
			arr[arr.length] = new window[arr2[rnd]](temp.pps);
		}
	}
	return arr;
}

function returnMessage(level) {
	var s = "";
	if(level >= 255) {
		s = "KILL SCREEN ARRIVED";
	}
	else {
		if(typeof l[level] == "undefined") s = l[l.length-1].message;
		else s = l[level].message;
	}
	return s;
}

function returnFPS(level) {
	var s = 0;
	if(level >= 255) {
		s = 5
	}
	else {
		if(typeof l[level] == "undefined") s = l[l.length-1].fbs;
		else s = l[level].fbs;
	}
	return s;
}