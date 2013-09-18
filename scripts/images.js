var paddleShort = new Image();
paddleShort.src = "images/paddle1.png";

var paddleLong = new Image();
paddleLong.src = "images/paddle2.png";

var splodeFrames = [];
var splodeNames = "splode1|splode2|splode3|splode4|splode5|splode6|splode7|splode8".split("|");
for(var i = 0;i<splodeNames.length;i++) {
	var img = new Image();
	img.src = "images/" + splodeNames[i] + ".png";
	splodeFrames.push(img);
}

var reflect1 = new Image();
var reflect2 = new Image();
reflect1.src = "images/reflect1.png";
reflect2.src = "images/reflect2.png";

var sineFrames = [];
var sineNames = "sine1|sine2|sine3|sine4".split("|");
for(var i = 0;i<sineNames.length;i++) {
	var img = new Image();
	img.src = "images/" + sineNames[i] + ".png";
	sineFrames.push(img);
}

var extraLifeFrames = [];
var extraLife = new Image();
extraLife.src = "images/extraLife.png";
extraLifeFrames.push(extraLife);

var extendFrames = [];
var extend1 = new Image();
var extend2 = new Image();

extend1.src = "images/extend1.png";
extend2.src = "images/extend2.png";

extendFrames.push(extend1);
extendFrames.push(extend2);

var bonusFrames = [];
var bonusNames = "bonus1|bonus2|bonus3|bonus4".split("|");
for(var i = 0;i<bonusNames.length;i++) {
	var img = new Image();
	img.src = "images/" + bonusNames[i] + ".png";
	bonusFrames.push(img);
}

for(var i = bonusNames.length - 1;i>=0;i--) {
	var img = new Image();
	img.src = "images/" + bonusNames[i] + ".png";
	bonusFrames.push(img);
}