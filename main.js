//main.js


//testing
var p = document.querySelector('#testp');


//canvas set up
var canvas = document.querySelector('#myCanvas');
ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;
canvas.style.background = "#202020";

//diamond width and height
var dWidth = 90;
var dHeight = 45;

//room dimensions
var xCount = 9;
var yCount = 5;

//horizontal and vertical offset
var hOffset = 100;
var vOffset = 420;


//image sources

var sources = {

sofa: "old/img/sofa.png",
flooring: "old/img/floor.png",
wallOne: "old/img/wallleft.png",
wallTwo: "old/img/wallright.png",
windowleft: "old/img/window.png",
door: "old/img/door.png",
lamp: "old/img/lamp.png",
grain: "old/img/grain.png",
stageEmpty: "old/img/emptystage.png",
focusSquare: "old/img/focus.png",
easel: "old/img/easel.png",
car: "old/img/car.png",
boy: "old/img/People/Little_Boy_Pink.png",
boyL: "old/img/People/Little_Boy_Pink_Left.png",
boyBL: "old/img/People/Little_Boy_Pink_bleft.png",
boyBR: "old/img/People/Little_Boy_Pink_bright.png"

}


//loading images


var images = {};


function loadImages(sources) {

	var loadedImages = 0;
	var numImages = 0;

for(var src in sources) {
	numImages++;
}

for(var src in sources) {

	images[src] = new Image();

	images[src].onload = function() {

		if(++loadedImages >= numImages) {
		//all images loaded
		initalise();

		}

};

images[src].src = sources[src];

}
}

loadImages(sources);



//Squares
function Square(x, y){

	this.h = hOffset + x*dWidth/2 + (yCount - y)*dWidth/2
	this.v = vOffset - x*dHeight/2 + (yCount - y)*dHeight/2

	this.draw = function(){
		//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		ctx.drawImage(images.flooring,0,0,images.flooring.width, images.flooring.height, this.h, this.v - dHeight/2, dWidth, dHeight);
	}

}

var squares = [];

function initialiseSquares(){

	for (x = 0; x<= xCount; x++){
		squares[x] = [];
	for (y = 0; y<= yCount; y++){
		squares[x][y] = new Square(x,y);
	}
	}

}

function drawsquares(){

	for (x = 0; x<= xCount; x++){
	for (y = 0; y<= yCount; y++){
		squares[x][y].draw();
	}
	}

}






function initalise(){

	initialiseSquares();

	drawsquares();
}