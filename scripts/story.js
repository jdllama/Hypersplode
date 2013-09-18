function setStory() {
	engine.state = "demo";
	engine.frameCount = 1;
	engine.update = storyUpdate;
	engine.draw = storyDraw;
}

var storyUpdate = function(delta) {
	this.frameCount++;
	var len = story.length;
	if(this.frameCount >= (len * 8) + 300) {
		document.getElementById("story").innerText = "";
		setTitle();
	}
}

var storyDraw = function() {
	this.ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
	
	if(this.frameCount % 8 == 0) {
		//if(story[this.frameCount / 8] && story[this.frameCount / 8] != " ") soundManager.play("letter");
		document.getElementById("story").innerHTML += story[this.frameCount / 8] || "";
	}

	background.frameCount++;
	if(background.frameCount >= 5) {
		background.frameCount = 0;
		background.blank();
	}
}