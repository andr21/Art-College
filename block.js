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

var blocky = new Block({x:0,y:0,z:0},{x:2,y:1,z:1});