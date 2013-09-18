Background = function() {
	this.stars = [];
	this.frameCount = 0;
	for(var i = 0;i<50;i++) {
		var colors = ["red", "blue", "green", "gold", "white"];
		var rnd = Math.floor(Math.random() * colors.length);
		this.stars[i] = {
			active: true,
			x: Math.floor(Math.random() * GAME_WIDTH),
			y: Math.floor(Math.random() * GAME_HEIGHT),
			color: colors[rnd],
			frameCount: Math.floor(Math.random() * (45 - 25 + 1) + 25)
		}
	}
	this.ctx = bgCTX;
	this.update = function() {	
		this.stars.forEach(function(myStar) {
			myStar.frameCount++;
			if(myStar.frameCount > 50)  myStar.active = false;
			if(myStar.frameCount > 55) {
				myStar.active = true;
				myStar.x = Math.floor(Math.random() * GAME_WIDTH);
				myStar.y = Math.floor(Math.random() * GAME_HEIGHT);
				myStar.frameCount = Math.floor(Math.random() * 40);
			}
		});
	}
	this.draw = function() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
		this.stars.forEach(function(myStar) {
			if(myStar.active == true) {
				background.ctx.fillStyle = myStar.color;
				background.ctx.fillRect(myStar.x, myStar.y, 2, 2);
			}
		});
	}
	this.blank = function() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	}
}