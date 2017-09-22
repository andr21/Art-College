//events


//mouse move
canvas.addEventListener('mousemove', function(e) {

    if(e.offsetX) {
        Hloc = e.offsetX;
        Vloc = e.offsetY;
    }
    else if(e.layerX) {
        Hloc = e.layerX;
        Vloc = e.layerY;
    }

	loop:
	for (x = 0; x<= xCount; x++){
	for (y = 0; y<= yCount; y++){

		H = Hloc - squares[x][y].h;
		V = Vloc - squares[x][y].v + dHeight/2;

			if(V <= dHeight/2){

			     if(H > dWidth/2 - (dWidth/dHeight)*V && H <dWidth/2 + (dWidth/dHeight)*V){

				    focus.x = x;
				    focus.y = y;
				    break loop;
			     }

			}else{

			  if(H > (dWidth/dHeight)*V - dWidth/2 && H < -(dWidth/dHeight)*V + 3*dWidth/2){

				    focus.x = x;
				    focus.y = y;
				    break loop;
			  }

			}

	}
	}



e.preventDefault()

}, false);




//find square that is clicked

canvas.addEventListener('click', function(e) {


if(e.offsetX) {
        Hclick = e.offsetX;
        Vclick = e.offsetY;
    }
    else if(e.layerX) {
        Hclick = e.layerX;
        Vclick = e.layerY;
    }


loop:
	for (x = 0; x<= xCount; x++){
	for (y = 0; y<= yCount; y++){

		H = Hclick - squares[x][y].h;
		V = Vclick - squares[x][y].v + dHeight/2;

			if(V <= dHeight/2){

			     if(H > dWidth/2 - (dWidth/dHeight)*V && H <dWidth/2 + (dWidth/dHeight)*V){

					if(!(objects[0].pos.x == x && objects[0].pos.y == y) && squares[x][y].ocupied == 0){
					    pathEnd= [x,y];
					    createworld();
					    break loop;
					}

			     }

			}else{

			  if(H > (dWidth/dHeight)*V - dWidth/2 && H < -(dWidth/dHeight)*V + 3*dWidth/2){

				    if(!(objects[0].pos.x == x && objects[0].pos.y == y) && squares[x][y].ocupied == 0){
					    pathEnd = [x,y];
					    createworld();
					    break loop;
					}
			  }

			}

	}
	}


e.preventDefault()


}, false);







