var _preMailUserName = Cookie.get("preMailUserName");
//邮箱登录
var MailLogin = {
    userNameGotFocus: function () {
        var mailPrompt = $("#mail .mailPrompt"),
            mailLoginBox = $("#js_mailLogin"),
            mailUsername = $("#js_mailUsername"),
            mailPassWord = $("#js_mailPassWord"),
            mailPromptPw = $("#mail .mailPromptPw");
            mailOpen = false;
        if (Browser.isIE == '6.0') {
            mailUsername.val("");
        }
        if(_preMailUserName){
            mailUsername.val(_preMailUserName);
        }
        if(mailUsername.val() !==''){
            mailPrompt.hide();
        }
        
        mailUsername.on('focus', function (el) {
            mailLoginBox.show();
            $("#js_eMail").hasClass("e-mailActived",function(pRst){
                if(!pRst) {
                    $("#js_eMail").addClass("e-mailActived");                    
                    if(_preMailUserName && YLMF.trim(_preMailUserName) == YLMF.trim(mailUsername.val()) && YLMF.trim(_preMailUserName) != ""){
                        mailPassWord.el.focus();
                    }                
                };
            });
            mailPrompt.hide();
        }).on('blur', function () {
            if ($(this).val() === '') {
                mailPrompt.show();
            }
        });
        $("#XH_yx").on("click",function(){
            $("#js_eMail").addClass("e-mailActived").fadeIn(200,function(){mailOpen = true});
            mailUsername.focus();
            if(_preMailUserName && YLMF.trim(_preMailUserName) == YLMF.trim(mailUsername.val()) && YLMF.trim(_preMailUserName) != ""){
                mailPassWord.focus();
            }
        });
        $("#js_eMail").click(function(event){event.stopPropagation();});
        $(document).click(function(){
            if(mailOpen){
                $("#js_eMail").removeClass("e-mailActived").fadeOut(200,function(){mailOpen = false});
            }
        })
        mailPassWord.on('focus', function (
            ) {
            mailPromptPw.hide();
        }).on('blur', function () {
            if ($(this).val() === '') {
                mailPromptPw.show();
            }
        });
    },

    setMailAddress: function () {
        var mailServer = $("#js_mailServer"),
            eMailList = $("#js_eMailList"),
            eMailListLi = $("#js_eMailList li"),
            dn = 0;
            ListOpen = false;
        var mailCutOff = [{ sou: '@vip.163.com', tar: '@vip.163...' },
                { sou: '@vip.sina.com', tar: '@vip.sina...' },
                { sou: '@yahoo.com.cn', tar: '@yahoo.c..'}];
        mailServer.click(function(){
            if(ListOpen){eMailList.hide();ListOpen=false;}
            else{eMailList.show();ListOpen=true;}
        });
        eMailListLi.on('click', function () {
            var _this = $(this);
            if (_this.attr("dn")>=0) {
                var dn = _this.attr("dn");
                mailServer.html(_this.html());
                eMailList.attr('selectIndex', dn);
                for (var i = 0; i < mailCutOff.length; i++) {
                    if (Yl.trim(_this.html().toString()) === mailCutOff[i].sou) {
                        mailServer.html(mailCutOff[i].tar);
                    }
                    continue;
                };
            }
            eMailList.hide();
            ListOpen=false;
        }).on('mouseover',function(){
            if(!$(this).hasClass("no")){
                eMailListLi.removeClass('hover');
                $(this).addClass("hover");
            }
        });
        $(window).keydown(function(e){
            if(ListOpen&&mailOpen){
                e.preventDefault();
                if(e.keyCode==39||e.keyCode==40){
                    var _hover = eMailList.find("li.hover").length>0 ? eMailList.find(".hover"):null;
                    if(_hover){
                        var _next = _hover.next();
                        if(_next.hasClass("no")){_next = _next.next();}
                        if(_next.length>0){
                            _hover.removeClass("hover");
                            _next.addClass("hover");
                        }
                    }
                    else{eMailList.find("li.first").addClass("hover");}
                }
                else if(e.keyCode==37||e.keyCode==38){
                    e.preventDefault();
                    var _hover = eMailList.find("li.hover").length>0 ? eMailList.find(".hover"):null;
                    if(_hover){
                        var _prev = _hover.prev();
                        if(_prev.hasClass("no")){_prev = _prev.prev();}
                        if(_prev.length>0){
                            _hover.removeClass("hover");
                            _prev.addClass("hover");
                        }       
                    }
                    else{eMailList.find("li.last").addClass("hover");}
                }
                else if(e.keyCode==13){
                    var _hover = eMailList.find("li.hover").length>0 ? eMailList.find(".hover"):null;
                    if (_hover) {
                        var dn = _hover.attr("dn");
                        if(dn){
                            mailServer.html(_hover.html());
                            eMailList.attr('selectIndex', dn);
                            for (var i = 0; i < mailCutOff.length; i++) {
                                if (Yl.trim(_hover.html().toString()) === mailCutOff[i].sou) {
                                    mailServer.html(mailCutOff[i].tar);
                                }
                                continue;
                            };
                        } 
                        else{_hover.find("a").get(0).click();}
                    }
                    eMailList.hide();
                    ListOpen=false;
                }
                else if(e.keyCode==27){eMailList.hide();ListOpen=false;}
            }
        });
    },
    flag: false,
    sendMail: function () {
        var username = $("#js_mailUsername").val(), 
        password = $("#js_mailPassWord").val(), 
        servers = $("#js_eMailList"), 
        form = $("#mail"),
        index = servers.attr("selectIndex"),
         H = Config.Mail[index], 
         F = {
            u: username,
            p: password
        };
        if (Yl.trim(F.u) == "") {
            alert("用户名不能为空！");
            $("#js_mailUsername").focus();
            $("#mail .mailPrompt").hide();
            return;
        }
        if (Yl.trim(F.p) == "") {
            alert("密码不能为空！");
            $("#js_mailPassWord").focus();
            $("#mail .mailPromptPw").hide();
            return;
        }
        form.find(".addin").remove();
        form.attr('action',H.action);
        for (I in H.params) {
            var newInput = "<input class='addin' type='hidden' name='"+I+"' value='"+format(H.params[I], F)+"' />";
            form.append(newInput);
        }
        form.submit();
        Cookie.set("preMailUserName",username);
        _preMailUserName = username;
        $("#js_mailPassWord").val("");
    }  
}
var Browser = (function () {
    var H = navigator.userAgent,
        F = 0,
        E = 0,
        I = 0,
        D = 0,
        A = 0,
        _ = 0,
        C = 0,
        B;
    if (H.indexOf("Chrome") > -1 && /Chrome\/(\d+(\.d+)?)/.test(H)) C = RegExp.$1;
    if (H.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(H)) F = RegExp.$1;
    if (window.opera && /Opera(\s|\/)(\d+(\.\d+)?)/.test(H)) I = RegExp.$2;
    if (H.indexOf("Gecko") > -1 && H.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(H)) A = RegExp.$1;
    if (/MSIE (\d+(\.\d+)?)/.test(H)) D = RegExp.$1;
    if (/Firefox(\s|\/)(\d+(\.\d+)?)/.test(H)) _ = RegExp.$2;
    if (H.indexOf("KHTML") > -1 && /AppleWebKit\/([^\s]*)/.test(H)) E = RegExp.$1;
    try {
        B = !!external.max_version
    } catch ($) { }
    var G = function() {
        var _ = false;
        if (navigator.plugins) for (var B = 0; B < navigator.plugins.length; B++) if (navigator.plugins[B].name.toLowerCase().indexOf("shockwave flash") >= 0) _ = true;
        if (!_) {
            try {
                var $ = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if ($) _ = true
            } catch (A) {
                _ = false
            }
        }
        return _
    }
    return ({
        isStrict: document.compatMode == "CSS1Compat",
        isChrome: C,
        isSafari: F,
        isWebkit: E,
        isOpera: I,
        isGecko: A,
        isIE: D,
        isFF: _,
        isMaxthon: B,
        isFlash: G(),
        isCookie: (navigator.cookieEnabled) ? true : false
    })
})();
var Yl = {
    getHost: function (A) {
        var _ = A || location.host,
        $ = _.indexOf(":");
        return ($ == -1) ? _ : _.substring(0, $)
    },
    getFocus: function (el) {
        var txt = el.createTextRange();
        txt.moveStart('character', el.value.length);
        txt.collapse(true);
        txt.select();
    },
    loadFrame: function (iframe, callback) {
        if (Browser.isIE) {  //ie
            iframe.onreadystatechange = function () {
                callback();
            };
        } else { //w3c
            iframe.onload = function () {
                callback();
            };
        }
    },
    trim: function ($) {
        $ = $.replace(/(^\u3000+)|(\u3000+$)/g, "");
        $ = $.replace(/(^ +)|( +$)/g, "");
        return $
    },
    /*
    encodeText: function ($) {
        $ = $.replace(/</g, "&lt;");
        $ = $.replace(/>/g, "&gt;");
        $ = $.replace(/\'/g, "&#39;");
        $ = $.replace(/\"/g, "&#34;");
        $ = $.replace(/\\/g, "&#92;");
        $ = $.replace(/\[/g, "&#91;");
        $ = $.replace(/\]/g, "&#93;");
        return $
    },

    decodeHtml: function ($) {
        $ = $.replace(/&lt;/g, "<");
        $ = $.replace(/&gt;/g, ">");
        $ = $.replace(/&#39;/g, "'");
        $ = $.replace(/&#34;/g, '"');
        $ = $.replace(/&#92;/g, "\\");
        $ = $.replace(/&#91;/g, "[");
        $ = $.replace(/\&#93;/g, "]");
        return $
    },
    createFrame: function (o) {
        if (!o || !o.src) { return }
        var s = o.src,
        w = o.width || "100%",
        h = o.height || "100%",
        Frame = format('<iframe src="#{src}" width="#{width}" height="#{height}" scrolling="no" frameborder="0" allowtransparency="true"></iframe>', {
            src: s,
            width: w,
            height: h
        })
        return Frame;
    },*/
    getType: function (o) {
        var _t; return ((_t = typeof (o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
    },

    setStyle: function (A, $) {
        var _ = document.styleSheets[0];
        if (_.addRule) {
            A = A.split(",");
            for (var C = 0,
            B = A.length; C < B; C++) _.addRule(A[C], $)
        } else if (_.insertRule) _.insertRule(A + " { " + $ + " }", _.cssRules.length)
    },

    addFav: function (title) {
        var title = title || document.getElementsByTagName("title")[0].innerHTML;
        if (document.all) {
            window.external.AddFavorite(location.href, title);
        } else if (window.sidebar) {
            window.sidebar.addPanel(title, location.href, "");
        } else if (window.opera && window.print) {
            return true;
        }
    },
    setHome: function (c,a){
        if(!Browser.isIE){
            window.open("http://www.114la.com/repair/setbrowser.html");
            return
        }
        var b=a;if(!b){b=window.location.href}c.style.behavior="url(#default#homepage)";c.setHomePage(b)
    } 
}
MailLogin.userNameGotFocus();
MailLogin.setMailAddress();