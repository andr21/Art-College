var canvas = document.querySelector('#myCanvas')
ctx = canvas.getContext("2d");
var p = document.querySelector('#ppp');


canvas.width = 300;
canvas.height = 300;

var fwcolor = "yellow";
//'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)

canvas.style.background = "grey";
//"rgb(10,10,10)";

function drawBall(x,y,size, color){

ctx.beginPath();
ctx.arc(x, y, size, 0, Math.PI*2);
ctx.fillStyle = color;
ctx.fill();
ctx.closePath();

}


function Particle(x,y,vx,vy, ax, ay, size, explodness, color){
this.x = x;
this.y = y;
this.explode = explodness;
this.shrapnell = explodness;
this.color = color;

this.vel = {x: vx, y: vy}
this.acc = {x: ax, y: ay}

this.update = function(){
 this.x += this.vel.x
 this.y += this.vel.y
 this.vel.x += this.acc.x
 this.vel.y += this.acc.y

 if(this.vel.y > -0.1 && this.explode == false){
 this.explode = true;
 exploded(this.x,this.y, this.color);
}

}
this.draw = function(){
if(this.explode == false || this.shrapnell){
 drawBall(this.x, this.y, size, this.color);
}
}

}

var balls = [];



function draw(){
canvas.width = canvas.width;

if(Math.random() > 0.98){
balls[balls.length] = new Particle(Math.floor((Math.random() * 300) + 1),300,0,Math.floor((Math.random() * 1.5) - 7.02),0,0.1,3, false, fwcolor);
}

for(i=1; i<=balls.length-1; i++){
balls[i].draw();
balls[i].update();
}

ppp.innerHTML = balls.length;

if(balls.length > 0){
removeBalls();
}


}

setInterval(draw,20);



function exploded(x,y,color){

for(i=1; i<=Math.random()*150+50; i++){

balls[balls.length] = new Particle(x,y,(Math.random() * 4) - 2,(Math.random() * 4) - 2,0,0.08,1.5, true, color);

}


}


function removeBalls(){

for(i=1; i<=balls.length; i++){

if(balls[i].y > canvas.height){
balls.splice(i,1);
i=i-1;
}
else{
 break;
}

}


}

p.onclick = function(e) { 

balls[balls.length] = new Particle(Math.floor((Math.random() * 300) + 1),300,0,Math.floor((Math.random() * 1.5) - 7.02),0,0.1,3, false, fwcolor);

}

