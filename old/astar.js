//A star - walking path

function createWorld()

{



/// create emptiness

for (var x=0; x < worldWidth+1; x++)

{

world[x] = [];

for (var y=0; y < worldHeight+1; y++)

{

world[x][y] = 1;


}

}


for (f = 1; f<= fCount; f++){

for (b = 1; b<= bCount; b++){


world[b][f] = diamond[f][b].status;


}

}



pathStart = [stepB,stepF]

checkFocus();


if (world[pathStart[0]][pathStart[1]] == 0){

currentPath = findPath(world,pathStart,pathEnd);



}


redraw();

}