var colors = [];
var pickedColor;
var numSquares = 6;
var gameMode = "Normal";
var h1 = document.querySelector("h1");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#resetBtn");
var mode = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");


init();

function init(){
	setupMode();
	setupGameMode();
	reset();
	resetBtn.addEventListener("click", function(){
		reset();
	});
	gameStart();
}

function setupMode() {
	for(i = 0; i < mode.length; i++) {
		mode[i].addEventListener("click", function() {
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			mode[2].classList.remove("selected");
			this.classList.add("selected");
			gameMode = this.textContent;
			setupGameMode();
			reset();
		});
	};
}

function setupGameMode(){
	if(gameMode === "Hard") {
		return numSquares = 9;
	} else if(gameMode === "Normal") {
		return numSquares = 6;
	} else {
		return numSquares = 3;
	}
}

function reset() {
	selectColors();
	pickColor();
	h1.style.backgroundColor = "rgb(221, 77, 67)"; //Fiesta//
	messageDisplay.textContent = "";
	resetBtn.textContent = "New Colors";	
}

function selectColors(color) {
	colors = [];
	for(i = 0; i < squares.length; i++) {
		if(i < numSquares) {
			var color = getRandomColor();
			colors.push(color);
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = color;
		} else {
			squares[i].style.display = "none";
		};
	};
	return colors;
}

function getRandomColor(color){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	color = "rgb(" + r + ", " + g + ", " + b + ")";
	return color;
}

function pickColor(){
	pickedColor = colors[Math.floor(Math.random() * numSquares)];
	colorDisplay.textContent = pickedColor;
	return pickedColor;
}

function gameStart(){
	for(i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				gameOver();
			} else {
				messageDisplay.textContent = "Try Again";
				this.style.backgroundColor = "rgb(59, 58, 80)"; //Eclipse//
			};
		});
	};
}

function gameOver(){
	messageDisplay.textContent = "You won!";
	h1.style.backgroundColor = pickedColor;
	for(i = 0; i < numSquares; i++) {
		squares[i].style.backgroundColor = pickedColor;
	};
	resetBtn.textContent = "Play again?";	
}

