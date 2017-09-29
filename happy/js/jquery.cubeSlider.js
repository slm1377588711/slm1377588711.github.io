(function($, global){
$.fn.polygon = function(options) {
	var ops = $.extend({
		num: 0,
		width: 100,
		height: 100,
		timer: false,
	}, options);

	var $content = $(this);
	var $child = $content.find('> *');
	var length = $child.length;

	var deg = 360 / length;

	var r = deg / 2 * Math.PI / 180;
	var translateZ = ops.width / 2 / Math.tan (r);

	$child.css({
		width: ops.width,
		height: ops.height,
	});

	move(ops.num);
	$child.on('click', function() {
		var index = $(this).index();
		move(index);
	});

	function move(num) {

		ops.num = num >= length ? 0 :
			num < 0 ? length - 1 : num;

		$child.each(function(i, el) {
			$(this).css({
				transform: 'rotateY(' + (deg * -(ops.num - i)) + 'deg) ' +  'translateZ(' + translateZ +  'px)'
			})
		});
	}


	if(ops.timer) {
		var timer = {
			content: '',
			start: function() {
				this.content = setInterval(this.main, ops.timer);
			},
			stop: function() {
				clearInterval(this.content);
			},
			main: function() {
				move(++ops.num);
			}
		};

		timer.start();
		$content.hover(function(){
			timer.stop();
		},function(){
			timer.start();
		});
	}
}
}(jQuery, this));