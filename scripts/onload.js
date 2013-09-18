function init() {
	bgCanvas = document.getElementById("bg");
	if(!bgCanvas.getContext) return;
	bgCTX = bgCanvas.getContext("2d");
	fgCanvas = document.getElementById("fg");
	fgCTX = fgCanvas.getContext("2d");
	
	document.getElementById("gamearea").style.marginTop = -document.getElementById("gamearea").offsetHeight / 2 + "px";
	document.getElementById("gamearea").style.marginLeft = -document.getElementById("gamearea").offsetWidth / 2 + "px";
	addEventListener("keydown", function(e) {
		keys[e.keyCode] = true;
		switch(e.keyCode){
			case 37: case 39: case 38:  case 40: // Arrow keys
			case 32: e.preventDefault(); break; // Space
		}
	}, false);
	addEventListener("keyup", function(e) {
		delete keys[e.keyCode];
		//32 = space
		//13 = Enter
		if(e.keyCode == 32 || e.keyCode == 13) eventHandle();
		switch(e.keyCode){
			case 37: case 39: case 38:  case 40: // Arrow keys
			case 32: e.preventDefault(); break; // Space
		}
	}, false);
	engine = new Engine();
	background = new Background();
	paddles = new Paddles();
	//engine.newGame();
	
	then = Date.now();
	main();
	fgCanvas.addEventListener("click", eventHandle, true);
	addEventListener("mousemove", trackPos, true);
	addEventListener("blur", function() {
		if(engine.state != "game" && engine.state != "bonus") {}
		else {
			eventHandle();
		}
	}, true);
	var fpsOut = document.getElementById('fps');
	setInterval(function(){
	  fpsOut.value = (1000/frameTime).toFixed(2) + " fps";
	},1000);

	FB.getLoginStatus(function(response) {
		/*FB.api("/" + appId + "/scores", function(response2) {
			console.log(response2);
		});*/
		updateScoreboard();
		FB.api("/me/scores", function(response2) {
			console.log("Player current top score " + response2.data[0].score);
			engine.topScore = response2.data[0].score || 0;
			engine.scoreboard();
		});
	}, true);
	//setTimeout(showBads, 100);
}

window.onload = function() {
	init();
}