function setInterim() {
	engine.state = "interim";
	engine.frameCount = 1;
	engine.update = interimUpdate;
	engine.draw = interimDraw;
}


var interimUpdate = function() {
	this.frameCount++;
	if(this.frameCount >= 300) {
		if(this.level % 3 == 0 && this.level != 0) {
			setBonusGame();
		}
		else {
			this.level++;
			setGame();
		}
	}
}

var interimDraw = function() {
	this.ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
	this.ctx.fillStyle = "white";
	this.ctx.font = "30px KarmaArcade";
	var myTitle = "";
	if(this.level % 3 == 0 && this.level != 0) myTitle = "BONUS ROUND GOING"
	else myTitle = returnMessage(this.level);
	var len = this.ctx.measureText(myTitle).width;
	this.ctx.fillText(myTitle, GAME_WIDTH/2 - (len / 2), GAME_HEIGHT/2-4);
	
	background.frameCount++;
	if(background.frameCount >= 5) {
		background.frameCount = 0;
		background.blank();
	}
}

function setBonusInterim() {
	engine.state = "interim";
	engine.frameCount = 1;
	engine.update = interimBonusUpdate;
	engine.draw = interimBonusDraw;
}


var interimBonusUpdate = function() {
	this.frameCount++;
	if(this.frameCount >= 300) {
		this.level++;
		setGame();
	}
}

var interimBonusDraw = function() {
	this.ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
	this.ctx.fillStyle = "white";
	this.ctx.font = "30px KarmaArcade";
	var myTitle = returnMessage(this.level);
	var len = this.ctx.measureText(myTitle).width;
	this.ctx.fillText(myTitle, GAME_WIDTH/2 - (len / 2), GAME_HEIGHT/2-4);
	
	background.frameCount++;
	if(background.frameCount >= 5) {
		background.frameCount = 0;
		background.blank();
	}
}