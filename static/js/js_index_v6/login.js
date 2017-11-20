;(function () {
    if(!window.Cookie) {
        window.Cookie = {
            set: function (name, value, expires, path, domain) {
                if (typeof expires == "undefined") {
                    expires = new Date(new Date().getTime() + 1000 * 3600 * 24 * 365);
                }
                document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");
            },
            get: function (name) {
                var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null) {
                    return unescape(arr[2]);
                }
                return null;
            },
            clear: function (name, path, domain) {
                if (this.get(name)) {
                    document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
                }
            }
        };
    }
})();

(function() {
    window.YLMF = window.YLMF || {};
    YLMF.namespace = function(c) {
        if (!c || !c.length) {
            return null
        }
        var d = c.split(".");
        var b = YLMF;
        for (var a = (d[0] == "YLMF") ? 1 : 0; a < d.length; ++a) {
            b[d[a]] = b[d[a]] || {};
            b = b[d[a]]
        }
        return b
    };
    //继承
    YLMF.extend = function(a, c) {
        var b = function() {};
        b.prototype = c.prototype;
        a.prototype = new b();
        a.prototype.constructor = a;
        a.superclass = c.prototype;
        if (c.prototype.constructor == Object.prototype.constructor) {
            c.prototype.constructor = c
        }
    };
    YLMF.contains = function(a, b) {
        return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
    }
    //浅拷贝
    YLMF._extend = function(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }
    YLMF.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    YLMF.isObject = function(a) {
        return !! a && Object.prototype.toString.call(a) === "[object Object]";
    };

    YLMF.each = function(objArray, funName) {
        if (YLMF.isArray(objArray)) {
            var l = objArray.length;
            for (var i = 0; i < l; i++) {
                funName(i, objArray[i]);
            }
        }
    };
    YLMF._extend(YLMF, {
        trim: function(str) {
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
        ajax: function(b, a, f) {
            var c = (YLMF.xhrs = YLMF.xhrs || {});
            f.dataType = f.dataType || "html";
            if (b) {
                try {
                    c[b] && c[b].abort()
                } catch(d) {}
                c[b] = $.ajax(a, f)
            } else {
                $.ajax(a, f)
            }
        },
        loadScript: function(config) {
            if (!config || !config.src) return;
            var doc = document;
            var Head = doc.getElementsByTagName('head')[0],
            Script = doc.createElement('script');
            Script.onload = Script.onreadystatechange = function() {
                if (Script && Script.readyState && Script.readyState != 'loaded' && Script.readyState != 'complete') return;
                Script.onload = Script.onreadystatechange = Script.onerror = null;
                Script.Src = '';
                if (!doc.all) {
                    Script.parentNode.removeChild(Script);
                }
                Script = null;
                config.callback && config.callback();
            };
            Script.src = config.src;
            Script.charset = config.charset || 'gb2312';
            Head.insertBefore(Script, Head.firstChild);
            return Script;
        },
        deferTimmer: {},
        //e is time ,b is name,a is fun
        defer: function(b, a, e, d, c) {
            e = e || 500;
            d = d || window;
            c = c || [];
            if (b) {
                this.cancelDefer(b);
                this.deferTimmer[b] = window.setTimeout(function() {
                    a.apply(d, c)
                },
                e)
            } else {
                window.setTimeout(function() {
                    a.apply(d, c)
                },
                e)
            }
        },
        cancelDefer: function(a) {
            window.clearTimeout(this.deferTimmer[a])
        },
        getEvent: function(b) {
            var a = b || window.event;
            if (!a) {
                var d = this.getEvent.caller;
                while (d) {
                    a = d.arguments[0];
                    if (a && (Event == a.constructor || MouseEvent == a.constructor)) {
                        break
                    }
                    d = d.caller
                }
            }
            return a
        },
        getEventTarget: function(a) {
            a = a || window.event;
            return a.target || a.srcElement
        },
        some: function(b, c) {
            if (b.some) {
                return b.some(c)
            }
            var a = b.length;
            if (typeof c != "function") {
                throw new TypeError()
            }
            for (var d = 0; d < a; d++) {
                if (d in b && c.call(c, b[d], d, b)) {
                    return true
                }
            }
            return false
        },
        getImg: function(c) {
            var a = new Image();
            this.img = a;
            var b = navigator.appName.toLowerCase();
            if (b.indexOf("netscape") == -1) {
                a.onreadystatechange = function() {
                    if (a.readyState == "complete") {
                        c(a)
                    }
                }
            } else {
                a.onload = function() {
                    if (a.complete == true) {
                        c(a)
                    }
                }
            }
        },
        imgResize: function(c, b, a) {
            if ($.browser.msie && $.browser.version == "6.0") {
                if (c.width == 0) {
                    return
                }
                if ((c.width / c.height) > (b / a)) {
                    c.width = b
                } else {
                    c.height = a
                }
            }
        }
    });
    YLMF.getImg.prototype.get = function(a) {
        this.img.src = a
    };
    YLMF.namespace("Observable");
    YLMF._extend(YLMF.Observable, {
        addEvents: function(a) {
            if (YLMF.isObject(a)) {
                for (var c in a) {
                    this.addEvents(c)
                }
            } else {
                if (typeof a == "string") {
                    this.addEvent(a);
                } else {
                    if (YLMF.isArray(a)) {
                        for (var b = 0; b < a.length; b++) {
                            this.addEvent(a[b])
                        }
                    }
                }
            }
        },
        addEvent: function(a) {
            if (typeof a == "string") {
                this.events = this.events || {};
                this.events[a] = []
            }
        },
        fireEvents: function(c, a) {
            this.fireEvent(c, a);
        },
        fireEvent: function(c, a) {
            if (typeof c == "string") {
                var b = Array.prototype.slice.call(arguments);;
                this.events && YLMF.each(this.events[c],
                function(d, e) {
                    e.apply(a || this, b.slice(2) || [])
                })
            }
        },
        addListener: function(b, c) {
            if (YLMF.isObject(b)) {
                for (var a in b) {
                    this.events && this.events[a].push(b[a]);
                }
            } else if (typeof b == "string") {
                this.events && this.events[b].push(c);
            }
        },
        removeEvents: function(a) {
            if (YLMF.isObject(a)) {
                for (var b in a) {
                    this.removeEvents(b)
                }
            } else {
                if (typeof a == "STRING") {
                    this.events = this.events || {};
                    delete this.events[a]
                }
            }
        },
        removeListener: function(b) {
            for (var a in b) {
                this.events && (this.events[a] = YLMF.grep(this.events[a],
                function(d, c) {
                    return d != b[a]
                }))
            }
        },
        on: function(b, c) {
            this.addListener(b, c);
        },
        grep: function(a, b, c) {
            var d = [],
            e;
            c = !!c;
            for (var f = 0,
            g = a.length; f < g; f++) e = !!b(a[f], f),
            c !== e && d.push(a[f]);
            return d;
        }
    });
    YLMF._extend(YLMF, YLMF.Observable);
})();
function PlaceHolder(input, label) {
    input = $(input);
    label = $(label);
    input.focus(function() {
        label.hide();
    });
    input.blur(function() {
        if ($.trim(input.val()) == "") {
            label.show();
        }
    });
    if (!label.is("label")) {
        label.mousedown(function() {
            input.focus();
        });
    }

    $(function() {
        window.setTimeout(function() {
            if ($.trim(input.val()) != "") {
                label.hide();
            }
        },
        100);
    });
}

(function() {
    function newGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "";
        }
        return guid;
    }

    var Login = function() {
    }
    YLMF.addEvents(["login", "logout", "loginFail"]);
    //YLMF._extend(Login.prototype,YLMF.Observable);
    YLMF._extend(Login.prototype, {
        init: function() {
            var me = this;
            var _preUsename = Cookie.get("preUser");
            if (_preUsename) {
                $("#Login_User").val(_preUsename);
            }

            //输入提示
            PlaceHolder("#Login_User", "#Login_User_p");
            PlaceHolder("#Login_Password", "#Login_Password_p");

            //检查登陆
            this._114la_ssoid = Cookie.get("ssoid");
            if (this._114la_ssoid) {
                var data = {
                    status: 0,
                    info: "",
                    data: {
                        user_id: Cookie.get("114uid"),
                        email: Cookie.get("114email"),
                        nickname: Cookie.get("114uname") ? decodeURIComponent(Cookie.get("114uname")) : Cookie.get("114uname"),
                        face: ""
                    }
                }
                this.Logined = true;
                YLMF.fireEvent("login", this, data.data);
            } else {
                var data = {
                    status: 14,
                    info: "请先登录",
                    data: null
                }
                this.Logined = false;
                YLMF.fireEvent("logout", this, data.data);
            }

            $("#loginBtn").bind('click',function() {
                me.doLogin();
            });
            $("#loginBoxClose").bind('click',function() {
                me.hidePopup();
            });

            //输入提示开始
            var _userInp = $("#Login_User");
            //var _usUserLabel = $("#usUserLabel");
            var _emailList = $("#emailList");
            var mailDomainList = ["163.com", "sina.com", "qq.com", "126.com", "139.com", "gmail.com", "sohu.com"];
            var _curMailIndex = 1;
            var _usTimmer, _pasTimmer;
            var mailSel = false;
            var _pasInp = $("#Login_Password");

            _userInp.keydown(function(a) {
                if (_emailList.css("display") == "block" && (a.keyCode == 38 || a.keyCode == 40)) {
                    a.preventDefault();
                } else {
                    if (a.keyCode == 13) {
                        a.preventDefault();
                        if (_emailList.css("display") != "block") {
                            me.doLogin();
                            return;
                        }
                    }
                }
                _usTimmer = window.setTimeout(function() {
                    _usKeyDown(a)
                },
                10)
            });
            _userInp.blur(function(a) {
                window.clearTimeout(_usTimmer);
                _usTimmer = window.setTimeout(function() {
                    _emailList.hide();
                    //check the email
                    me.doCheckAccount();
                },
                10)
            }).focus(function(a) {
                _usTimmer = window.setTimeout(function() {
                    _usKeyDown(a);
                    $("#isUserExist").hide();
                },
                10)
            });
            var hideMailTip = function() {
                _emailList.hide()
            }
            var showMailTip = function() {}
            var isMailTipShow = function() {
                return _emailList.css("display") == "block"
            }
            var isNoTipSel = function() {
                return _emailList.find(".hv").size() != 1
            }
            var _usKeyDown = function(e) {
                var _oVal = _userInp.val();
                var _val = $.trim(_oVal);
                var _atIndex = _oVal.indexOf("@");

                if (_oVal == "") {
                    $("#userClear").hide();
                } else {
                    $("#userClear").show();
                }
                $("#user_account_error").hide();

                if (_atIndex != -1) {
                    var _mailName = _val.substring(0, _atIndex);
                    var _mailDomain = _val.substring(_atIndex + 1);
                    if (isMailTipShow() && isNoTipSel() && (e.keyCode == 38 || e.keyCode == 40)) {
                        _curMailIndex = 1;
                        _emailList.find("li").removeClass("hv").eq(_curMailIndex).addClass("hv");
                        return;
                    } else {
                        if (e.keyCode == 38) {
                            //up
                            if (_curMailIndex == 1) {
                                _curMailIndex = _emailList.find("li").size();
                            }
                            _emailList.find("li").removeClass("hv").eq(--_curMailIndex).addClass("hv");
                            mailSel = true;
                            return;
                        } else if (e.keyCode == 40) {
                            //down
                            if (_curMailIndex == _emailList.find("li").size()) {
                                _curMailIndex = 1;
                            }
                            _emailList.find("li").removeClass("hv").eq(++_curMailIndex).addClass("hv");
                            mailSel = true;
                            return;
                        } else if (e.keyCode == 13) {
                            //enter
                            var selVal = _emailList.find(".hv").html();
                            if (!selVal || selVal == "") return;
                            _userInp.val(selVal);
                            hideMailTip();
                            return;
                        }
                    }
                    var _resultList = [];
                    if (_mailDomain != "") {
                        $.each(mailDomainList,
                        function(i, n) {
                            if (n.substring(0, _mailDomain.length) == _mailDomain && n != _mailDomain) {
                                _resultList.push(n);
                            }
                        });
                    } else {
                        _resultList = mailDomainList;
                    }

                    if (_resultList.length > 0) {
                        var mailListHtml = "<ul><li><h4>请选择邮箱类型</h4></li>";
                        _curMailIndex = 1;
                        $.each(_resultList,
                        function(i, n) {
                            mailListHtml += "<li class=" + (i == 0 ? "hv": "") + ">" + _mailName + "@" + n + "</li>";
                        });
                        mailListHtml += "</ul>";
                        _emailList.html(mailListHtml);
                        _emailList.show();
                    } else {
                        hideMailTip();
                    }
                } else {
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
            $("#userClear").mousedown(function(e) {
                $(this).hide();
                $("#Login_User").val("");
                hideMailTip();
                if (e.preventDefault) {
                    e.preventDefault();
                }
            });
            _pasInp.keydown(function(e) {
                _pasTimmer = window.setTimeout(function() {
                    _PasKeyDown(e);
                    $("#user_pwd_error").hide();
                },
                10);
            });
            var _PasKeyDown = function(e) {
                var _oVal = _pasInp.val();
                var _val = $.trim(_oVal);
                if (_oVal == "") {
                    $(pwdClear).hide();
                } else {
                    $(pwdClear).show();
                }
                if (e.keyCode == 13) {
                    me.doLogin();
                }
            };

            $("#pwdClear").mousedown(function(e) {
                _pasInp.val("");
                if (e.preventDefault) {
                    e.preventDefault();
                }
                $(this).hide();
            });

            //点击登陆
            $("#login").click(function() {
                me.popUp();
            });

            //点击退出
            $("#loginout").click(function() {
                me.doLoginOut();
            });

            $("#popup-mask").click(function() {
                me.hidePopup();
            });

            $("#Login_Password").focus(function() {
                $("#Login_password_error").hide();
            });
            $("#loginBox h3 .user-login-tab").click(function() {
                $("#loginBox h3 .user-login-tab").removeClass("user-login-cur");
                $(this).addClass("user-login-cur");
                var _i = $("#loginBox h3 .user-login-tab").index(this);
                $("#loginBox .user-login-wrap").hide();
                $("#loginBox .user-login-wrap").eq(_i).show();
            });
        },
        popUp: function() {
            //init the login panel
            $("#loginBox").show();
            $("#popup-mask").show();
            $("#erCodeIframe").attr("src", $("#erCodeIframe").attr("org"));
        },
        hidePopup: function() {
            $("#loginBox").hide();
            $("#popup-mask").hide();
        },
        doLoginOut: function() {

            tongxun.Ajax.request("http://my.114la.com/api/index", {
                method: "GET",
                data: {
                    c: "api",
                    a: "logout",
                    appkey: "26a12af305d876a677aa",
                    callback: "YLMF.logout"
                },
                success: function(res) {
                    eval(res.responseText);
					//window.location.reload();
					if(!!$('.Content_sp')[0]){
						if(!!document.getElementById('undertheMZ')){
							$('.LS_Left').css('height',323);
							$('.LS_Left .Re_Box').css('height',272);
						}else{
							$('.LS_Left').css('height',313);
							$('.LS_Left .Re_Box').css('height',272);
						};
					}else{
						if(!!document.getElementById('undertheMZ')){
							$('.LS_Left').css('height',353);
							$('.LS_Left .Re_Box').css('height',302);
						}else{
							$('.LS_Left').css('height',343);
							$('.LS_Left .Re_Box').css('height',302);
						};
					};
                }
            });
        },
        doLogin: function() {
            var account = $("#Login_User").val();
            var pwd = $("#Login_Password").val();
            if (account == "") {
                alert("请输入用户名");
                return;
            } else if (pwd == "") {
                alert("请输入密码");
                return;
            }
            var ssoext = newGuid();
            var ssopw = oofUtil.security.sha1(oofUtil.security.sha1(oofUtil.security.sha1(pwd) + oofUtil.security.sha1(account)) + ssoext.toUpperCase());
            var auto = $("#autoLogin").get(0).checked | 0;
            tongxun.Ajax.request("http://my.114la.com/api/index", {
                method: "POST",
                data: {
                    c: "api",
                    a: "ssologin",
                    appkey: "26a12af305d876a677aa",
                    callback: "YLMF.login",
                    ssoln: account,
                    ssopw: ssopw,
                    ssoent: "A1",
                    ssoext: ssoext,
                    auto: auto
                },
                success: function(res) {
                    eval(res.responseText);
                }
            });
        },
        doCheckAccount: function() {
            //输入提示开始
            var _userInp = $("#Login_User");
            var account = _userInp.val();
            var _emailList = $("#emailList");
            tongxun.Ajax.request("http://my.114la.com/api/index", {
                method: "POST",
                data: {
                    c: "api",
                    a: "checkuserexists",
                    appkey: "26a12af305d876a677aa",
                    callback: "YLMF.checkAccount",
                    ssoln: account,
                    ssoent: "A1"
                },
                success: function(res) {
                    eval(res.responseText);
                }
            });
        }
    });
    YLMF.checkAccount = function(data) {

        var _userInp = $("#Login_User");
        if (_userInp.val() == "") return;
        if (_userInp.val() == data.data.ssoln) {
            if (data.status == 0) {
                $("#isUserExist").attr("class", "hint-suc");
                $("#isUserExist").show();
                $("#user_account_error").hide();
                //账号存在
            } else {
                $("#isUserExist").attr("class", "hint-err");
                $("#isUserExist").show();
                $("#user_account_error").show();
                //账号不存在
            }
        } else {}
    }
    YLMF.login = function(data) {

        if (data && data.status == 0) {
            //alert(data.info);
            //登陆成功
            login.hidePopup();
            login.Logined = true;
            YLMF.UID = data.user_id;
            YLMF.fireEvent("login", this, data.data);

        } else {
            //登陆失败
            //alert(data.info);
            YLMF.fireEvent("loginFail", this, data.data);
            //alert(data.info);
            if (data.status == 6) {
                //账号不存在
                $("#user_account_error").show();
            } else if (data.status == 50) {
                //密码错误
                $("#user_pwd_error").show();
                $("#Login_password_error").show();
            }
        }
    }
    YLMF.logout = function(data) {
        if (data) {
            login.Logined = false;
            YLMF.fireEvent("logout", this, data.data);
        }
    }
    YLMF.UID = YLMF.UID || "";
    YLMF.LoadConfig = function(data){
        window.UserConfig = data.data;
        typeof Skin != "undefined" && Skin.Login_in(UserConfig.Skin);
        typeof Tools != "undefined" && Tools.sc_load && Tools.sc_load($(".AllWrap .SameBox"));
    }
    YLMF.addListener({
        login: function(data) {
            var _userName = data.nickname || data.email;
            $("#username").html(_userName).show();
            $("#username").show();
            $("#login").hide();
            $("#loginout").show();
            $("#register").hide();
            Cookie.set("preUser", $("#Login_User").val());
            YLMF.UID = data.user_id;
            Ylmf.ScriptLoader.Add({ //加载用户配置
                src: "http://my.114la.com/api/index.php?c=api&a=getindexmodel&appkey=26a12af305d876a677aa&callback=YLMF.LoadConfig",
                charset: "utf-8"
            });
            $(".favorite .fvLogin").hide();//下面书签有关
            var bookMark_url = typeof YLMF.bookMark != "undefined" ? "http://my.114la.com/api/index?c=api&a=favlist&appkey=26a12af305d876a677aa&callback=YLMF.bookMark":"static/js/top.js";
            Ylmf.ScriptLoader.Add({
                src: bookMark_url,
                charset: "utf-8",
                callback:function(){
                    if(bookMark_url != "static/js/top.js") return;
                    Ylmf.ScriptLoader.Add({
                        src: "http://my.114la.com/api/index?c=api&a=favlist&appkey=26a12af305d876a677aa&callback=YLMF.bookMark",
                        charset: "utf-8"
                    });
                }
            });
            $(".fvNoSite").addClass("fvLoginNoSite");
            if( YLMF.loginAction == "bookMark"){ 
                $("#fm").hide();
                $("#loadFav").show();
            }
            isLogined = true;         
        },
        logout: function() {
            $("#login").show();
            $("#username").hide();
            $("#loginout").hide();
            $("#register").show();
            YLMF.UID = "";
            typeof Skin != "undefined" && Skin.Login_out();
            typeof Tools != "undefined" && Tools.sc_load && Tools.sc_load($(".AllWrap .SameBox"));
            $(".cool_addWebSite").hide();//下面书签有关
            $("#cool_bm").hide();
            $(".BM_itemRow").hide();
            $("#Tools .Tbox,#BM_list,#Tools").removeAttr("style");
        }
    });
    window.login = new Login();
    window.login.init();
})();