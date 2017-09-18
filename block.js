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






function Sofa(pos, size, orientation){
    Block.call(this, pos, size);
    this.image = images.sofa;
    this.orientation = orientation;
    this.numorientations = 2;

    this.draw = function(){
        if (this.orientation == 0){
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        
        ctx.drawImage(this.image,0,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h, squares[this.pos.x][this.pos.y].v - dHeight* 2, dWidth*1.5, this.image.height+2.5);
        

        }
        else if (this.orientation == 1){

                  ctx.drawImage(this.image,this.image.width/2,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h - dWidth/2, squares[this.pos.x][this.pos.y].v - dHeight* 1.5 - dHeight/2, dWidth*1.5, this.image.height+2.5);
        

        }

    }

}

var sofas = [];
function initialiseSofas(){

    sofas[0] = new Sofa({x:0,y:5,z:0}, {x:2,y:1,z:2}, 0);

}

function drawsofas(){

    for (i = 0; i < easels.length; i++){
        sofas[i].draw();
    }

}




function Easel(pos, size, orientation){
    Block.call(this, pos, size);
    this.image = images.easel;
    this.orientation = orientation;
    this.numorientations = 2;

    this.draw = function(){
        if (this.orientation == 0){
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(this.image,0,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h + 21, squares[this.pos.x][this.pos.y].v - this.image.height + 22, this.image.width/2, this.image.height);

        }
        else if (this.orientation == 1){

        ctx.drawImage(this.image,this.image.width/2,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h + 3, squares[this.pos.x][this.pos.y].v - this.image.height + 22, this.image.width/2, this.image.height);

        }

    }

}

var easels = [];
function initialiseEasels(){

    easels[0] = new Easel({x:2,y:5,z:0}, {x:1,y:1,z:2}, 0);

}

function draweasels(){

    for (i = 0; i < easels.length; i++){
        easels[i].draw();
    }

}





function Man(pos, size, orientation){
    Block.call(this, pos, size);
    this.orientation = orientation;
    this.numorientations = 4;

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


    this.draw = function(){
        //needs to be fixed
    ctx.drawImage(this.image,squares[this.pos.x][this.pos.y].h - 14,squares[this.pos.x][this.pos.y].v - 111,120,120);

    }
}

var mans = [];
function initialiseMans(){

    mans[0] = new Man({x:9,y:4,z:0}, {x:1,y:1,z:3},2);

}

function drawmans(){

    for (i = 0; i < easels.length; i++){
        mans[i].draw();
    }

}



