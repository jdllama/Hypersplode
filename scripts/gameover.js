function setGameOver() {
	engine.state = "gameover";
	//setCookie("hypersplode", engine.topScore, 365 * 7);
	if(engine.currScore >= engine.topScore) setScore();
	engine.frameCount = 1;
	engine.update = gameoverUpdate;
	engine.draw = gameoverDraw;
}

var gameoverUpdate = function(delta) {
	this.frameCount += (delta * 1000)
	if(this.frameCount >= 5000) {
		setTitle();
	}
}

var gameoverDraw = function() {
	this.ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
	background.frameCount++;
	if(background.frameCount >= 5) {
		background.frameCount = 0;
		background.blank();
	}
	this.ctx.fillStyle = "white";
	var myTitle = "GAME OVER";
	var mySubTitle = "YOU SHOULD TRY AGAIN!";
	this.ctx.font = "25px KarmaArcade";
	var len = this.ctx.measureText(myTitle).width;
	var len2 = this.ctx.measureText(mySubTitle).width;
	this.ctx.fillText(myTitle, GAME_WIDTH/2 - (len / 2), GAME_HEIGHT/2-4);
	this.ctx.fillText(mySubTitle, GAME_WIDTH/2 - (len2 / 2), GAME_HEIGHT/2+30);
}