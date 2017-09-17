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

//wall and floor height
var wallHeight = 135;

//room dimensions
var xCount = 9;
var yCount = 5;

//horizontal and vertical offset
var hOffset = 100;
var vOffset = 420;

//trying out scaling/zooming in and out
function scale(s){
dWidth = 90;
dHeight = 45;
wallHeight = 135;

dWidth = dWidth * s;
dHeight = dHeight * s;
wallHeight = wallHeight * s;

}



//image sources

var sources = {

sofa: "old/img/sofa.png",
flooring: "old/img/floor.png",
LeftWall0: "old/img/wallleft0.png",
RightWall0: "old/img/wallright0.png",
LeftWall1: "old/img/wallleft1.png",
RightWall1: "old/img/wallright1.png",
window: "old/img/window.png",
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

	for (x = xCount; x>= 0; x--){
	for (y = yCount; y>= 0; y--){
		squares[x][y].draw();
	}
	}

}


//walls
function Wall(LR, style){

this.side = LR;
this.style = style;
switch(this.side){
case "L":
switch(style) {
    case 0:
    this.image = images.LeftWall0
        break;
    case 1:
    this.image = images.LeftWall1
        break;    
}
break;
case "R":
switch(style) {
    case 0:
    this.image = images.RightWall0
        break;
    case 1:
    this.image = images.RightWall1
        break;    
}
break;
}

this.draw = function(){

switch(this.side) {
    case "L":
        
        ctx.drawImage(this.image,0,0,this.image.width, this.image.height, hOffset, vOffset - wallHeight - (xCount+1)/2 * dHeight, (xCount+1)/2 * dWidth, (xCount+1)/2 * dHeight + wallHeight);
        
        break;
    case "R":
        
        ctx.drawImage(this.image,0,0,this.image.width, this.image.height, squares[xCount][yCount].h + dWidth/2, squares[xCount][yCount].v - dHeight/2 - wallHeight, (yCount+1)/2 * dWidth, (yCount+1)/2 * dHeight + wallHeight);
        
        break;      
}

}


}

var walls = [];

function initialiseWalls(){

walls[0] = new Wall("L",0);
walls[1] = new Wall("R",0);

}


function drawwalls(){

	for (i = 0; i < walls.length; i++){
		walls[i].draw();
	}

}





//draw window
function drawwindow() {

//ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
ctx.drawImage(images.window,0,0,images.window.width, images.window.height, squares[2][yCount].h, squares[2][yCount].v - wallHeight - dHeight/2, 1.5 * dWidth, 1.5 * dWidth);

}

function drawdoor() {

ctx.drawImage(images.door,0,0,images.door.width, images.door.height, squares[xCount][yCount].h + dWidth, squares[xCount][yCount].v + dHeight/2 - (dWidth/2)*images.door.height/images.door.width, dWidth/2, (dWidth/2)*images.door.height/images.door.width);

}



function initalise(){

	initialiseSquares();
	initialiseWalls();
	
	
	draw();
}



function draw(){

drawwalls();
drawsquares();
drawwindow();
drawdoor();

}

 
 
 
 
 
 
 

