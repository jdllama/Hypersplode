Scoreboard = function() {
	var temp = this.topScore + "";
	if(temp.length > 6) temp = temp.substr(temp.length - 6);
	while(temp.length < 6) temp = "0" + temp;
	document.getElementById("top").innerHTML = temp;
	
	temp = this.currScore + "";
	if(temp.length > 6) temp = temp.substr(temp.length - 6);
	while(temp.length < 6) temp = "0" + temp;
	document.getElementById("score").innerHTML = temp;
	
	//var streak = 0;
	temp = this.streak + "";
	if(temp.length > 3) temp = temp.substr(temp.length - 6);
	while(temp.length < 3) temp = "0" + temp;
	document.getElementById("streak").innerHTML = temp;
	
	temp = this.ballsLeft.length + "";
	if(temp.length > 3) temp = temp.substr(temp.length - 6);
	while(temp.length < 3) temp = "0" + temp;
	document.getElementById("balls").innerHTML = temp;
	
	temp = this.level + "";
	if(temp.length > 3) temp = temp.substr(temp.length - 6);
	while(temp.length < 3) temp = "0" + temp;
	document.getElementById("round").innerHTML = temp;
}

function setScore() {
	$.ajax({
		type: "POST",
		async: false,
		url: "js/setscore.php" + "?score=" + engine.topScore,
		success: function(data) {
			FB.ui({
				method: "feed",
				caption: "I just got a high score of " + numberWithCommas(engine.topScore) + " in Hypersplode!",
				name: "Play Hypersplode!",
				link: "http://apps.facebook.com/hypersplode"
			}, function(response) {
			});
		},
		error: function(data) {
			alert("There seems to have been a problem saving the score. We apologize.");
		}
	});
	updateScoreboard();
}

function createFacebookScoreboard(data) {
	var FBscoreboard = $("#FBscoreboard");
	FBscoreboard.empty();
	for(var i = 0;i<Math.min(data.length, 10);i++) {
		var dom = $("<div>");
		dom.addClass("FBScore");
		var img = $("<img>");
		img.attr("src", "//graph.facebook.com/" + data[i].user.id + "/picture");
		dom.append(img);
		dom.append("<span>" + data[i].user.name.split(" ")[0] + "<br />Top Score: " + numberWithCommas(data[i].score) + "</span>");
		FBscoreboard.append(dom);
	}
}

function updateScoreboard() {
	FB.api("/" + appId + "/scores", function(response2) {
		createFacebookScoreboard(response2.data);
	});
}

//care of http://stackoverflow.com/questions/2901102/how-to-print-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}