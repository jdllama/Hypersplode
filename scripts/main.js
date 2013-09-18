function main() {
	requestAnimFrame(main);
	
	var now = Date.now();
	var delta = now - then;
	
	engine.update(delta / 1000);
	engine.draw();
	engine.scoreboard();
	
	then = Date.now();
	
	var thisFrameTime = (thisLoop=new Date) - lastLoop;
	frameTime+= (thisFrameTime - frameTime) / filterStrength;
	lastLoop = thisLoop;
}