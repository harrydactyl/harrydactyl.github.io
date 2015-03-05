(function() {
    var canvas = document.getElementById('paint');
    var ctx = canvas.getContext('2d');

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