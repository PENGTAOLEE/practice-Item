/* Document JavaScript of Reigster */
$(function($){
	
	/*===================获取焦点时触发======================*/
	$('.login_list input').focus(function(){
		$('.login_list input').removeClass('active')
		$(this).addClass('active');
	})
	/*==================失去焦点时触发======================*/
	//用户名
	$("#username").blur(function(){
		validate( $(this) )
	})
	//手机号
	$("#phone").blur(function(){
		validate( $(this) );
	})
	//密码
	$("#password").blur(function(){
		validate( $(this) );
	})
	//确认密码
	$("#repassword").blur(function(){
		validate( $(this) );
	})

	//提交注册
	var nf = true;
	$('input[type="submit"]').click(function(){
		nf = true;
		$vers = $('.login_list').find('input');
		for (var i = 0; i < $vers.length; i++) {
			if (!$vers.eq(i).data('onOff')) {//如果自定义属性为false
				showError($vers.eq(i));
				$vers.eq(i).css("backgroundColor","#fcfcd6");
				nf = false;
			} else{
				$vers.eq(i).css("backgroundColor","#fff");
			}
		}
		// return false;
		return nf;
	})

	/* 如果出错 */
	function showError($obj){
		$obj.parent().find('.msg_err').fadeIn();
		$obj.parent().find('.msg_tip').fadeIn();
	}
	/* 如果通过 */
	function showSuccess($obj) {
		$obj.parent().find('.msg_err').removeClass('msg_err').addClass('msg_success').fadeIn();
	}

	//注册函数 - 验证
	function validate( obj ) {
		var sVal = obj.attr("name");
		obj.parent().find('.msg_err').css({"display":"none"})
		obj.parent().find('.msg_tip').css({"display":"none"})
		if (obj.val() == "") {
			obj.data("onOff",false);
			showError(obj);
			return;
		}

      /*=====验证输入=====*/
		if (sVal == "username") {
			if (!isUser(obj.val())) {
				obj.data("onOff",false);
				obj.parent().find('.msg_tip').html("用户名格式不对");
				showError(obj);
				return;
			}
			showSuccess(obj);
		}

		if (sVal == "phone") {
			/* 如果输入内容格式不正确 */
			if (!isPhone(obj.val())) {
				obj.data("onOff",false);
				obj.parent().find('.msg_tip').html("手机号格式不对")
				showError(obj);
				return;
			}
			showSuccess(obj);
		}

		if (sVal == "password") {
			if (!isPassWord(obj.val())) {
				obj.data('onOff',false);
				obj.parent().find('.msg_tip').html("密码为3-20位字母或数字的组合");
				showError(obj);
			} else {
				obj.data('onOff',true);
				showSuccess(obj);
			}
		}

		if (obj.val() !== $('#password').val() && sVal == 'repassword') {
			obj.data("onOff",false);
			obj.parent().find('.msg_tip').html("两次密码不一致")
			showError(obj);
		} else {
			obj.data("onOff",true);
			showSuccess(obj);
		}
	}

	//用户名
	function isUser(aUser){
		var bValidata = RegExp(/^\w{3,20}/).test(aUser)
		if (bValidata) {
			return true;
		} else {
			return false;
		}
	}

	// 密码
	function isPassWord(passWord){
		var bValidata = RegExp(/^\w{3,20}/).test(passWord)
		if (bValidata) {
			return true;
		} else {
			return false;
		}
	}
	//邮箱
	function isEmail(aEmail) {
		var bValidata =  RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(aEmail);
		if (bValidata) {
			return true;
		} else {
			return false;
		}
	}

	//手机号
	function isPhone(aPhone){
		var bValidata = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone);
		if (bValidata) {
			return true;
		} else {
			return false;
		}
	}




	/*=======点击更多========*/
	$('.more_login h4').click(function(){
		$('.more_login ul').toggle();
	})
	
	/* End */
})