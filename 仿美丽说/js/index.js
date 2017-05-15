/*Document JavaScript of Index*/

$(document).ready(function(){

/* 每日精选 */
$('.menu_bar .list').hover(function(){
	$('.nav_list').eq($('.menu_bar .list').index(this)).show();
	$(this).css('border-right','1px solid transparent')
},function(){
	$('.nav_list').eq($('.menu_bar .list').index(this)).hide();
})


/* 轮播图 */
$(function(){
	var num = 0;
	var timer = null;
	var img_li = $('.banner li');
	var btn_li = $('.btn_list a');
	//按钮点击
	$('.prev').on('click',function(){
		num--;
		if (num < 0) {
			num = img_li.size() - 1;
		};
		play(num)
	});
	$('.next').on('click',function(){
		num++;
		if(num > img_li.size() - 1){
			num = 0;
		} 
		play(num);
	})
	//鼠标移入底部按钮、
	btn_li.on('mouseover',function(){
		num = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		img_li.eq(num).fadeIn().siblings().stop().fadeOut();
	})
	//自动轮播
	autoPlay();
	//鼠标移入 停止轮播
	$('.banner').hover(function(){
		$(this).find()
		clearInterval(timer);
	},function(){
		autoPlay(num);
	})
	function autoPlay(){
		timer = setInterval(function(){
			num++;
			if (num > img_li.size() - 1) {
				num = 0;
			};
			play(num)
		},3000)
	}
	/* 图片轮播 */
	function play(index){
		img_li.eq(index).fadeIn().siblings().stop().fadeOut();
		btn_li.eq(index).addClass('active').siblings().removeClass('active');
	}
})

/* Tab 切换 */
tab('.hifan .tab li','.hifan .tab_item');//Hi范儿
tab('.good .tab li','.good .tab_item');//好店
function tab(obj,cont){
	$(obj).on('click',function(){
		var _index = $(this).index();
		console.log(_index)
		$(this).addClass('active').siblings().removeClass('active');
		$(cont).eq(_index).show().siblings().hide();
	})
}

/* 好店关注 */
$('.good .item').hover(function(){
	$(this).find('.mask').stop().fadeIn();
},function(){
	$(this).find('.mask').stop().fadeOut();
})

$('.mask span').hover(function(){
	$(this).addClass('active').siblings().removeClass('active');
	if ($(this).hasClass('unadd')) {
		console.log(1)
		$(this).html('添加关注');
	}
},function(){
	$(this).removeClass('active');
	$(this).parent().find('.unadd').html('未关注');
})


/* 友情链接 */
$(function(){
	var a = 0;
	var timer1;
	friPlay();
	function friPlay(){
		var fri_li = $('.friend_link li');
		timer1 = setInterval(function(){
			a++;
			if (a > fri_li.length) {
				a = 0;
			}
			fri_li.eq(a).addClass('active').siblings().removeClass('active');
		},3000)
	};
	
	$('.friend_link').hover(function(){
		clearInterval(timer1)
	},function(){
		friPlay();
	})
})


/* End */
})
