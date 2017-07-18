 console.log("Code Author: Rohit Sattu");

// game icons list
var icons = ["account_balance", "android", "visibility", "bug_report", "event_seat", "important_devices", "motorcycle", "room"];

var moves = 0; //holds number of moves
var animating = 0; // boolean for animation when selected wrong tiles
var x = 1; // place holder
var stars = 3; // holds stars
var shuffled = []; // holds randomly shuffled game icons
var icons1 = icons.slice(); // to have duplicate tiles
var icons2 = icons.slice(); // to have duplicate tiles
var timer = 0; // holds time
var i = icons1.length; // support for duplicating tiles
var j = icons2.length; // support for duplicating tiles
var placeholder = 0;
var win = 0; // boolean for win/still playing
var match = []; // holds matched tiles
var left = ""; // holds first selection of tiles
var right = ""; // holds second selection of tiles
var gameStarted = 0; // if player has flipped any times yet

// crates list of icons - tiles - from the shuffled list
function createIcons() {
	for (i = 0; i < 16; i++) {
		var tile = document.createElement("i");
		var node = document.createTextNode(shuffled[i]);
		var funcAtt = document.createAttribute("onclick");
		funcAtt.value = "selected(this)";
		tile.setAttributeNode(funcAtt);
		tile.className = "material-icons game_icons";
		tile.appendChild(node);
		document.getElementById("hero").appendChild(tile);
	}
}

// shuffle list of icons to get random tiles
function shuffle() {
	while (i > 0 || j > 0) {
		placeholed = shuffled.length;
		if (j < 0){
			x = 0;
		} else if (i < 0) {
			x = 1;
		}	else {
			x = x * -1;
		}
		if (x == -1 && i >= 0) {
			shuffled.splice(random(random(placeholed)), 0, icons1.pop());
			i = i - 1;
		}
		if (x == 1 && j >= 0) {
			shuffled.splice(random(placeholed), 0, icons2.pop());
			j = j - 1;
		}
	}
	x = shuffled.pop();
	shuffled.splice(random(5), 0, x);
}

// generates random numbers between 0 - x
function random(x) {
	return Math.floor((Math.random() * x));
}

// refreshes page - play again1
function replay() {
	location.reload();
}

// actual game logic
function selected(event) {
	// if clicked on a tile, checks if its the first time. if it is the first tile then the game starts (timer starts)
	if (gameStarted == 0) {
		gameStarted = 1;
		watch();
		console.log("Timer has started!");
	}
	// use inner text to check if the tile is already selected/new tile/matching tile etc
	var selectedIcon = event.textContent
	// if wrong tile is selected then there is a second delay (animation), this check will avoid selecting other tiles while animating
	if (animating == 0) {
		//check if the tile is already selected
		if (match.indexOf(selectedIcon) < 0) {
			// left and right is used here to make sure only 2 tiles are selected at any point of time in the game
			if (left == "") {
				left = event;
				left.classList.toggle("selected"); //selected will change the color to blue
			} else if (right == "") {
				if (left != event){
					right = event;
					right.classList.toggle("selected");
					if (checkForMatch(left, right)) {
						console.log("Matched!"); // changes the color to green
						left.classList.toggle("matched");
						right.classList.toggle("matched");
						match.push(selectedIcon); // adds to match list 
					} else {
						animate(left, right); // changes color to red and back to background color
						console.log("Try Again!");
					}
					updateSelections(); // unchecks any selected tiles
					updateMoves(); // updates number of moves
					updateStars(); // updates number of stars
					if (match.length == 8) { // check for win
						console.log("You Won!");
						win = 1;
						document.getElementById("modal").style.display = "block"; // activate modal! congratulate the player
					}
				}
			}
		}
	}
}

// de-selects the selected tiles
function updateSelections() {
	left.classList.toggle("selected");
	right.classList.toggle("selected");
	left = "";
	right = "";
}

// updates total number of moves and in html
function updateMoves() {
	moves++;
	document.getElementById("moves").innerHTML = moves;
	document.getElementById("noMoves").innerHTML = moves;
}

// alerts player about the wrong selection by changing color to red for a second
function animate(left, right) {
	animating = 1;
	setTimeout(function() {
		left.classList.toggle("err");
		right.classList.toggle("err");
		animating = 0;
	},1000);
	left.classList.toggle("err");
	right.classList.toggle("err");
}

// checks if the two tiles selected are matching
function checkForMatch(left, right) {
	return left.textContent == right.textContent
}

// updates number of stars in multiple places
function updateStars() {
	if (moves > 15) {
		stars = 1;
		document.getElementById("star2").innerHTML = "star_border";
		document.getElementById("star3").innerHTML = "star_border";
	} else if (moves > 12) {
		stars = 2;
		document.getElementById("star3").innerHTML = "star_border";
	} else {
		stars = 3;
		document.getElementsByClassName("rating").innerHTML = "star";
	}
	document.getElementById("withStars").innerHTML = stars;
}

// this will keep track of the time that player spent playing the game
// note the the timer is programmed to start only when player selects a tile first
function watch() {
	if (win == 0) {
		timer++;
		document.getElementById("intime").innerHTML = timer;
		setTimeout(function() {
			watch();
		}, 1000);
	} else {
		console.log("You took: " + timer + " Seconds to finish the game!");
		document.getElementById("intime").innerHTML = timer;
	}
}

//call shuffle at the beginning to shuffle all the icons
shuffle();
//creates all the tiles on the screen/
createIcons();


