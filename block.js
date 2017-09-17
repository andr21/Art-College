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






function Easel(pos, size, orientation){
    Block.call(this, pos, size);
    this.image = images.easel;
    this.orientation = orientation;

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