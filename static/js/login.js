;(function(){
    function newGuid(){
        var guid = "";
        for (var i = 1; i <= 32; i++){
          var n = Math.floor(Math.random()*16.0).toString(16);
           guid +=    n;
          if((i==8)||(i==12)||(i==16)||(i==20))
             guid += "";
         }
        return guid;    
    }
    
    var Login = function(){
        
    }
    YLMF.addEvents(["login","logout","loginFail"]);
    //YLMF._extend(Login.prototype,YLMF.Observable);
    YLMF._extend(Login.prototype,{
        init : function(){
            var me = this;
            //输入提示
            PlaceHolder("#Login_User","#Login_User_p");
            PlaceHolder("#Login_Password","#Login_Password_p");
            
            //检查登陆
            this._114la_ssoid = Cookie.get("ssoid");
            if(this._114la_ssoid){
                var data={
                    status:0,
                    info:"",
                    data:{
                        user_id:Cookie.get("114uid"),
                        email:Cookie.get("114email"),
                        user_name:Cookie.get("114uname")?decodeURIComponent(Cookie.get("114uname")):Cookie.get("114uname"),
                        face: ""
                    }
                }
                this.Logined = true;
                YLMF.fireEvent("login",this,data.data);
            }else{
                var data={
                    status:14,
                    info:"请先登录",
                    data:null
                }
                this.Logined = false;
                YLMF.fireEvent("logout",this,data.data);
            }            
            
            $("#loginBtn").click(function(){
                me.doLogin();
            });
            $("#loginBoxClose").click(function(){
                me.hidePopup();
            });
            
            //输入提示开始
            var _userInp = $("#Login_User");
            //var _usUserLabel = $("#usUserLabel");
            var _emailList = $("#emailList");
            var mailDomainList = ["163.com", "sina.com", "qq.com", "126.com", "139.com", "gmail.com", "sohu.com"];
            var _curMailIndex = 0;
            var _usTimmer, _pasTimmer;
            var mailSel = false;
            var _pasInp = $("#Login_Password");
            
            _userInp.keydown(function(a){
                if(_emailList.css("display") == "block" && (a.keyCode == 38 || a.keyCode == 40 )){
                    a.preventDefault();
                }else{
                    if(a.keyCode == 13){
                        a.preventDefault();
                        if(_emailList.css("display") != "block"){
                            me.doLogin();
                            return;
                        }
                    }
                }
                
                _usTimmer = window.setTimeout(function() {
                    _usKeyDown(a)
                }, 10)
            });
            _userInp.blur(function(a) {
                window.clearTimeout(_usTimmer);
                _usTimmer = window.setTimeout(function() {
                    _emailList.hide();
                    //check the email
                    me.doCheckAccount();
                }, 10)
            }).focus(function(a) {
                _usTimmer = window.setTimeout(function() {
                    _usKeyDown(a);
                    $("#isUserExist").hide();
                }, 10)
            });
            
            function hideMailTip() {
                _emailList.hide()
            }
            function showMailTip() {}
            function isMailTipShow() {
                return _emailList.css("display") == "block"
            }
            function isNoTipSel() {
                return _emailList.find(".hv").size() != 1
            }
            function _usKeyDown(e){
                var _oVal = _userInp.val();
                var _val = $.trim(_oVal);
                var _atIndex = _oVal.indexOf("@");
                
                if(_oVal == ""){
                    $("#userClear").hide();
                }else{
                    $("#userClear").show();
                }
                $("#user_account_error").hide();
                
                if(_atIndex != -1){
                    var _mailName = _val.substring(0,_atIndex);
                    var _mailDomain = _val.substring(_atIndex+1);
                    if(isMailTipShow() && isNoTipSel() && (e.keyCode ==38 || e.keyCode == 40)){
                        _curMailIndex = 1;
                        _emailList.find("li").removeClass("hv").eq(_curMailIndex).addClass("hv");
                        return;
                    }else{
                        if(e.keyCode == 38 ){
                            //up
                            if(_curMailIndex == 1){
                                _curMailIndex = _emailList.find("li").size();
                            }
                            _emailList.find("li").removeClass("hv").eq(--_curMailIndex).addClass("hv");
                            mailSel = true;
                            return;
                        }else if(e.keyCode == 40){
                            //down
                             if(_curMailIndex == _emailList.find("li").size()){
                                _curMailIndex = 1;
                              }
                              _emailList.find("li").removeClass("hv").eq(++_curMailIndex).addClass("hv");
                              mailSel = true;
                              return;
                        }else if(e.keyCode == 13){
                            //enter
                            var selVal = _emailList.find(".hv").html();
                            if(!selVal || selVal == "")return;
                            _userInp.val(selVal);
                            hideMailTip();
                            return;
                        }
                    }
                    
                    var _resultList = [];
                    if(_mailDomain != ""){
                        $.each(mailDomainList,function(i,n){
                          if(n.substring(0,_mailDomain.length) == _mailDomain && n != _mailDomain){
                            _resultList.push(n);
                          }
                        });
                    }else{
                        _resultList = mailDomainList;
                    }
                    
                    if(_resultList.length > 0){
                        var mailListHtml = "<ul><li><h4>请选择邮箱类型</h4></li>";
                        $.each(_resultList,function(i,n){
                          mailListHtml += "<li>" + _mailName + "@" + n + "</li>";
                        });
                        mailListHtml += "</ul>";
                        _emailList.html(mailListHtml);
                        _emailList.show();
                    }else{
                        hideMailTip();
                    }
                }else{
                    hideMailTip();
                }
            }
            
            
            //邮箱提示点击
            _emailList.on("mousedown","li",function(eve){
                
                var selVal = $(this).html();
                if(selVal.indexOf("@")!= -1){
                    _userInp.val(selVal);
                    hideMailTip();
                }
                
                if(eve.preventDefault()){
                    eve.preventDefault();
                }
            });
            
            //清空用户名
            $("#userClear").mousedown(function(e){
                $(this).hide();
                $("#Login_User").val("");
                hideMailTip();
                if(e.preventDefault){
                    e.preventDefault();
                }
            });
            
            _pasInp.keydown(function(e){
                _pasTimmer = window.setTimeout(function(){
                  _PasKeyDown(e);
                    $("#user_pwd_error").hide();
                },10);
            });
            
            function _PasKeyDown(e){
                var _oVal = _pasInp.val();
                var _val = $.trim(_oVal);
                if(_oVal == ""){
                    $(pwdClear).hide();
                }else{
                    $(pwdClear).show();
                }
                if(e.keyCode == 13){
                  me.doLogin();
                }
            };
            
            $("#pwdClear").mousedown(function(e){
                _pasInp.val("");
                if(e.preventDefault){
                    e.preventDefault();
                }
                $(this).hide();
            });
            
            //点击登陆
            $("#showLoginBtn").click(function(){
                me.popUp();
            });
            
            //点击退出
            $("#topUserExit").click(function(){
                me.doLoginOut();
            });
        },
        popUp:function(){
            //init the login panel
            $("#loginBox").show();
        },
        hidePopup:function(){
            $("#loginBox").hide();
        },
        doLoginOut:function(){
            
            tongxun.Ajax.request("http://my.114la.com/api/index",{
                method : "GET",
                data:{
                    c : "api" ,
                    a : "logout" ,
                    appkey : "26a12af305d876a677aa",
                    callback : "YLMF.logout" 
                },
                success:function(res){
                    eval(res.responseText);
                }
            }); 
            
        },
        doLogin:function(){
            var account = $("#Login_User").val();
            var pwd = $("#Login_Password").val();
            if(account == ""){
                alert("请输入用户名");
                return;
            }else if(pwd == ""){
                alert("请输入密码");
                return;
            }
            var ssoext = newGuid();
            var ssopw = oofUtil.security.sha1(oofUtil.security.sha1(oofUtil.security.sha1(pwd) + oofUtil.security.sha1(account)) + ssoext.toUpperCase());
            var auto = $("#autoLogin").get(0).checked | 0;
            tongxun.Ajax.request("http://my.114la.com/api/index",{
                method : "POST",
                data:{
                    c : "api" ,
                    a : "ssologin" ,
                    appkey : "26a12af305d876a677aa",
                    callback : "YLMF.login" ,
                    ssoln : account,
                    ssopw : ssopw,
                    ssoent : "A1",
                    ssoext : ssoext,
                    auto : auto
                },
                success:function(res){
                    eval(res.responseText);
                }
            }); 
        },
        doCheckAccount:function(){
            //输入提示开始
            var _userInp = $("#Login_User");
            var account = _userInp.val();
            var _emailList = $("#emailList");
            tongxun.Ajax.request("http://my.114la.com/api/index",{
                method : "POST",
                data:{
                    c : "api" ,
                    a : "checkuserexists" ,
                    appkey : "26a12af305d876a677aa",
                    callback : "YLMF.checkAccount" ,
                    ssoln : account,
                    ssoent : "A1"
                },
                success:function(res){
                    eval(res.responseText);
                }
            });
            
            
        }
    });
    YLMF.checkAccount = function(data){
        
        var _userInp = $("#Login_User");
        if(_userInp.val() == "") return;
        if(_userInp.val() == data.data.ssoln){
            if(data.status == 0){
                $("#isUserExist").attr("class","hint-suc");
                $("#isUserExist").show();
                //账号存在
            }else{
                $("#isUserExist").attr("class","hint-err");
                $("#isUserExist").show();
                //账号不存在
            }
        }else{
            
        }
    }
    
    
    
    YLMF.login = function(data){
       
        if(data && data.status == 0){
            //alert(data.info);
            //登陆成功
            login.hidePopup();
            isLogined = true;
            YLMF.UID = data.user_id;
            YLMF.fireEvent("login",this,data.data);
            
        }else{
            //登陆失败
            //alert(data.info);
            YLMF.fireEvent("loginFail",this,data.data);
            //alert(data.info);
            if(data.status == 6){
                //账号不存在
                $("#user_account_error").show();
            }else if(data.status == 50){
                //密码错误
                $("#user_pwd_error").show();
            }
        }
    }
    
    YLMF.logout = function(data){
        //console.log(data);
        if(data){
            isLogined = false;
            YLMF.fireEvent("logout",this,data.data);
        }
        
    }
    
    
    YLMF.addListener({
        login : function(data){
            var _userName = data.user_name || data.email;
            //console.log(_userName);
            $("#topUserName").html(_userName).show();
            $("#topUserExit").show();
            $("#showLoginBtn").hide();
            
        },
        logout : function(){
            $("#showLoginBtn").show();
            $("#topUserExit").hide();
            $("#topUserName").hide();
        }
        
    });
    window.login = new Login();
    window.login.init();
})();