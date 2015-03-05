(function() {
    var canvas = document.getElementById('paint');
    var ctx = canvas.getContext('2d');
	var imageObj = new Image();
	
	/* Loading the Image*/
	imageObj.onload = function() {
        ctx.drawImage(imageObj, 0, 0);
		/* Setting the paint to be Underneath the Drawing */
		ctx.globalCompositeOperation="destination-over";
		};
	  
      imageObj.src = 'https://lh5.googleusercontent.com/-P5ucC3TjCLU/UjHE0rENTaI/AAAAAAAAAts/mH2A_OORkQY/s800/color.png';


    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);

	var brushColor = 'yellow';
	
     document.getElementById('brushBlue').onclick = function () {
     brushColor = 'blue';
     ctx.strokeStyle = brushColor;
    };

    /* Drawing on Paint App */
    ctx.lineWidth = 20;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
	ctx.strokeStyle = brushColor;

	canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function() {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
		

    };

}());

/*var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
		
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}*/