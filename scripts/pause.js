function setPause() {
	engine.state = "pause";
	engine.frameCount = 1;
	engine.update = pauseUpdate;
	engine.draw = pauseDraw;
}

function setPauseBonus() {
	engine.state = "pausebonus";
	engine.frameCount = 1;
	engine.update = pauseUpdate;
	engine.draw = pauseDraw;
}

function unPause() {
	engine.state = "game";
	engine.frameCount = 1;
	engine.update = mainGameUpdate;
	engine.draw = mainGameDraw;
}

var pauseUpdate = function() {
}

var pauseDraw = function() {
	this.ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
	this.ctx.fillStyle = "white";
	this.ctx.font = "30px KarmaArcade";
	this.ctx.fillText("PAUSE SCREEN!", GAME_WIDTH/2-100, GAME_HEIGHT/2-4);
	background.frameCount++;
	if(background.frameCount >= 5) {
		background.frameCount = 0;
		background.blank();
	}
}