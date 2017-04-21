/*
 	在游戏右部创建不断左移的方块，并判断不断判断是否与小鸟相撞
 	小鸟，方块皆为absolute元素
 */

$(function(){
	
	var begin = $("#begin");
	var sorce = $("#history");//着手分数
	var til = $(".content h1");
	var foot = $(".btn-list");
	
	begin.click(function(){
		setTimeout(gameBegin,500);//不能写gameBegin()，因为直接gameBegin()等于写入的是一个返回值，函数已经默认执行完毕
	});

	//重新开始
	$(".gameover .new").click(function(){
		$(".Block").remove();
		$(".brid").remove();
		$(".gameover").css("display","none");
		$(".score").remove();
		gameBegin();
	});
	
});

function gameBegin(){
	var fly = null;
	var game_map = null;
	var ing = null; 
	var wrap = $(".content");
	var speed = 2;
	var timer = 0;
	wrap.append("<div class='brid'></div>");
	wrap.append("<h3 class='score'>0</h3>");
	
		//首先监听键盘事件	
		$(document).keydown(function(event){
			event.preventDefault();//阻止浏览器默认行为
			if(event.keyCode == 38){
				speed = -10;
			}
		});
		
		$(window).click(function(){
			speed = -10;
		});
	
		//正常小鸟飞行
		fly = setInterval(function(){
			var Top = $(".brid").position().top;//相比$(".brid").css("top");这个得到的是250px，而我们要用的是250
			Top += speed;
			speed = speed + 1;
			if(Top < 0){
				//到达顶部时，刷新重力加速度
				$(".brid").css("top",0);
				speed = 2;
			}else{
				$(".brid").css("top",Top + 'px');
			}
			//console.log(speed);
		},50);
	
	//监听有没有与底部碰触
		ing = setInterval(function(){
				if(isgameOver(fly)){
					clearInterval(fly);
					clearInterval(game_map);
					clearInterval(ing);//若触碰则清除此定时器
				}
		},10);
		
	//生成游戏界面	
		game_map = setInterval(function(){
			if(!isgameOver(fly)){
				generateBlock(timer,fly,game_map);
				//方块生成次数加一次只有成功生成后才算一次		
				timer++;
				//控制方块移动
			}
		},3000);
		
}

/*function isgameover(){
	
}*/

//生成障碍物
function generateBlock(timer,fly,game_map){
	var m = Math.floor(Math.random()*10);
	var a = [];
	for(var i = 0 ; i < 100 ; i++){
		a[i] = null;
	}
		m = m % 5 + 2;//生成2-6的随机数
		for(var i = 0 ; i < m ; i++){
			$(".content").append("<div class='Block'></div>");
			setTop(i,1,timer);
		}
		for(var i = m + 2 ; i < 9 ; i++){
			$(".content").append("<div class='Block'></div>");
			setTop(i-2,2,timer);
		}
		//$(".Block").animate({left:'-50px'},3000);
		//这个定时器可以使用这个函数内的全局变量m
		//控制障碍物的移动
		a[timer] = setInterval(function(){
			//定时器数组，每一列障碍物都由一个定时器控制
			var move = -1;
			var Left = $(".Block").eq(timer*7).position().left;
			if(Left <= 70 && Left >= -10){
				var bird_top = $(".brid").position().top;
				if(bird_top <= m * 55 || bird_top >= m*55+75 || bird_top >= 460){
					clearInterval(fly);
					clearInterval(game_map);
					clearInterval(a[timer]);//碰撞后删除
					$(".gameover").fadeIn();
					var s = $(".score").text();
 					$(".gameover h3").text("您的得分为 "+ s +" 分");
					$(".score").remove();
				}
			}
			Left += move;//方块移动
			$(".Block").eq(timer*7).css("left",Left + 'px');
			$(".Block").eq(timer*7+1).css("left",Left + 'px');
			$(".Block").eq(timer*7+2).css("left",Left + 'px');
			$(".Block").eq(timer*7+3).css("left",Left + 'px');
			$(".Block").eq(timer*7+4).css("left",Left + 'px');
			$(".Block").eq(timer*7+5).css("left",Left + 'px');
			$(".Block").eq(timer*7+6).css("left",Left + 'px');
			if(Left < -50){
				//清除冗余方块
			$(".Block").eq(timer*7).hide();
			$(".Block").eq(timer*7+1).hide();
			$(".Block").eq(timer*7+2).hide();
			$(".Block").eq(timer*7+3).hide();
			$(".Block").eq(timer*7+4).hide();
			$(".Block").eq(timer*7+5).hide();
			$(".Block").eq(timer*7+6).hide();
			clearInterval(a[timer]);//着手分数
			}
			if(Left == -20){
				var x = $(".score").text();
				x = parseInt(x);
				x += 1;
				$(".score").text(x);
			}
		},10);
		
		//游戏重新开始时，删除所有定时器
		$(".gameover").click(function(){
			for(var i = 0 ; i < 100 ; i++){
				clearInterval(a[i]);
			}
		});
}

//设置障碍物top值
function setTop(i,k,t){
	var x = i + t*7;
	if(k==1){
		$(".Block").eq(x).css("top",i*55 + 5 + 'px');
	}else if(k==2){
		$(".Block").eq(x).css("top",(i+2)*55 + 5 + 'px');
	}
}

//判断游戏是否结束
function isgameOver(fly){
 	var cicle_top = $(".brid").position().top;
 	if(cicle_top >= 460){
 		clearInterval(fly);
 		$(".brid").css("top","460px");
 		$(".gameover").fadeIn();
 		var s = $(".score").text();
 		$(".gameover h3").text("您的得分为 "+ s +" 分");
		$(".score").remove();
 		return true;
 	}else
 		return false;
}
