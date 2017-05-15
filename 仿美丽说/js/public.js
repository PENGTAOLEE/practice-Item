/* 公共方法 */

$(function($){
	//弹出菜单
	show('.download','.qrcode_mls');
	show('.drop','.down');

	/* 宝贝/店铺切换 */
	$('.search_tab span').on('click',function(){
		$(this).addClass('active').siblings().removeClass();
	})

	/* 侧边栏 */
	$(document).on('mousemove',function(ev){
		if (ev.pageX >= $(document.body).width() - 38) {
			$('.side_bar').show('slow');
		} else {
			$('.side_bar').hide('slow');
		}
	});
	//返回顶部
	$('.to_top').hover(function(){
		$('.icon_top').hide();
		$('.text_top').html('返回顶部');
	},function(){
		$('.icon_top').show();
		$('.text_top').html('')
	})
	$('.to_top').on('click',function(){
		if ($(document.body)) {
			var oBody = $('htm');
		} else if ($(document.documentElement)) {
			var oBody = $(document.documentElement);
		}
		$(document.body).animate({scrollTop:0},'slow'); // 标准
		$(document.documentElement).animate({scrollTop:0},'slow'); // IE
		return false;
	})


	/* 吸顶导航 */
	$(window).scroll(function(){
		if ($(this).scrollTop() > 150) {
			$('#nav>ul').css({
				'position':'fixed',
				'top':'0',
				'zIndex': '99'
			});
		} else {
			$('#nav>ul').css({
				'position':'static'
			})
		}
	})




	/* 显示隐藏 */
	function show(obj,box) {
		var index;
		$(obj).hover(function(){
			index = $(obj).index(this)
			$(box).eq(index).stop().slideDown(300)
		},function(){
			$(box).eq(index).stop().slideUp(300);
		})
	}
})

/*

*/

