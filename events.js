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

		if((V <= dHeight/2 && H > dWidth/2 - (dWidth/dHeight)*V && H <dWidth/2 + (dWidth/dHeight)*V) || V > dHeight/2 && H > (dWidth/dHeight)*V - dWidth/2 && H < -(dWidth/dHeight)*V + 3*dWidth/2){

			focus.x = x;
			focus.y = y;

			if(furnimoving == 1){
				if(objects[focusstage.focus].canbeplaced(x,y) == true){
				    objects[focusstage.focus].pos.x = x;
				    objects[focusstage.focus].pos.y = y;
				}
				    	
			}


		break loop;
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

	if((V <= dHeight/2 && H > dWidth/2 - (dWidth/dHeight)*V && H <dWidth/2 + (dWidth/dHeight)*V) || V > dHeight/2 && H > (dWidth/dHeight)*V - dWidth/2 && H < -(dWidth/dHeight)*V + 3*dWidth/2){

		
		if(furnimoving == 1){
			objects[focusstage.focus].placefurni(x,y);
		}
		else{

			if(squares[x][y].ocupied == 0){
						    
				focusstage.select(0.5);
						    
				pathEnd= [x,y];
				createworld();

			}else{
				focusstage.select(findobjectclicked(x,y));
					
			}
			
		}
			
        break loop;
		
	}

}
}


e.preventDefault()


}, false);



function findobjectclicked(x,y){
	for(l = 0; l < objects.length; l++){
		if(objects[l].isClicked(x,y) == 1){
	 
	    	return l;

		}
	}
}



//dbl click

canvas.addEventListener('dblclick', function(e) {


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

	if((V <= dHeight/2 && H > dWidth/2 - (dWidth/dHeight)*V && H <dWidth/2 + (dWidth/dHeight)*V) || V > dHeight/2 && H > (dWidth/dHeight)*V - dWidth/2 && H < -(dWidth/dHeight)*V + 3*dWidth/2){

		if(H > dWidth/2 - (dWidth/dHeight)*V && H <dWidth/2 + (dWidth/dHeight)*V){
					
		    if(squares[x][y].ocupied == 0){
				//do nothing    
					    
			}else{
				
				objects[findobjectclicked(x,y)].nudge();
				
			}

		}

	}

}
}


e.preventDefault()


}, false);



//rotatebutton.onclick = rotatebuttonclick();


function rotatebuttonclick(){
  objects[focusstage.focus].rotate();

}

function movebuttonclick(){
  objects[focusstage.focus].movefurni();

}


