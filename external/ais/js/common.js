$(document).ready(function(){
	// ScrollTop Check
	var scrollTopTarget;
	if(navigator.userAgent.match("Chrome")){
		scrollTopTarget = $("body");
	}else{
		scrollTopTarget = $("html, body");
	}

	// Original Background Position Return
	var backgroundPositionX, backgroundPositionY;
	function backgroundPosition(target, xy){
		var pos;
		if(navigator.userAgent.match("Chrome")){
			if(xy == "x"){
				pos = target.css("background-positionX");
			}else if(xy == "y"){
				pos = target.css("background-positionY");
			}
		}else{
			if(xy == "x"){
				pos = target.css("background-position").split(" ")[0];
			}else if(xy == "y"){
				pos = target.css("background-position").split(" ")[1];
			}
		}
		return pos;
	}

	// GNB(Complete)
	var gnbActive = -1;
	var gnbMotionTime = 1000;
	function gnbActiveFunction(num){
		for(var i=0; i<$("#header .menu").length; i++){
			var posX = backgroundPosition($("#header .menu:eq(" + i + ")"), "x");
			if(i == num){
				$("#header .menu:eq(" + i + ")").css({"background-position":posX + " 0px"});
			}else{
				$("#header .menu:eq(" + i + ")").css({"background-position":posX + " -90px"});
			}
		}
	}
	
	$("#header .logo").bind("click", function(){
		gnbActive = -1;
		$("html, body").stop().animate({"scrollTop":0}, gnbMotionTime, "easeInOutQuart");
	});
	
	$("#header .menu").each(function(n){
		$(this).bind("click", function(e){
			e.preventDefault();
			gnbActive = n;
			var scrollTop = 0;
			switch (n){
				case 0 : scrollTop = $("#introduction").position().top - $("#header").height(); break;
				case 1 : scrollTop = $("#screenshot").position().top - $("#header").height(); break;
				case 2 : scrollTop = $("#video").position().top - $("#header").height(); break;
				case 3 : scrollTop = $("#download").position().top - $("#header").height(); break;
			}
			$("html, body").stop().animate({"scrollTop":scrollTop}, gnbMotionTime, "easeInOutQuart")
		});
	});

	// Visual(Complete)
	var visualActive = 0;
	var visualWidth, visualLength;

	//Introduction
	var lobbyActive = 0;
	var lobbyWidth, lobbyLength;

	var ingameActive = 0;
	var ingameWidth, ingameLength;

	//Screenshot(Complete)
	function screenshotFunction(num, time){
		for(var i=0; i<$("#screenshot .screenbtn").length; i++){
			var posX = backgroundPosition($("#screenshot .screenbtn" + i), "x");
			if(i == num){
				$("#screenshot .screenbtn" + i).css({"background-position":posX + " 0px"});
			}else{
				$("#screenshot .screenbtn" + i).css({"background-position":posX + " 132px"});
			}
		}
		$("#screenshot .imglist:eq(" + num + ")").fadeIn(time).siblings().fadeOut(time);
	}
	screenshotFunction(0, 0);
	
	$("#screenshot .screenbtnlist").not("#screenshot .screenbtnlist:last-child").css({"margin-right":"3px"});
	var controlsetWidth = $("#screenshot .screenbtnlist").outerWidth(true) * $("#screenshot .screenbtnlist").length - 3;
	$("#screenshot .screenbtnset").css({"width":controlsetWidth, "margin-left":-(controlsetWidth/2)});
	$("#screenshot .screenbtn").each(function(n){
		$(this).bind("click", function(){
			screenshotFunction(n, 600);
		});
	});

	//Video(Complete)
	var videoID = $("#video .thumb:eq(0)").attr("href").split("/")[3];
	$("#video .thumb").each(function(n){
		$(this).bind("click", function(e){
			e.preventDefault();
			videoID = $(this).attr("href").split("/")[3];
			$("#video .movieimg").attr("src","img/video_img" + (n + 1) + ".jpg");
		});
	});

	$("#video .movie").bind("click", function(){
		if (navigator.userAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
			location.href = "http://youtu.be/" + videoID;
		}else{
			$("#layerpop .movie").append("<iframe class='youtube' width=80% height=80% src='//www.youtube.com/embed/" + videoID + "?rel=0' frameborder='0' allowfullscreen></iframe>");
			$("#layerpop").fadeIn();
		}
	});

	$("#layerpop").bind("click", function(){
		$("#layerpop .movie").empty();
		$(this).fadeOut();
	});

	//Swipe Function
	function swipeFunction(target, active, width, length, control){
		function moveFunction(time, ease){
			$(target).stop().animate({"left":active * -width}, time, ease);
			$(control+":eq(" + active + ")").css({"background-position":"0px 0px"}).parent().siblings().find(".control").css({"background-position":"0px 15px"});
			if(target == "#introduction .lobby .imgset"){
				$("#introduction .lobby .desc li:eq(" + active + ")").show().siblings().hide();
			}
		}
		moveFunction(0, "linear");

		$(target)
		.bind("movestart", function(e){
			if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)){
				e.preventDefault();
			}
		})
		.bind("move", function(e){
			var left = (e.distX / width * 100) - (active * 100);
			if(e.distX < 0){
				if(active == length - 1){
					$(this).css({"left":((((length - 1) * 100) + left) / 5) - ((length - 1) * 100) + "%"});
				}else{
					$(this).css({"left":left + "%"});
				}
			}
			if(e.distX > 0){
				if(active == 0){
					$(this).css({"left":left/5 + "%"});
				}else{
					$(this).css({"left":left + "%"});
				}
			}
		})
		.bind("moveend", function(e){
			var posX = $(this).position().left;
			for (var i=0; i<length; i++){
				if(posX < -width / 2 - (width * (i - 1)) && posX >= -width / 2 - (width * i)){
					active = i;
					break;
				}
			}
			moveFunction(300, "swing");
		});

		$(control+"list").not(control+"list:last-child").css({"margin-right":"20px"});
		var controlsetWidth = $(control+"list").outerWidth(true) * $(control+"list").length - 20;
		$(control+"set").css({"width":controlsetWidth, "margin-left":-(controlsetWidth/2)});
		$(control).each(function(n){
			$(this).bind("click", function(){
				active = n;
				moveFunction(1000, "easeInOutQuart");
			});
		});
	}

	//Window
	$(window)
	.bind("resize", function(){
		visualWidth = $("#visual .swipe").width();
		visualLength = $("#visual .imglist").css({"width":visualWidth}).length;
		$("#visual .imgset").css({"width":visualWidth * visualLength, "left":visualActive * -visualWidth});

		lobbyWidth = $("#introduction .lobby .swipe").width();
		lobbyLength = $("#introduction .lobby .imglist").css({"width":lobbyWidth}).length;
		$("#introduction .lobby .imgset").css({"width":lobbyWidth * lobbyLength, "left":lobbyActive * -lobbyWidth});

		ingameWidth = $("#introduction .ingame .swipe").width();
		ingameLength = $("#introduction .ingame .imglist").css({"width":ingameWidth}).length;
		$("#introduction .ingame .imgset").css({"width":ingameWidth * ingameLength, "left":ingameActive * -ingameWidth});

		swipeFunction("#visual .imgset", visualActive, visualWidth, visualLength, "#visual .control");
		swipeFunction("#introduction .lobby .imgset", lobbyActive, lobbyWidth, lobbyLength, "#introduction .lobby .control");
		swipeFunction("#introduction .ingame .imgset", ingameActive, ingameWidth, ingameLength, "#introduction .ingame .control");
	}).trigger("resize")

	.bind("scroll", function(){
		var scrollPosition = scrollTopTarget.scrollTop();
		if(scrollPosition >= 0 && scrollPosition < $("#introduction").offset().top - $("#header").height()){
			gnbActive = -1;
		}else if(scrollPosition >= $("#introduction").offset().top - $("#header").height() && scrollPosition < $("#screenshot").offset().top - $("#header").height()){
			gnbActive = 0;
		}else if(scrollPosition >= $("#screenshot").offset().top - $("#header").height() && scrollPosition < $("#video").offset().top - $("#header").height()){
			gnbActive = 1;
		}else if(scrollPosition >= $("#video").offset().top - $("#header").height() && scrollPosition < $("#download").offset().top - $("#header").height()){
			gnbActive = 2;
		}else{
			gnbActive = 3;
		}
		gnbActiveFunction(gnbActive);
	});
});