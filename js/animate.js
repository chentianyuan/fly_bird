$(function(){
	
	var begin = $("#begin");
	var wrap = $(".content");
	var sorce = $("#history");
	var til = $(".content h1");
	var foot = $(".btn-list");
	
	begin.click(function(){
		til.animate({
			margin:'-20px 0 0 0',
			opacity:'0'
		});
		foot.animate({
			margin:'130% 0 0 0'
		});
	});
	
});

