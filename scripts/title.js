function setTitle() {
	document.getElementById("story").innerHTML = "";
	document.getElementById("story").innerText = "";
	engine.state = "title";
	engine.frameCount = 1;
	engine.update = titleUpdate;
	engine.draw = titleDraw;
}

var titleUpdate = function(delta) {
	this.frameCount++;
	if(this.frameCount > 300) {
		setStory();
	}
}

var titleDraw = function() {
	this.ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
	var myTitle = "HYPERSPLODE!";
	var mySubTitle = "INSERT COIN TO GAME!";
	var myTitleFontSize = 50;
	var mySubTitleFontSize = 30;
	if(this.frameCount % 5 == 0) this.ctx.fillStyle = "red";
	else if(this.frameCount % 11 == 0) this.ctx.fillStyle = "blue";
	else this.ctx.fillStyle = "gold";
	
	this.ctx.font = myTitleFontSize + "px Ethnocentric";
	var len = this.ctx.measureText(myTitle).width;
	this.ctx.fillText(myTitle, GAME_WIDTH/2 - (len / 2), GAME_HEIGHT/2 - (myTitleFontSize / 2));
	this.ctx.fillStyle = "white";
	this.ctx.font = mySubTitleFontSize + "px KarmaArcade";
	len = this.ctx.measureText(mySubTitle).width;
	var show = Math.floor(this.frameCount / 60);
	if(show == 0 || show == 2 || show == 4) this.ctx.fillText(mySubTitle, GAME_WIDTH/2 - (len / 2), GAME_HEIGHT/2+50);
	
	background.frameCount++;
	if(background.frameCount >= 5) {
		background.frameCount = 0;
		background.blank();
	}
}