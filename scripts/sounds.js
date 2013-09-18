/*soundManager.setup({
	url: 'swf/',
	//debugFlash: true,
	onready: function() {
		soundManager.createSound({
			id: "InsertCoin",
			url: 'sounds/InsertCoin5.wav'
			//url: 'sounds/InsertCoin2.wav'
			//url: 'sounds/InsertCoin.mp3'
		});
		soundManager.createSound({
			id: "letter",
			url: 'sounds/letter2.wav'
			//url: 'sounds/letter.wav'
		});
	}
});
*/
var paddleDestroySound = "3,,0.3461,0.5494,0.3393,0.0146,,0.2273,,,,,,,,0.624,-0.1203,-0.2516,1,,,,,0.5";
var paddleDestroyURL = synth.getWave(paddleDestroySound);
var paddleDestroyPlayer = new Audio();
paddleDestroyPlayer.addEventListener('error', function(e) {
	console.log("Error: " + player.error.code);
}, false);
paddleDestroyPlayer.src = paddleDestroyURL;
paddleDestroyPlayer.addEventListener('ended', function(e) {
	url.revokeObjectURL(paddleDestroyURL);
}, false);


var extendSound = "0,0.084,0.0183,0.4117,0.5398,0.0861,,0.2274,-0.0174,0.1701,,-0.6155,-0.2028,-0.8386,-0.3794,,0.0035,,0.9753,0.6255,,0.1347,,0.5";
var extendURL = synth.getWave(extendSound);
var extendPlayer = new Audio();
extendPlayer.addEventListener('error', function(e) {
	console.log("Error: " + player.error.code);
}, false);
extendPlayer.src = extendURL;
extendPlayer.addEventListener('ended', function(e) {
	url.revokeObjectURL(extendURL);
}, false);

function playSound(player) {
	try {
		player.play();
	} catch(e) {
		console.log(e.message);
	}
}