//events

//canvas.getBoundingClientRect(); effected when zooming in, test zooming in on PC

var rect = canvas.getBoundingClientRect();



//mouse move
canvas.addEventListener('mousemove', function(e) {

rect = canvas.getBoundingClientRect();

Hloc = e.pageX - rect.left,

Vloc = e.pageY - rect.top;

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
//console.log(x +' ' + y);
console.log(x + ', ' + y + 'rectleft:' + rect.left + ', ' + e.pageX);

}, false);