/* Document JavaScript of List */

$(document).ready(function(){
/* 筛选 */
	$('.group_box .item_row').css({"height":"38"}) //在行内设置高度
	//更多筛选
	var onOff = false;
	$('.more_filter').on('click',function(){
		if (!onOff) {
			$('.inner_box').css({"height":"auto"});
			$(this).find('.more').html("收起筛选" + "<i class='arrow_up'></i>");
		} else {
			$('.inner_box').css({"height":"156"});
			$(this).find('.more').html("更多筛选" + "<i class='arrow_down'></i>");
		}
		onOff = !onOff;
	})
	//更多按钮
	var _this;
	var _that;
	$('.right_btn .more').on('click',function(){
		_this = $(this).parent().parent();
		_that = _this.siblings().find('.right_btn .more');
		if (!$(this).data('onOff') || $(this).data('onOff') == 'false') {
			_that.html("更多" + "<i class='arrow_down'></i>");
			$(this).html("收起" + "<i class='arrow_up'></i>");
			_this.css({"height":"auto"}).siblings().css({"height":"40"});
			_that.data("onOff","false");
			$(this).data("onOff","true");
			//清除所有选中框
			$('.icon_block').css({"display":"none"});
			//把所有选中框自定义属性设置为false
			$('.item_row a').data("isSele","false");
			//显示多选按钮
			$('.right_btn .multiselect').show();

		} else {
			$(this).html("更多" + "<i class='arrow_down'></i>");
			_this.css({"height":"40"});
			$(this).data("onOff","false");
			$('.right_btn .multiselect').show();
			_this.find('.icon_block').css({"display":"none"});
		};
		//隐藏提交和取消按钮;
		_this.find(".ensure").hide();
	})
	//多选按钮
	$('.right_btn .multiselect').on('click',function(){
		//变量
		_this = $(this).parent().parent();
		_that = _this.siblings().find('.right_btn .multiselect');
		_this.css({"height":"auto"}).siblings().css({"height":"40"});
		//其他组自定义属性设置为false
		_that.data("onOff","false");
		$(this).data("onOff","true");
		//其他组多选按钮显示
		$('.right_btn .multiselect').show();
		$(this).hide();
		_this.siblings().find('.icon_block').css({"display":"none"}); //其他组选框移除
		_this.find('.icon_block').css({"display":"block"});
		//其他选中按钮取消
		$('.item_row a').find('.icon_block').removeClass("select");
		submit_check = false;
		$('.confirm').removeClass('active');
		//显示提交和取消按钮;
		_this.find(".ensure").show();

		$(this).data('onOff')


	})
	//取消按钮
	$('.ensure .cancel').on('click',function(){
		$('.right_btn .multiselect').show();
		_this.css({"height":"40"});
		$(this).data("onOff","false");
		_this.find('.icon_block').css({"display":"none"});
		$('.confirm').removeClass('active');
		//点击取消，移除勾选效果
		$('.item_row a').find('.icon_block').removeClass("select");
	})

	/*======================== 点击标签 ========================*/
		$('.item_row a').on('click',function(){
			/* 只有在点击了多选按钮之后才可以点击 */

			if ($(this).data("isSele")  == 'true') {
				$(this).find('.icon_block').removeClass("select");
				$(this).data("isSele","false");
			} else {
				$(this).find('.icon_block').addClass('select');
				$(this).data("isSele","true");
			};

			//如果有一个标签选中，提交按钮就被选中
			submit_check = false; // 每次点击都把该属性设置为false
			$(this).parent().find('a').each(function(index,item){
				if ($(item).data("isSele") == 'true') {
					submit_check = true;
				}	
			})
			//根据submit_check值判断提交按钮的状态
			if (submit_check == true) {
				$(this).parent().next().find('.confirm').addClass('active');
			} else {
				$(this).parent().next().find('.confirm').removeClass('active');
			}

		})
	/*==========================提交选中按钮到面包屑================================*/

	//点击提交
	$('.confirm').on('click',function(){
		/* 
			找出选中的标签，然后添加到导航中
		*/
		var tagItem = document.createElement('a');
		$(tagItem).addClass('tag_item');
		var iSpan = document.createElement('span');
		$(iSpan).addClass('icon_x');
		var html = '';
		$(this).parent().parent().find('.icon_block').each(function(index,item){
			if ($(item).hasClass('select') ) {
				var spanText = document.createElement('span');
				html = $.trim($(this).parent().text());
				$(spanText).html(html);
				$(spanText).appendTo($(tagItem));
				$(iSpan).appendTo($(tagItem));
				$('.bread_crumbs .total_l').before(tagItem); //添加到面包屑
			} else {
				console.log('请选择标签')
			}
			
		});
		//清空选中 以及  提交样式  自定义属性
		$('.item_row a').find('.icon_block').removeClass("select");
		$('.item_row a').data("isSele","false");
		submit_check = false;
		$('.confirm').removeClass('active');
		
	});

	/*=======================点击面包屑标签删除=======================*/
	$('.bread_crumbs .tag_item').on('click',function(){
		$(this).detach();
	})




/* End */

})
