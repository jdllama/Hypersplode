// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

var drawRect = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.w, this.h);
}

var drawBall = function(myCtx) {
	myCtx.beginPath();
	myCtx.fillStyle = this.color;
	myCtx.arc(this.x, this.y, this.w, 0, Math.PI * 2, false);
	myCtx.fill();
}

var drawImage = function(myCtx) {
	if(this.active == true) {
		myCtx.drawImage(this.activeFrame, this.x, this.y, this.w, this.h);
		//ctx.save();
		//ctx.translate(this.x, this.y);
		//ctx.rotate(45 * (Math.PI / 180));
		//ctx.drawImage(this.activeFrame, -20, -10, this.w, this.h);
		//ctx.restore();
	}
}