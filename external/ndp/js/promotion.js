var $window = $(window);
var $body = $("body");
var $overview = $(".overview");
var windowHeight, scrollTop;

$(".show").on("click", function(e) {
	e.preventDefault();
	$body.animate({scrollTop: Math.round($($(this).attr("href")).offset().top)});
});

$window.on({
	scroll: function() {
		scrollTop = $(this).scrollTop();
		var check = scrollTop + windowHeight - 50;
		$overview.each(function(n) {
			if(check >= $(this).offset().top) $overview.eq(n).addClass("on");
		});
	},
	resize: function() {
		windowHeight = $window.height();
	}
}).trigger("resize").trigger("scroll");