(function () {
	if ('ontouchstart' in document.documentElement) {
		$('body').addClass('touch-enabled');
	}

	$('.nav_restart').click(function (){
		impress().goto(0);
	});

	impress().init();
})($);
