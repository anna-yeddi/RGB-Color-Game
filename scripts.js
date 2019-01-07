"use strict";

let colors = [],
	pickedColor,
	numSquares = 6,
	gameMode = "Normal",
	h1 = document.querySelector("h1"),
	colorDisplay = document.querySelector("#colorDisplay"),
	messageDisplay = document.querySelector("#message"),
	resetBtn = document.querySelector("#resetBtn"),
	mode = document.querySelectorAll(".mode"),
	squares = document.querySelectorAll(".square");


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
	mode.forEach(function (btn) {
		btn.addEventListener("click", function() {
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			mode[2].classList.remove("selected");
			this.classList.add("selected");
			gameMode = this.textContent;
			setupGameMode();
			reset();
		});
	});
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
	squares.forEach(function(square) {
		square.removeEventListener("click", reset);
	});
	selectColors();
	pickColor();
	h1.style.backgroundColor = "var(--bright)";
	messageDisplay.textContent = "";
	resetBtn.textContent = "New Colors";
}

function selectColors(color) {
	colors = [];
	squares.forEach(function(square, i) {
		if(i < numSquares) {
			let color = getRandomColor();
			colors.push(color);
			square.style.display = "block";
			square.style.backgroundColor = color;
			square.style.boxShadow = "var(--shadow)";
		} else {
			square.style.display = "none";
		}
	});
	return colors;
}

function getRandomColor(color){
	let r = Math.floor(Math.random() * 256),
		g = Math.floor(Math.random() * 256),
		b = Math.floor(Math.random() * 256);
	color = "rgb(" + r + ", " + g + ", " + b + ")";
	return color;
}

function pickColor(){
	pickedColor = colors[Math.floor(Math.random() * numSquares)];
	colorDisplay.textContent = pickedColor;
	return pickedColor;
}

function gameStart(){
	squares.forEach(function (square) {
		square.addEventListener("click", function(){
			let clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				gameOver();
			} else {
				messageDisplay.textContent = "Try Again";
				this.style.backgroundColor = "var(--dark)";
				this.style.boxShadow = "none";
			}
		});
	});
}

function gameOver(){
	messageDisplay.textContent = "You won!";
	h1.style.backgroundColor = pickedColor;
	squares.forEach(function(square) {
		square.style.backgroundColor = pickedColor;
		square.style.boxShadow = "var(--shadow)";
		square.addEventListener("click", reset);
	});
	resetBtn.textContent = "Play again?";	
}

