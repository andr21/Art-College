
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



//man

function Man(pos, size, orientation){
    Block.call(this, pos, size);
    this.orientation = orientation;
    this.numorientations = 4;
    this.bounds = this.getBounds();
    this.XhalfStep = 0;
    this.YhalfStep = 0;

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
    
    console.log((this.XhalfStep - this.YhalfStep) * dWidth + ', ' + (-this.XhalfStep - this.YhalfStep) * dHeight);
    //console.log(this.XhalfStep + ', ' + this.YhalfStep);
    }

    this.draw = function(){
        
        if(this.walk == true){
          this.step();
        }
        
        
        //needs to be fixed
    ctx.drawImage(this.image,squares[this.pos.x - this.XhalfStep][this.pos.y - this.YhalfStep].h + (this.XhalfStep - this.YhalfStep) * dWidth - 14, squares[this.pos.x - this.XhalfStep][this.pos.y - this.YhalfStep].v + (-this.XhalfStep - this.YhalfStep) * dHeight - 111,120,120);
    
        this.setocupied();
    }
}

Man.prototype = Object.create(Block.prototype);
Man.prototype.constructor = Man;


Man.prototype.setocupied = function(){

    for(x = this.bounds.xmin; x < this.bounds.xmax; x++){
    for(y = this.bounds.ymin; y < this.bounds.ymax; y++){

        squares[x][y].ocupied = 1;

    }
    }

}

var mans = [];
function initialiseMans(){

    mans[0] = new Man({x:9,y:4,z:0}, {x:1,y:1,z:3},2);

}

function drawmans(){

    for (i = 0; i < mans.length; i++){
        mans[i].draw();
    }

}




//Furni


function Furni(type, pos, size, orientation){
    Block.call(this, pos, size);
    this.type = type;
    this.orientation = orientation;
    this.bounds = this.getBounds();
    
        switch(this.type){
            case "easel":
                this.image = images.easel;
                this.numorientations = 2;
                this.draw = function(){
                    this.draweasel();
                    this.setocupied();
                }
        break;
            case "sofa":
                this.image = images.sofa;
                this.numorientations = 2;
                this.draw = function(){
                    this.drawsofa();
                    this.setocupied();
               }
        break;
        }
    
}

Furni.prototype = Object.create(Block.prototype);
Furni.prototype.constructor = Furni;


Furni.prototype.setocupied = function(){

    for(x = this.bounds.xmin; x < this.bounds.xmax; x++){
    for(y = this.bounds.ymin; y < this.bounds.ymax; y++){

        squares[x][y].ocupied = 1;

    }
    }

}


Furni.prototype.draweasel = function(){


        if (this.orientation == 0){
            //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            ctx.drawImage(this.image,0,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h + 21, squares[this.pos.x][this.pos.y].v - this.image.height + 22, this.image.width/2, this.image.height);

        }
        else if (this.orientation == 1){

            ctx.drawImage(this.image,this.image.width/2,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h + 3, squares[this.pos.x][this.pos.y].v - this.image.height + 22, this.image.width/2, this.image.height);

        }

}



Furni.prototype.drawsofa = function(){

        if (this.orientation == 0){
            //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            ctx.drawImage(this.image,0,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h, squares[this.pos.x][this.pos.y].v - dHeight* 2, dWidth*1.5, this.image.height+2.5);
            
        }
        else if (this.orientation == 1){

            ctx.drawImage(this.image,this.image.width/2,0,this.image.width/2, this.image.height, squares[this.pos.x][this.pos.y].h - dWidth/2, squares[this.pos.x][this.pos.y].v - dHeight* 1.5 - dHeight/2, dWidth*1.5, this.image.height+2.5);
        

        }


}


var furnis = [];
function initialiseFurnis(){

    furnis[0] = new Furni("easel",{x:2,y:5,z:0}, {x:1,y:1,z:2}, 0);
    furnis[1] = new Furni("sofa",{x:0,y:5,z:0}, {x:2,y:1,z:2}, 0);
}


function drawfurnis(){

    for (i = 0; i < furnis.length; i++){
        furnis[i].draw();
    }

}


