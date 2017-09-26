
//block
function Block(pos,size) {
 
 // position in 3d space (obj with attrs x,y,z)
  this.pos = pos;
 // size of each dimension (obj with attrs x,y,z)
  this.size = size;
};
 
Block.prototype.getBounds = function() {
    var p = this.pos;
    var s = this.size;
    return {
            xmin: p.x,
            xmax: p.x + s.x,
            ymin: p.y,
            ymax: p.y + s.y,
            zmin: p.z,
            zmax: p.z + s.z,
    };
                        
};

Block.prototype.isClicked = function(x,y){

    for(i = this.bounds.xmin; i < this.bounds.xmax; i++){
    for(j = this.bounds.ymin; j < this.bounds.ymax; j++){
     
        if(x == i && y == j){
            return true;
        }
       
    }
    }
     
    return false;
}



//man

function Man(pos, orientation){
    this.size = {x:1,y:1,z:2};
    Block.call(this, pos, this.size);
    this.orientation = orientation;
    this.numorientations = 4;
    this.bounds = this.getBounds();
    this.XhalfStep = 0;
    this.YhalfStep = 0;
    this.select = 0;
    
    this.updateimage = function(){
        switch(this.orientation){
            case 0:
                this.image = images.boyBR;
                break;
            case 1:
                this.image = images.boyBL;
                break;
            case 2:
                this.image = images.boyL;
                break;
            case 3:
                this.image = images.boy;
                break;
        }
    }
    this.updateimage();

    this.walk = false;
    this.path = [];
    this.pathprogress = 0;
    
    this.startwalk = function(path){
     
        this.path = path;
        this.walk = true;
        this.pathprogress = 1;
    
    }
    
    this.step = function(){

        var pathnum = this.pathprogress/2;
    
        if( pathnum % 1 > 0){
        
            this.XhalfStep = (this.path[pathnum + 1/2][0] - this.path[pathnum - 1/2][0])/2;
            this.YhalfStep = (this.path[pathnum + 1/2][1] - this.path[pathnum - 1/2][1])/2;

            if(this.XhalfStep > 0){
                this.orientation = 0;
            }
            else if(this.XhalfStep < 0){
                this.orientation = 2;
            }
            else if(this.YhalfStep > 0){
                this.orientation = 1;
            }
            else if(this.YhalfStep < 0){
                this.orientation = 3;
            }
            
            this.updateimage();

            this.pos.x = this.path[pathnum - 1/2][0] + this.XhalfStep;
            this.pos.y = this.path[pathnum - 1/2][1] + this.YhalfStep;
        
        }
        else{
        
            this.XhalfStep = 0;
            this.YhalfStep = 0;
            this.pos.x = this.path[pathnum][0];
            this.pos.y = this.path[pathnum][1];
        
        }
        
        this.pathprogress++;

        if(this.pathprogress > (this.path.length-1) * 2){

            this.walk = false;
        
        }
        
    }

    this.draw = function(){
        
        this.removeocupied();

        if(this.walk == true){
            this.step();
        }
        
        //needs to be fixed
        ctx.drawImage(this.image,squares[this.pos.x - this.XhalfStep][this.pos.y - this.YhalfStep].h + (this.XhalfStep - this.YhalfStep) * dWidth/2 - 14, squares[this.pos.x - this.XhalfStep][this.pos.y - this.YhalfStep].v + (-this.XhalfStep - this.YhalfStep) * dHeight/2 - 111,120,120);
        this.bounds = this.getBounds();
        this.setocupied();
        
        if(this.select == 1){
        
            ctx.drawImage(images.boy,stageH + 3, stageV + 16,120 * 0.7,120 * 0.7);
        
        }
        
        
    }
}

Man.prototype = Object.create(Block.prototype);
Man.prototype.constructor = Man;


Man.prototype.setocupied = function(){

    for(x = this.bounds.xmin; x < this.bounds.xmax; x++){
    for(y = this.bounds.ymin; y < this.bounds.ymax; y++){

        squares[Math.floor(x)][Math.floor(y)].ocupied = 1;

    }
    }

}

Man.prototype.removeocupied = function(){

    for(x = this.bounds.xmin; x < this.bounds.xmax; x++){
    for(y = this.bounds.ymin; y < this.bounds.ymax; y++){

        squares[Math.floor(x)][Math.floor(y)].ocupied = 0;

    }
    }

}




//Furni


function Furni(type, pos, orientation, action){
    this.type = type;
    this.orientation = orientation;
    this.action = action;
    this.select = 0;
    this.move = 0;
    
        switch(this.type){
        case "easel":
                this.image = images.easel;
                this.numorientations = 2;
                this.numactions = 0;
                this.draw = function(){
                    this.draweasel();
                }
                this.size = {x:1,y:1,z:2.5};
                break;
        case "sofa":
                this.image = images.sofa;
                this.numorientations = 2;
                this.numactions = 0;
                this.draw = function(){
                    this.drawsofa();
                }
                this.size = {x:2,y:1,z:2};
                break;
        case "lamp":
                this.image = images.lamp;
                this.numorientations = 1;
                this.numactions = 1;
                this.draw = function(){
                    this.drawlamp();
                }
                this.size = {x:1,y:1,z:3};
                break;
        }
        Block.call(this, pos, this.size);
        this.bounds = this.getBounds();
        this.setocupied();
    
}

Furni.prototype = Object.create(Block.prototype);
Furni.prototype.constructor = Furni;


Furni.prototype.setocupied = function(){
this.bounds = this.getBounds();

    for(x = this.bounds.xmin; x < this.bounds.xmax; x++){
    for(y = this.bounds.ymin; y < this.bounds.ymax; y++){

        squares[x][y].ocupied = 1;

    }
    }

}

Furni.prototype.removeocupied = function(){
this.bounds = this.getBounds();

    for(x = this.bounds.xmin; x < this.bounds.xmax; x++){
    for(y = this.bounds.ymin; y < this.bounds.ymax; y++){

        squares[x][y].ocupied = 0;

    }
    }

}

//movefurni
Furni.prototype.movefurni = function(){

    this.move = 1;
    this.removeocupied();
    furnimoving = 1;

}

//action
Furni.prototype.nudge = function(){
    this.action++;
    if(this.action > this.numactions){
        this.action = 0;
    }
}
//rotate
Furni.prototype.rotate = function(){
    this.orientation++;
    if(this.orientation >= this.numorientations){
        this.orientation = 0;
    }
}

Furni.prototype.draweasel = function(){

    if(this.move == 1){
        ctx.globalAlpha = 0.5;
    }
        if (this.orientation == 0){
            //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            ctx.drawImage(this.image,0,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h + 21, squares[this.pos.x][this.pos.y].v - this.image.height + 22, this.image.width/2, this.image.height);

        }
        else if (this.orientation == 1){

            ctx.drawImage(this.image,this.image.width/2,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h + 3, squares[this.pos.x][this.pos.y].v - this.image.height + 22, this.image.width/2, this.image.height);

        }

    ctx.globalAlpha = 1;
        
        if(this.select == 1){
        
            ctx.drawImage(this.image,0,0,this.image.width/2, this.image.height, stageH + 25, stageV + 15, this.image.width/2 * 0.65, this.image.height * 0.65);
        
        }

}



Furni.prototype.drawsofa = function(){

    if(this.move == 1){
        ctx.globalAlpha = 0.5;
    }

    if (this.orientation == 0){
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(this.image,0,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h, squares[this.pos.x][this.pos.y].v - dHeight* 2, dWidth*1.5, this.image.height+2.5);
            
    }
    else if (this.orientation == 1){

        ctx.drawImage(this.image,this.image.width/2,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h - dWidth/2, squares[this.pos.x][this.pos.y].v - dHeight* 1.5 - dHeight/2, dWidth*1.5, this.image.height+2.5);
        
    }

    ctx.globalAlpha = 1;
        
    if(this.select == 1){
     
        ctx.drawImage(this.image,0,0,this.image.width/2, this.image.height, stageH, stageV + 28, dWidth*1.5 * 0.65, (this.image.height+2.5) * 0.65);
     
    }   
        
}

Furni.prototype.drawlamp = function(){

    if(this.move == 1){
        ctx.globalAlpha = 0.5;
    }

    if(this.action == 0){
        ctx.drawImage(this.image,this.image.width/2,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h - 26, squares[this.pos.x][this.pos.y].v - this.image.height + dHeight/2 + 3, this.image.width/2, this.image.height);
    }else{
        ctx.drawImage(this.image,0,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h - 25, squares[this.pos.x][this.pos.y].v - this.image.height + dHeight/2 + 3, this.image.width/2, this.image.height);
    }

    ctx.globalAlpha = 1;
   
    if(this.select == 1){
        ctx.drawImage(this.image,this.image.width/2,0,this.image.width/2, this.image.height, stageH, stageV - 10, this.image.width/2 * 0.65, this.image.height * 0.65);
    }

}


//if no obstruction, place furni.
Furni.prototype.placefurni = function(x, y){
var possible = true;

    for(i = 0; i <= this.size.x - 1; i++){
    for(j = 0; j <= this.size.y - 1; j++){

        if(squares[x+i][y+j].ocupied == 1){

            possible = false;
        }

    }
    }

    if(possible == true){

        this.pos.x = x;
        this.pos.y = y;
        this.move = 0;
        furnimoving = 0;
        
        this.setocupied();
    }

}

//focus stage

var focusstage = new FocusStage;

function FocusStage(){
    this.on = 0;
    this.focus = 0.5;


    this.draw = function(){

        if(this.focus == 0.5){
            this.on = 0;
        }else{
            this.on = 1;
            objects[this.focus].select = 1;
        }
      
        this.buttons();
    }


    this.select = function(object){
        if(this.focus != 0.5){
            objects[this.focus].select = 0;
        }
        this.focus = object;
        this.draw();
    }
 
 
    this.buttons = function(){
        if(this.on == 1){
            itemname.innerHTML = objects[this.focus].type;
            movebutton.style.display = 'block';
            rotatebutton.style.display = 'block';

        }else{
            itemname.innerHTML = "";
            movebutton.style.display = 'none';
            rotatebutton.style.display = 'none';
      
        }
     
    }

}



//objects

var objects = [];
function initialiseObjects(){

    objects[0] = new Man({x:9,y:4,z:0}, 2);
    objects[1] = new Furni("easel",{x:2,y:5,z:0}, 0, 0);
    objects[2] = new Furni("sofa",{x:0,y:5,z:0}, 0, 0);
    objects[3] = new Furni("lamp",{x:4,y:3,z:0}, 0, 0);
    objects[4] = new Furni("easel",{x:0,y:0,z:0}, 0, 0);
    objects[5] = new Furni("easel",{x:1,y:0,z:0}, 0, 0);
    objects[6] = new Furni("lamp",{x:6,y:2,z:0}, 0, 0);

}

function drawobjects(){
   IsoBlock.sortBlocks(objects, camera);
}



