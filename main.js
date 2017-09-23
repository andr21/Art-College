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
var floorDepth = 10;

//room dimensions
var xCount = 9;
var yCount = 5;

//horizontal and vertical offset
var hOffset = 100;
var vOffset = 420;

//stage area
var stageH = 700;
var stageV = 450;

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

sofa: "img/sofa.png",
flooring: "img/floor.png",
LeftWall0: "img/wallleft0.png",
RightWall0: "img/wallright0.png",
LeftWall1: "img/wallleft1.png",
RightWall1: "img/wallright1.png",
window: "img/window.png",
door: "img/door.png",
lamp: "img/lamp.png",
grain: "img/grain.png",
stageEmpty: "img/emptystage.png",
focusSquare: "img/focus.png",
easel: "img/easel.png",
car: "img/car.png",
boy: "img/People/Little_Boy_Pink.png",
boyL: "img/People/Little_Boy_Pink_Left.png",
boyBL: "img/People/Little_Boy_Pink_bleft.png",
boyBR: "img/People/Little_Boy_Pink_bright.png"

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
function Square(x, y, ocupied){

	this.h = hOffset + x*dWidth/2 + (yCount - y)*dWidth/2;
	this.v = vOffset - x*dHeight/2 + (yCount - y)*dHeight/2;
	this.ocupied = ocupied;

	this.draw = function(){
		
		ctx.drawImage(images.flooring,0,0,images.flooring.width, images.flooring.height, this.h, this.v - dHeight/2, dWidth, dHeight);
	}

}

var squares = [];

function initialiseSquares(){

	for (x = 0; x<= xCount; x++){
		squares[x] = [];
	for (y = 0; y<= yCount; y++){
		squares[x][y] = new Square(x,y,0);
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

//focus
function Focus(x,y){
this.x = x;
this.y = y;

this.image = images.focusSquare

this.draw = function(){

	ctx.drawImage(this.image,squares[this.x][this.y].h,squares[this.x][this.y].v - dHeight/2,this.image.width,this.image.height);

}

}

var focus = {};

function initialiseFocus(){

	focus = new Focus(xCount,yCount-1);

}

function drawfocus(){

	focus.draw();

}

//stage

function drawstage(){

ctx.drawImage(images.stageEmpty,0,0,images.stageEmpty.width, images.stageEmpty.height, squares[0][0].h +4.5*dWidth, squares[0][0].v - 3*dHeight, images.stageEmpty.width*3/4, images.stageEmpty.height*3/4);

}


//grain


function drawgrain(){
ctx.globalAlpha = 0.6;
ctx.drawImage(images.grain, 0, 0, canvas.width,canvas.height);
ctx.globalAlpha = 1;
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

function drawfloorLeft() {

ctx.beginPath();

ctx.moveTo(squares[0][yCount].h, squares[0][yCount].v);
ctx.lineTo(squares[0][0].h + dWidth/2, squares[0][0].v + dHeight/2);
ctx.lineTo(squares[0][0].h + dWidth/2, squares[0][0].v + dHeight/2 + floorDepth);
ctx.lineTo(squares[0][yCount].h, squares[0][yCount].v + floorDepth);

ctx.fillStyle = "#181919";

ctx.fill();



}



function drawfloorRight() {

ctx.beginPath();

ctx.moveTo(squares[0][0].h + dWidth/2, squares[0][0].v + dHeight/2);
ctx.lineTo(squares[xCount][0].h + dWidth, squares[xCount][0].v);
ctx.lineTo(squares[xCount][0].h + dWidth, squares[xCount][0].v + floorDepth);
ctx.lineTo(squares[0][0].h + dWidth/2, squares[0][0].v + dHeight/2 + floorDepth);
ctx.fillStyle = "#181919";

ctx.fill();


}



function initalise(){

	initialiseSquares();
	initialiseWalls();
	initialiseFocus();
	initialiseObjects();
	setInterval(draw,100);
}



function draw(){

canvas.width = canvas.width;

drawwalls();
drawsquares();
drawfloorRight();
drawfloorLeft();
drawfocus();
drawwindow();
drawdoor();
drawobjects();
drawstage();
drawgrain();


}
 
 
 
 

 
 

