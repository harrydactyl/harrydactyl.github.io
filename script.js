var isMobile;
	function isTouchDevice() {
	   var el = document.createElement('div');
	   el.setAttribute('ongesturestart', 'return;');
	   return typeof el.ongesturestart === "function";
	}

	isMobile = isTouchDevice();

	if(window.addEventListener) {
		window.addEventListener('load', function () {
			var canvas, context, draw;

			// Touch Events handlers
			draw = {
				started: false,
				start: function(event) {

					context.beginPath();
					if (isMobile){
						context.moveTo(
							event.targetTouches[0].pageX,
							event.targetTouches[0].pageY
						);
					}else{
						context.moveTo(
							event.pageX - this.offsetLeft, 
							event.pageY - this.offsetTop
						);
					}
					this.started = true;

				},
				move: function(event) {

					if (this.started) {
						if(isMobile){
							context.lineTo(
								event.targetTouches[0].pageX,
								event.targetTouches[0].pageY
							);
						}else{

							context.lineTo(
								event.pageX - this.offsetLeft, 
								event.pageY - this.offsetTop
							);
						}
						context.stroke();
					}

				},
				end: function(event) {
					this.started = false;
				}
			};

			// Canvas & Context
			canvas = document.getElementById('pad');
			context = canvas.getContext('2d');

			// Full Window Size Canvas
			context.canvas.width = window.innerWidth;
			context.canvas.height = window.innerHeight;

			// Events
			canvas.addEventListener('touchstart', draw.start, false);
			canvas.addEventListener('touchend', draw.end, false);
			canvas.addEventListener('touchmove', draw.move, false);
			canvas.addEventListener('mousedown', draw.start, false);
			canvas.addEventListener('mousemove', draw.move, false);
			canvas.addEventListener('mouseup', draw.end, false);

		});		// Disable Page Move
		document.body.addEventListener('touchmove',function(eventvent.preventDefault();
		},false);
	}


/*(function() {
	var canvas = document.querySelector('#paint');
	var ctx = canvas.getContext('2d');
	
	var sketch = document.querySelector('#sketch');
	var sketch_style = getComputedStyle(sketch);
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));

	var mouse = {x: 0, y: 0};
	 
	/* Mouse Capturing Work */
	/*canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	}, false);*/
	
	/* Drawing on Paint App */
	/*ctx.lineWidth = 5;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'blue';
	 
	canvas.addEventListener('mousedown', function(e) {
			ctx.beginPath();
			ctx.moveTo(mouse.x, mouse.y);
	 
			canvas.addEventListener('mousemove', onPaint, false);
	}, false);
	 
	canvas.addEventListener('mouseup', function() {
			canvas.removeEventListener('mousemove', onPaint, false);
	}, false);
	 
	var onPaint = function() {
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
	};
	
}());*/
