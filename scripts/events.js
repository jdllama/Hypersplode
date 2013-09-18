function trackPos(e) {
	var offset = 0;
	var obj = fgCanvas;
	do {
		offset += parseInt(obj.offsetLeft);
	}while(obj = obj.offsetParent);
	
	mouse = e.clientX - offset - (PADDLE_WIDTH / 2);
	
	if(mouse < 0) mouse = 0;
	if((mouse + PADDLE_WIDTH) > GAME_WIDTH) mouse = GAME_WIDTH - PADDLE_WIDTH;
}

function eventHandle() {
	var state = engine.state;
	if(state == "title") {startGame();setInterim();}
	else if(state == "game") setPause();
	else if(state == "pause") unPause();
	else if(state == "demo") setTitle();
	else if(state == "gameover") setTitle();
	else if(state == "bonus") setPauseBonus();
	else if(state == "pausebonus") setBonusGame();
}