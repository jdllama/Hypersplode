Engine = function() {
	this.balls = [];
	this.ballsLeft = [];
	this.powerUp = [];
	this.frameCount = 1;
	this.level = 0;
	this.state = "title";
	this.ctx = fgCTX;
	this.delta = 0;
	this.streak = 0;
	this.fbs = 0;
	this.currScore = 0;
	this.topScore = 0;
	//if(this.topScore == null || this.topScore == "") this.topScore = 0;
	this.nextExtra = 10000;
	this.update = titleUpdate;
	this.draw = titleDraw;
	this.scoreboard = Scoreboard;
}

Engine.prototype.startLevel = function() {
	this.balls = [];
	this.powerUp = [];
	//paddles.retract();
	this.ballsLeft = returnShots(this.level-1);
	this.fbs = returnFPS(this.level - 1)
	this.frameCount = 1;
}

Engine.prototype.newGame = function() {
	this.level = 0;
	this.currScore = 0;
	this.powerUp = [];
	paddles.reset();
	this.startLevel();
}

Engine.prototype.incrementScore = function (val) {
	this.currScore += val;
	if(this.currScore >= this.topScore) this.topScore = this.currScore;
	if(this.currScore >= this.nextExtra) {
		this.nextExtra += 20000;
		paddles.restorePaddle();
	}
}

Engine.prototype.streakHandle = function() {
	this.streak++;
	if(this.streak % 3 == 0) {
		this.powerUp.push(new PowerUp());
	}
}