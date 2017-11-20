


$.fn.tabimg = function(speed) {
    var _this = $(this);
    var num = $(this).find("li").length;
    var par = $(this).parent();
    var le_btn = par.find(".tl");
    var ri_btn = par.find(".tr");
    var move1 = false;
    var move2 = false;
    var nn = 0;
    var auto2;
    var _index = 2;
    var special = par.hasClass("headline") ? true:false;
    if(special){
        var len = _this.find("li").length;
    	par.find(".Btns span").html("<b>1</b>/"+len);
    }
    var ban = function(n) {
        move2 = true;
        _index++;
        _this.find("li").eq(n).hide().css("z-index",_index).fadeIn(500,function(){
            move2 = false;
        });
        if(special){var _n = nn+1;par.find(".Btns span b").html(_n);}
    }
    le_btn.click(function() {
        if (move2 == true) {
            return;
        } else {
            nn == 0 ? nn=num-1:nn--;
            ban(nn);
        }
    });
    ri_btn.click(function() {
        if (move2 == true) {
            return;
        } else {
            nn == num-1 ? nn=0:nn++;
            ban(nn);
        }
    });
    if(!special){
    	par.hover(function() {
	        le_btn.stop(true, false).animate({
	            "left": 0
	        },
	        200);
	        ri_btn.stop(true, false).animate({
	            "right": 0
	        },
	        200);
	    },
	    function() {
	        le_btn.stop(true, false).animate({
	            "left": "-20px"
	        },
	        200);
	        ri_btn.stop(true, false).animate({
	            "right": "-20px"
	        },
	        200);
	    });
    }
    _this.hover(function() {
        move1 = true;
    },
    function() {
        move1 = false;
    }).trigger("mouseout");
    auto2 = setInterval(function() {
        if (move2 == true || move1 == true) {
            return;
        } 
        else {
            nn == num-1 ? nn=0:nn++;
            ban(nn);
        }
    },
    speed);
}
//tab切换
var geteven = function(c){var f=c||window.event;if(!f){var g=this.getEvent.caller;while(g){f=g.arguments[0];if(f&&(Event==f.constructor||MouseEvent==f.constructor)){break}g=g.caller}}return f}
$.fn.fortab = function(files,btn,div,n,load,ev){
	var btns = $(this).find(btn),
	boxes=$(this).find(div),cr=n?n:0,_work=false,tabTimeout=null;
	var _ev = ev ? ev:"click";
	btns.on(_ev,function(e){
		var index = $(this).index();
		if(cr==index){return;}
		else{ 
          var _event = geteven(e);
          _event.preventDefault();
		  if(_work==true){
		  	if(tabTimeout){clearTimeout(tabTimeout);}
			tabTimeout = setTimeout(function(){tab(index);},400);
		  }
		  else{tab(index);}
		}
	});
	var tab = function(index){
		if(_work==true) return;
		_work=true;
		boxes.eq(cr).fadeOut(200,function(){
			boxes.eq(index).fadeIn(200,function(){_work=false;});
			if(/^\s*$/.test(boxes.eq(index).html())){Tools.loadfile(boxes.eq(index),files[index]);}
		});
		btns.eq(cr).removeClass("active");
		btns.eq(index).addClass("active");
		cr=index;
		if(load){
            if(login.Logined){
                $.ajax({
                    url:"http://my.114la.com/api/index.php?c=api&a=setindexmodel&appkey=26a12af305d876a677aa&type=i&v="+load[1]+","+index,
                    type:"GET", 
                    dataType:'jsonp'
                });
            }
            else{Cookie.set(load[1],index);}
        }
	}
	if(load){
		var _n;
        if(login.Logined){_n = typeof UserConfig !="undefined" && UserConfig[load[1]] || load[0]; }
        else{_n = Cookie.get(load[1]) ? Cookie.get(load[1]):load[0];}
        _n = _n>=btns.length ? load[0] : _n;
		cr = _n
		boxes.eq(_n).show();
		Tools.loadfile(boxes.eq(_n),files[_n]);
		btns.eq(_n).addClass("active");
	}
}
$.fn.nortab = function(btn,div,ev){	
	var btns = $(this).find(btn),
	boxes=$(this).find(div),cr=0,_work=false,tabTimeout=null;
	var _this = $(this);
	var _ev = ev ? ev:"click";
	btns.on(_ev,function(e){
        var _event = geteven(e);
        _event.preventDefault();  
		var index = $(this).index();
		if(cr==index){return;}
		else{ 
		  if(_work==true){
		  	if(tabTimeout){clearTimeout(tabTimeout);}
			tabTimeout = setTimeout(function(){tab(index);},400);
		  }
		  else{tab(index);}
		}
	});
	var tab = function(index){
		if(_work==true) return;
		_work=true;
		boxes.eq(cr).fadeOut(200,function(){
			boxes.eq(index).fadeIn(200,function(){_work=false;});
		});
		btns.eq(cr).removeClass("active");
		btns.eq(index).addClass("active");
		cr=index;
		if(_this.hasClass("Tools")){$(".location-select-box").hide();$(".date-select-box").hide();}
	}
}
var Tools={
    sc_load_times:0,
	loadfile:function(div,file,callback){
        $.ajax({ 
            type:'get', 
            dataType:'html', 
            url:file,
            beforeSend:function(){div.css("position","relative");div.html("<img class='loading' src='static/images/loading.gif' />");},
            success:function(data){div.html(data)},
            complete: function(){div.css("position","");callback&&callback();}
        });
	},
	load_part:function(n){
		var obj = $("#"+Cr_LoadOrder[n]+"Block");
		var file = Files[Cr_LoadOrder[n]];
		Tools.loadfile(obj,file,function(){Tools.up_down();});		
	},
	sc_load:function(obj){
        if(Tools.sc_load_times){obj.html("");obj.removeAttr("id");$("#FixNav li.order").remove();}
        if(login.Logined){window.Cr_LoadOrder = UserConfig.LoadOrder;}
        else{
            window.Cr_LoadOrder = Cookie.get(Config.Ck_LoadOrder) ? Cookie.get(Config.Ck_LoadOrder).split(","):Config.LoadOrder;    //得出加载顺序id
            if(!Cookie.get(Config.Ck_LoadOrder)){Cookie.set(Config.Ck_LoadOrder,Config.LoadOrder)}
        }
        window.Load_n = 0;    //当前加载到第几块
        window.Load_Max = Cr_LoadOrder.length;    //最多加载块数
        for(var i=Load_n;i<Load_Max;i++){
	        obj.eq(i).attr("id",Cr_LoadOrder[i]+"Block");
	        $("#FixNav ul .ToTop").before(Config.FixNavLi[Cr_LoadOrder[i]]);
	    }    //给对象加id 右侧导航加内容
	    $("#FixNav").show();
        if(Cookie.get(Config.Ck_Df_Load)){
        	var fristLoad = Cookie.get(Config.Ck_Df_Load);
        }
		$(window).scroll(function(){sc();});
		function sc(fri){
			var _top = document.documentElement.scrollTop || document.body.scrollTop;
			if(Load_n<Load_Max){
				var w_hei = $(window).height();
				var ot = obj.eq(Load_n).offset().top;
				if(_top+w_hei+30>ot){
					Tools.load_part(Load_n);Load_n++;
					while(fri&&Load_n<Load_Max&&_top+w_hei+30>obj.eq(Load_n).offset().top){
						Tools.load_part(Load_n);Load_n++;
					}
				}
			};
			if(_top>100){$("#FixNav .ToTop").slideDown(200);}
            else{$("#FixNav .ToTop").slideUp(200);}
		}
		sc(true);
		setTimeout(function(){sc(true);},1500);
        Tools.sc_load_times++;
	},
	up_down:function(){
        var obj = $(".SameBox .til .move");
        var _n = obj.length;
        obj.find(".upDisable").removeClass("upDisable").addClass("up");
        obj.find(".downDisable").removeClass("downDisable").addClass("down");
        obj.eq(0).find(".up").removeClass("up").addClass("upDisable");
        if(_n==Load_Max){obj.eq(_n-1).find(".down").removeClass("down").addClass("downDisable");}
	},
	Save_Ck_Order:function(){
		var _order = [];
		for(var i=0;i<Load_Max;i++){
			var _id = $(".SameBox").eq(i).attr("id").replace("Block","");
			_order.push(_id);
		}
        if(login.Logined){
            $.ajax({
              url:"http://my.114la.com/api/index.php?c=api&a=setindexmodel&appkey=26a12af305d876a677aa&type=o&v="+_order,
              type:"GET", 
              dataType:'jsonp'
            });
        }
        else{Cookie.set(Config.Ck_LoadOrder,_order);}		
	},
	favorite: function(siteUrl, siteName) {
		try {
			if (document.all) {
				window.external.addFavorite(siteUrl, siteName);
			} else if (window.sidebar) {
				window.sidebar.addPanel(siteName, siteUrl, '');
			}
			else{alert("加入收藏夹失败，请使用Ctrl+D快捷键进行添加操作!")}
		} catch(e) {
			alert("加入收藏夹失败，请使用Ctrl+D快捷键进行添加操作!");
		}
	},
    verticalTab:function(div,speed,abs,base){
        var _base = base ? base:"li";
        var len = div.find(_base).length;
        var hei = div.find(_base).height();
        var _abs = abs ? div.find(abs) : div.find("ul");
        _abs.css("height",(len+1)*hei);
        var _i =  0;
        var play = function(){
            if(_i==len){
                _abs.append(_abs.find(_base).eq(0).clone()); 
                _abs.stop(false,true).animate({"top":-_i*hei},300,function(){
                    _abs.css("top",0);
                    _abs.find(_base).eq(len).remove();
                    _i=0;
                });
            }
            else{_abs.stop(false,true).animate({"top":-_i*hei},300);}            
        }
        var autoplay = setInterval(function(){_i++;play();},speed);
    }
}
var Config = {
    LoadOrder:["Video","Game","Shop","Relax"],    //默认加载顺序
    Ck_LoadOrder:"LoadOrder",   //记录加载顺序cookie名
    Df_Video:[0,"VideoLoad"],   //视频块默认加载第n个切换及其cookie名
    Df_Game:[0,"GameLoad"],   //游戏块默认加载第一个切换及其cookie名
    Df_Relax:[0,"RelaxLoad"],   //放松块默认加载第一切换及其cookie名
    Ck_bank:"Bank2015",  //记录银行cookie名
    FixNavLi:{
	    "Video":"<li class='order n1'><a href='javascript:void(0);' target='_self'><span></span>看片</a></li>",
	    "Game":"<li class='order n2'><a href='javascript:void(0);' target='_self'><span></span>游戏</a></li>",
	    "Shop":"<li class='order n3'><a href='javascript:void(0);' target='_self'><span></span>购物</a></li>",
	    "Relax":"<li class='order n5'><a href='javascript:void(0);' target='_self'><span></span>放松</a></li>"
    },
    defaultTheme:"normal",
    Search : {
        defaultimg:["static/images/baidu.png","百度首页"],
        web : {
            action: "http://www.baidu.com/s",
            name: "wd",
            btn: "百度一下",
            url: "http://www.baidu.com/index.php?tn=" + BaiduTn.tn + "&ch=" + BaiduTn.ch,
            params: {
                tn: BaiduTn.tn,
                ch: BaiduTn.ch
            }
        },
        video:{
            action: "http://v.baidu.com/v",
            name: "word",
            btn: "百度一下",
            img: ["static/images/ser_video.png", "百度视频"],
            url: "http://v.baidu.com/",
            params: {
                ie:"utf-8",
                tn: BaiduTn.tn,
                ch: BaiduTn.ch
            }
        },
        bfyy: {
            action: "http://hz.v.baofeng.com/search/web/search.php",
            name: "keywords",
            btn: "暴风视频",
            img: ["static/images/ser_bf.png", "暴风视频"],
            url: "http://hz.v.baofeng.com/",
            params: {}
        },
        music:{
            action: "http://mp3.baidu.com/m",
            name: "word",
            btn: "百度一下",
            img: ["static/images/ser_mp3.png", "百度mp3"],
            url: "http://music.baidu.com/?ie=utf-8&ct=134217728&word=&tn="+BaiduTn.tn+"&ch="+BaiduTn.ch,
            params: {
                tn: BaiduTn.tn,
                ch: BaiduTn.ch,
                f: "ms",
                ct: "134217728",
                ie:"utf-8"
            }
        },
        image:{
            action: "http://image.baidu.com/search/index",
            name: "word",
            btn: "百度一下",
            img: ["static/images/ser_pic.png", "百度图片"],
            url: "http://image.baidu.com/",
            params: {
                ct: "201326592",
                cl: "2",
                tn: "baiduimage",
                lm: "-1",
                ie: 'utf-8'
            }
        },
        zhidao:{
            action: "http://zhidao.baidu.com/q",
            name: "word",
            btn: "百度一下",
            img: ["static/images/ser_zhidao.png", "百度知道"],
            url: "http://zhidao.baidu.com/q?pt=ylmf_ik",
            params: {
                tn: "ikaslist",
                ct: "17",
                pt: "ylmf_ik"
            }
        },
        cellphone:{
            action: "http://detail.zol.com.cn/index.php",
            name: "kword",
            btn: "搜 索",
            img: ["static/images/yesky.png", "中关村"],
            url: "http://detail.zol.com.cn/index.php",
            params: {
                ie : 'utf-8',
                c : "SearchList"
            }
        },
        map:{
            action: "http://map.baidu.com/m",
            name: "word",
            btn: "百度一下",
            img: ["static/images/ser_ditu.png", "百度地图"],
            url: "http://map.baidu.com/",
            params: {
                 ie: 'utf-8'
            }
        },
        computer: {
            action: "http://search.yesky.com/searchproduct.do",
            name: "wd",
            btn: "搜 索",
            img: ["static/images/ser_yesky.png", "天极电脑"],
            url: "http://product.yesky.com/",
            charset:"gb2312",
            params: {
                ie: "utf-8"
            }
        },
        gouwu:{
            action: "http://ai.taobao.com/search/index.htm",
            name: "key",
            url: "http://www.taobao.com/",
            img: ["static/images/ser_taobao.png", "淘宝"],
            btn: "淘宝搜索",
            params: {
                pid: "mm_33597634_3422071_11069807",
                unid: "114la",
                commend: "all",
                search_type: "action",
                user_action: "initiative",
                f: "D9_5_1",
                at_topsearch: "1",
                sid: "(05ba391dbdcada4634d4077c189eeef7)",
                sort: "",
                spercent: "0"
            }
        },
        ticket:{
            url:"http://www.114la.com/lvyouchuxing/index.htm?shousuo",
            img:["static/images/ser_ticket.png", "114啦旅游"]
        }
    },
    SkinCookieName:"skin2015",
    Mail: [
    {
        val: 0
    },
    {
        action: "http://reg.163.com/CheckUser.jsp",
        params: {
            url: "http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight=1&verifycookie=1&language=-1&style=15",
            username: "#{u}",
            password: "#{p}"
        }
    },
    {
        action: "https://reg.163.com/logins.jsp",
        params: {
            domain: "126.com",
            username: "#{u}@126.com",
            password: "#{p}",
            url: "http://entry.mail.126.com/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26language%3D0%26style%3D-1"
        }
    },
    {
        action: "https://ssl1.vip.163.com/logon.m",
        params: {
            username: "#{u}",
            password: "#{p}",
            enterVip: true
        }
    },
    {
        action: "http://mail.sina.com.cn/cgi-bin/login.cgi",
        params: {
            u: "#{u}",
            psw: "#{p}"
        }
    },
    {
        action: "http://vip.sina.com.cn/cgi-bin/login.cgi",
        params: {
            user: "#{u}",
            pass: "#{p}"
        }
    },
    {
        action: "https://edit.bjs.yahoo.com/config/login",
        params: {
            login: "#{u}@yahoo.com.cn",
            passwd: "#{p}",
            domainss: "yahoo",
            ".intl": "cn",
            ".src": "ym"
        }
    },
    {
        action: "https://edit.bjs.yahoo.com/config/login",
        params: {
            login: "#{u}@yahoo.cn",
            passwd: "#{p}",
            domainss: "yahoocn",
            ".intl": "cn",
            ".done": "http://mail.cn.yahoo.com/inset.html"
        }
    },
    {
        action: "http://passport.sohu.com/login.jsp",
        params: {
            loginid: "#{u}@sohu.com",
            passwd: "#{p}",
            fl: "1",
            vr: "1|1",
            appid: "1000",
            ru: "http://login.mail.sohu.com/servlet/LoginServlet",
            ct: "1173080990",
            sg: "5082635c77272088ae7241ccdf7cf062"
        }
    },
    {
        action: "http://login.mail.tom.com/cgi/login",
        params: {
            user: "#{u}",
            pass: "#{p}"
        }
    },
    {
        action: "http://passport.21cn.com/maillogin.jsp",
        params: {
            UserName: "#{u}@21cn.com",
            passwd: "#{p}",
            domainname: "21cn.com"
        }
    },
    {
        action: "https://reg.163.com/logins.jsp",
        params: {
            domain: "yeah.net",
            username: "#{u}@yeah.net",
            password: "#{p}",
            url: "http://entry.mail.yeah.net/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26style%3D-1"
        }
    },
    {
        action: "http://mail.189.cn/webmail/login2.perform",
        params: {
            __VIEWSTATE: "/wEPDwUKMTYxODg2ODExNQ9kFgJmD2QWDgIBDxYCHgVzdHlsZQUSdmlzaWJpbGl0eTp2aXNpYmxlFgICAQ8PFgIeBFRleHQFG+eUqOaIt+WQjeaIluWvhueggemUmeivr+OAgmRkAg0PDxYEHgtOYXZpZ2F0ZVVybAVIaHR0cDovL3Bhc3Nwb3J0LjE4OS5jbi9TZWxmUy9ML1JlZy9TZWxlY3QuYXNweD9EZXZpY2VObz0zNTAwMDAwMDAwNDAwMTAxHwEFByDms6jlhoxkZAIPDw8WAh8BBTRodHRwOi8vd3d3LjE4OS5jbi93ZWJtYWlsL2pzcC8xODltaXNjL3Y1L2Nzcy91ZGIuY3NzZGQCEQ8PFgIfAQUtaHR0cDovL3dlYm1haWw1LjE4OS5jbi93ZWJtYWlsL1VEQkxvZ2luUmV0dXJuZGQCEw8PFgIfAQUQMzUwMDAwMDAwMDQwMDEwMWRkAhUPDxYCHwEFDDEyNC4yMDUuNzcuOWRkAhcPDxYCHwEFDHZCWWdGcWRydTVrPWRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQtjYl9TYXZlTmFtZYevyftAQT5CX9s2VZJOrPsTLqDH",
            __EVENTVALIDATION: "/wEWCQLckeONBALT8dy8BQKd+7qdDgK/8ZbBBQKhwImNCwK1yJy1AQLhyKz0DgKh/9zICgKnqZGuBiPwFoYTVzM5HAbhLCKRJWRuEyet",
            UserName: "#{u}",
            passwd: "#{p}"
        }
    },
    {
        action: "https://mail.10086.cn/Login/Login.ashx",
        params: {
            UserName: "#{u}",
            Password: "#{p}",
            ClientId: "5028",
            type: "mail"
        }
    },
    {
        action: "http://passport.baidu.com/?login",
        params: {
            u: "http://passport.baidu.com/center",
            username: "#{u}",
            password: "#{p}"
        }
    },
    {
        action: "http://passport.renren.com/PLogin.do",
        params: {
            email: "#{u}",
            password: "#{p}",
            origURL: "http://www.renren.com/Home.do",
            domain: "renren.com"
        }
    },
    {
        action: "http://passport.51.com/login.5p",
        params: {
            passport_51_user: "#{u}",
            passport_51_password: "#{p}",
            gourl: "http%3A%2F%2Fmy.51.com%2Fwebim%2Findex.php"
        }
    },
    {
        action: "http://passport.sohu.com/login.jsp",
        params: {
            loginid: "#{u}@chinaren.com",
            passwd: "#{p}",
            fl: "1",
            vr: "1|1",
            appid: "1005",
            ru: "http://profile.chinaren.com/urs/setcookie.jsp?burl=http://alumni.chinaren.com/",
            ct: "1174378209",
            sg: "84ff7b2e1d8f3dc46c6d17bb83fe72bd"
        }
    }],
    banner: {
        b4: {
            img: "static/images/banner/taoke12060.jpg",
            url: "http://pindao.huoban.taobao.com/channel/channelMall.htm?pid=mm_11140156_0_0"
        }
    },
    Track: [["js_mailSubmit", {
        n: "邮箱登录",
        u: "邮箱登录",
        q: 0
    }]]
}
;(function() {
    //浮动左侧内容部分 star
    var LeftBar = $("#LeftBar");
    var LeftBarBtn = $("#LeftBarBtn");
    var LB_open = true;
    var Boxes = LeftBar.find(".Box");
    Boxes.hover(function(){
        $(this).addClass("Box_hover");
    },function(){
        $(this).removeClass("Box_hover");
    });
    LeftBarBtn.click(function(){
        if(LB_open){
            LeftBar.animate({"left":"-50px"},300,function(){
                LB_open = false;
                jQuery("#LeftBarBtn a").addClass("ri");
            });
        }
        else{
            LeftBar.animate({"left":0},300,function(){
                LB_open = true;
                jQuery("#LeftBarBtn a").removeClass("ri");
            });
        }
    });
    var LB_size = function(){
        if (ClientWidth < 1100) {
            LeftBar.hide();
            LeftBarBtn.hide();
        } else {
            LeftBar.show();
            LeftBarBtn.show();
        }
    }
    LB_size();
    sizeFuns.push(LB_size);
    //浮动左侧内容部分 end
    //主内容左边部分 star
    $(".Content .Same .Re_Box").live("mouseenter",
    function() {
        $(this).find(".ChangeBtn").fadeIn()
    });
    $(".Content .Same .Re_Box").live("mouseleave",
    function() {
        $(this).find(".ChangeBtn").fadeOut()
    });
    $(".Content .Same .Re_Box .ChangeBtn").live("click",
    function() {
        var I = $(this).find("i");
        var par = $(this).parent();
        var up = I.hasClass("down") ? true:false;
        overPage(par,up);
    });
    var moving = false;
    var overPage = function(obj,up) {
        if(moving) return;
        moving = true;
        var I = obj.find(".ChangeBtn i");
        var AB = obj.find(".Ab_Box");
        var hei = obj.height();
        if (up) {
            AB.stop(true, false).animate({"top": 0},360,function(){moving = false;});
            I.removeClass("down");
        } else {
            AB.stop(true, false).animate({"top": -hei},360,function(){moving = false;});
            I.addClass("down");
        }
    }
    $(".Content .Same .Re_Box").live("mousewheel",function(event, delta) {  
		if($(this).closest('.Same').attr('flag') != 'false'){
			if(moving){event.preventDefault();}
			var _this = $(this);
			var up = delta > 0 ? true:false;
			var I = $(this).find(".ChangeBtn i");
			var _up = I.hasClass("down") ? false:true;
			if((_up&&!up)||(!_up&&up)){
				event.preventDefault();
				overPage(_this,up);
			}
		}
    }); 
    $("#LS_xw .imgBox ul").eq(0).tabimg(8000);
    $("#LS_rb .imgBox ul").eq(0).tabimg(8000);
    $("#LS_yx .imgBox ul").eq(0).tabimg(8000);
	$("#LS_yxgw .imgBox ul").eq(0).tabimg(8000);
    $(".Content .headline .imgBox").tabimg(8000);
    $(".Content .Same").eq(0).fortab(Files.Lpart1, ".til a", ".Re_Box");
    $(".Content .Same").eq(1).fortab(Files.Lpart2, ".til a", ".Re_Box");
    $(".Content .Same").eq(2).fortab(Files.Lpart3, ".til a", ".Re_Box");
	$(".Content .Same").eq(3).fortab(Files.Lpart4, ".til a", ".Re_Box");
    $(".Content .Shop").nortab(".til a", ".Box");
    $(".Content .Tools").nortab(".til a", ".Tbox .Tab");
    //主内容左边部分 end
    for(var i=0;i<$(".w_live .Box li").length;i++){$(".w_live .Box li").eq(i).nortab(".w_det a",".nodeP","mouseenter");}  //生活服务部分
    //上下移动模块方法 star
    $(".SameBox .til .move a.down").live("click",
    function() {
        var par = $(this).parents(".SameBox");
        var _i = par.index(".SameBox");
        if (_i + 1 == Load_n && Load_n != Load_Max) {
            Tools.load_part(Load_n);
            Load_n++
        }
        par.insertAfter($(".SameBox").eq(_i + 1));
        $("#FixNav ul li").eq(_i).insertAfter($("#FixNav ul li").eq(_i + 1));
        Tools.up_down();
        Tools.Save_Ck_Order()
    });
    $(".SameBox .til .move a.up").live("click",
    function() {
        var par = $(this).parents(".SameBox");
        var _i = par.index(".SameBox");
        par.insertBefore($(".SameBox").eq(_i - 1));
        $("#FixNav ul li").eq(_i).insertBefore($("#FixNav ul li").eq(_i - 1));
        Tools.up_down();
        Tools.Save_Ck_Order()
    });
    //上下移动模块方法 end
    $("#FixNav li").live("click",function(){
        var _top = $(this).hasClass("ToTop") ? 0:$(".SameBox").eq($(this).index()).offset().top;
        $('html,body').animate({scrollTop: _top}, 500);
    });
    //火车机票等 star
	/*
    var TrainDate = new DateInput("#TrainDate", {},
    true);
    var FlyDate = new DateInput("#FlyDate", {},
    true);
    var HotelDate = new DateInput("#HotelDate", {},
    true);
	*/
    // var tuniuDate = new DateInput("#tuniuDate", {},
    // true);   机票搜索有关
    var fly_train = false;
    $("#Tools .til a,.SearchBox .SerType a.ticket").click(function(){
        if(fly_train) return;
        if(typeof window.UpDataCache == "undefined"){window.UpDataCache = "updata";}
        $.ajax({ 
            type:'get', 
            dataType:'html', 
            url:'sub/select_box.html'+UpDataCache,
            success:function(data){$("body").append(data)},
            complete: function(){
                Ylmf.ScriptLoader.Add({
                    src: "static/js/cityPicker.js"+UpDataCache,
                    charset: "utf-8",
                    callback:function(){
                        var CitySelecter = new CityPicker("#TrainStar", "#TrainCity");
                        var CitySelecter2 = new CityPicker("#TrainEnd", "#TrainCity");
                        var CitySelecter3 = new CityPicker("#FlyStar", "#FlyCity");
                        var CitySelecter4 = new CityPicker("#FlyEnd", "#FlyCity");
                        var CitySelecter5 = new CityPicker("#HotelCity", "#FlyCity");
                        // var CitySelecter6 = new CityPicker("#tuniuStar", "#FlyCity");  机票搜索有关
                        // var CitySelecter7 = new CityPicker("#tuniuEnd", "#FlyCity");  机票搜索有关
                        IdFocus(["TrainStar", "TrainEnd", "TrainDate"]);
                        IdFocus(["FlyStar", "FlyEnd", "FlyDate"]);
                        IdFocus(["HotelCity", "HotelDate", "HotelName"]);
                        // IdFocus(["tuniuStar", "tuniuEnd", "tuniuDate"]);  机票搜索有关
                        // $(".SearchBox .SerAir p i").click(function(){  
                        //     $(this).siblings("input").focus();
                        // });  机票搜索有关
                    }
                });
            }
        });        
        fly_train = true;
    });
    //火车机票等 end
    if(!login.Logined||(!Tools.sc_load_times && typeof UserConfig != "undefined")){Tools.sc_load($(".AllWrap .SameBox"));}
    Tools.verticalTab($(".header .handle .xiaohua"),5000);
	//点击切换搜索栏目
	$('#tsrc-tab a').bind('click',function(event){
		if(!$(this).hasClass('active')){
			event.preventDefault();
		};
	});
	//新闻点击
	$('.Same p a').live('click',function(){
		var nodeInput = $(this).closest('.Box').find('input[type="hidden"]');
		if(nodeInput.length > 0){
			var valData = nodeInput.first().attr('data-value');
			var srcData = nodeInput.first().attr('data-src');
			var _this = this;
			setTimeout(function(){
				$(_this).attr('href',srcData).html('<i></i>'+valData);
			},1000);
			nodeInput.first().remove();		
		};
	});
})();

//银行有关
;(function(){
    var bankShowTimmer,bankHideTimmer;
    $("#bank,#bankbox i").hover(function(){
        window.clearTimeout(bankHideTimmer);
        window.clearTimeout(bankShowTimmer);
        bankShowTimmer = window.setTimeout(function(){
            $("#bank_list").slideDown(200);
        },300);
        
    },function(){
        window.clearTimeout(bankHideTimmer);
        window.clearTimeout(bankShowTimmer);
        bankHideTimmer = window.setTimeout(function(){
            $("#bank_list").slideUp(200);
        },300);
    });
    $("#bank_list").hover(function(){
        window.clearTimeout(bankHideTimmer);
        window.clearTimeout(bankShowTimmer);        
    },function(){        
        window.clearTimeout(bankHideTimmer);
        window.clearTimeout(bankShowTimmer);
        bankHideTimmer = window.setTimeout(function(){
            $("#bank_list").slideUp(200);
        },300);
    });
    $("#bank_list a").click(function(){
        var now_bank = $("#bank");
        var _href = $(this).attr("href");
        var _text = $(this).html();
        now_bank.attr("href",_href);
        now_bank.html(_text);
        if(login.Logined){user_change_bank(_href,_text)}
        else{Cookie.set(Config.Ck_bank,_href+","+_text);}
        $("#bank_list").slideUp(200);
    });
	var loadbank = function(obj){
        if(obj){
          var now_bank = $("#bank");
          var _href = obj.split(",")[0];
          var _text = obj.split(",")[1];
          now_bank.html(_text);
          now_bank.attr("href",_href);
        }
    }
    if(Cookie.get(Config.Ck_bank)){loadbank(Cookie.get(Config.Ck_bank));}
    else{loadbank("http://www.icbc.com.cn/icbc/,工商银行");}
})();
(function(){
	if(typeof isPBL != 'undefined' && isPBL){
		$('.wrapLoad').show();
		var el = $('#dnews');
		var _czwTop = el.offset().top;
		window._czwTop = _czwTop;
		var _fixTop = $('.downBody_box').offset().top;
		var wSH = document.documentElement.clientHeight;
		function DownInfo(){
			this.listAjax();
			this.dSc();
			
		};
		DownInfo.prototype = {
			start_num : 1,
            start_limit: 1,
            start_reqtimes:1,
			max_num : 5,
			hotLen : 15,
			infoLen : 20,
			initNum : 1,
			infoNum : 1,
			infoFlag :false,
			isFixed : true,
			dSc : function(){
				var _top = document.documentElement.scrollTop || document.body.scrollTop;			
				var _dTop = _czwTop - _top;
				if(_dTop<0 && this.isFixed){
					el.addClass('fixedDom');
					this.isFixed=false;
				}else if(!this.isFixed && _dTop>0){
					el.removeClass('fixedDom');
					this.isFixed=true;
				};
				var hSH = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);		
				if(hSH<_top+wSH+200 && this.infoFlag){
					this.changeBody();
				}
			},
			listAjax : function(){				
				var _this = this;
				_this.showJT();
				$.get('footer_fall_index.json',function(data){
					var listArr = [];
					$.each(data,function(k,v){
						if(v['key'] != 0){
							listArr.push(v);
						};
					});
					_this.listArr = listArr;
					_this.showList(listArr);
				});
			},
			showList : function(obj){
				var listDom = ['<ul>'];
				var downTitle = $('.downTitle');
				$.each(obj,function(k,v){
					listDom.push('<li onclick="w_Base.ckList.call(this,'+v['key']+')""'+(k==0?' class="active"':'')+'><a tj="bfl'+(k+1)+'" href="javascript:void(0)" target="_self">'+v['name']+'</a></li>');
				});
				listDom.push('</ul><i onclick="w_Base.close()"></i>');
				this.hotList();
				this.bodyListNum = 1;
				this.infoList(1);
				downTitle.html(listDom.join(''));
			},
			close : function(){
				setTimeout(function(){
					$('#dnews').empty();
				},80);
			},
			ckList : function(n){
				if(!$(this).hasClass('active')){
					$(this).siblings('.active').removeClass('active');
					$(this).addClass('active');
					w_Base.bodyListNum = n;
					w_Base.infoList(n,true);				
				};
			},
			hotList : function(){
				var _this = this;			
				$.get('footer_fall_0.json',function(data){
					_this.changeData = data;
					_this.infoFlag = true;
					_this.changeHot();
				});
			},
			changeHot : function(){
				var _this = this;
				var data = _this.changeData;
				var n = parseInt(data['data'].length / _this.hotLen);
				var _max = _this.hotLen*_this.initNum;
				var _min = _max - _this.hotLen;
				_this.initNum = _this.initNum >= n ? 1 : _this.initNum+1;
				var hotArr = ['<ul>'];
				$.each(data['data'],function(k,v){
					if(k>=_min && k<_max){
						var nameStr = '';
						nameStr = v['name'];
						if(v['remark'] == null){
							return true;
						};
						hotArr.push('<li><a tj="btj'+(k+1)+'" href="'+v['url']+'" title="'+v['name']+'"><span>'+nameStr+'</span><img src="'+v['remark'][0]['src']+'"></a></li>');
					};
				});
				hotArr.push('</ul>');
				$('.downBody_h').html(hotArr.join(''));
			},
			infoList : function(num){
				var _this = this;
				if(typeof arguments[1] != 'undefined'){
					_this.infoNum = 1;
					if($('#dnews').hasClass('fixedDom')){
						$('#bodyInfo').html('');
						$(document).scrollTop(_czwTop-60)
					}else{
						$('#bodyInfo').html('');
					}
					$('.downEnd').hide();
					$('.downLoad').show();	
				};
				$.get('footer_fall_'+num+'.json',function(data){
                    _this.start_limit = 1;
                    _this.advDataCache.clear();
					_this.infoData = data;
					_this.changeBody();
				});
			},
			changeBody : function(){
				var _this = this;
				var data = _this.infoData;
				var n = parseInt(data['data'].length / _this.infoLen);
				var _max = _this.infoLen*_this.infoNum;
				var _min = _max - _this.infoLen;
				var bodyArr = [];
				if(_this.infoNum > n){
					$('.downEnd').show();
					$('.downLoad').hide();			
					return;
				};
				_this.infoNum++;
				/*console.log(_min+'....'+_max+'...'+_this.infoNum+'...'+n);*/
				var tjName = '';
				switch(this.bodyListNum){
					case 1:
						tjName = 'bzx';
						break;
					case 2:
						tjName = 'bty';
						break;
					case 3:
						tjName = 'bsh';
						break;
					case 4:
						tjName = 'bjs';
						break;
					case 5:
						tjName = 'byl';
						break;
					case 6:
						tjName = 'bcj';
						break;
					case 7:
						tjName = 'bkj';
						break;	
					case 8:
						tjName = 'bjk';
						break;	
					case 9:
						tjName = 'bbg';
						break;		
				};

                var impctNum = 0;

				$.each(data['data'],function(k,v){
					if(k>=_min && k<_max){						
						if(v['remark'] == null){
							return true;
							
						}else{
							if(_this.start_num%_this.max_num == 0 && v['remark'].length == 3){
								bodyArr.push('<li><div class="dB_r" style="padding-left:0px;"><h2 style="margin-bottom:10px;"><a tj="'+tjName+(k+1)+'" href="'+v['url']+'">'+v['name']+'</a></h2><div class="three_icimg"><a tj="'+tjName+(k+1)+'" href="'+v['url']+'"><img src="'+v['remark'][0]['src']+'"><img src="'+v['remark'][1]['src']+'"><img src="'+v['remark'][2]['src']+'"></a></div><p style="clear:both"><span class="dB_tag">'+v['ali']+'</span>'+v['inputtime']+'  '+(v['pageclass']!=''?v['pageclass']:'东方网')+'</p></div></li>');	
							}else{
								bodyArr.push('<li><div class="dB_l"><a tj="'+tjName+(k+1)+'" href="'+v['url']+'"><img src="'+v['remark'][0]['src']+'"></a></div><div class="dB_r"><h2><a tj="'+tjName+(k+1)+'" href="'+v['url']+'">'+v['name']+'</a></h2><p><span class="dB_tag">'+v['ali']+'</span>'+v['inputtime']+'  '+(v['pageclass']!=''?v['pageclass']:'东方网')+'</p></div></li>');																
							}
							_this.start_num++;
                            _this.start_limit++;
                            impctNum++;
						};
					};
				});
				$('#bodyInfo').append(bodyArr.join(''));

                if(_this.isAddChangeBodyBanner) {
                    _this.getAddBanner(impctNum);
                }
			},
            isAddChangeBodyBanner:false,
            getAddBanner:function (impctNum) {
                var _this = this;
                if(!window.lazyLoadeMsgBanner) {
                    return;
                }

                window.callback_adv_get_data = function(r){
                    if(r && r.ads && r.ads.length) {
                        _this.getAdvData(r, _this.start_limit - impctNum, impctNum)
                    }
                    _this.start_reqtimes++;
                };

                //懒加载信息广告注释
                var impct = ~~(impctNum/4)
                    impct += (impctNum%4 ? 1 : 0);
                var showid = '1IFPDm';
                var _href = location.href;
                if(_href.indexOf('hao.ylmf.com') != -1) {
                    showid = 'NjxZqe';
                }else if(_href.indexOf('114la.cn') != -1) {
                    showid = 'qkVNhG';
                }
                // showid = 'RSBpV9';
                var url = '//show.g.mediav.com/s?type=1&of=4&newf=1&reqtimes='+_this.start_reqtimes+'&impct='+impct+'&showid='+showid+'&uid=14703100938272515666870689766453&jsonp=callback_adv_get_data';
                if(location.href.indexOf('https://') != -1) {
                    url = '//show-g.mediav.com/s?type=1&of=4&newf=1&reqtimes='+_this.start_reqtimes+'&impct='+impct+'&scheme=https&showid='+showid+'&uid=14703100938272515666870689766453&jsonp=callback_adv_get_data'
                }

                var _ = function (cb) {
                    if(!window.ILData) {
                        Ylmf.ScriptLoader.Add({
                            src:'//api.114la.com/ip',
                            charset:'gb2312',
                            callback:function () {
                                if(ILData[0] == '101.231.157.225') {
                                    cb();
                                }else if(ILData[2] != '北京' && ILData[2] != '上海') {
                                    cb();
                                }
                            }
                        })
                    }else {
                        if(ILData[2] != '北京' && ILData[2] != '上海') {
                            cb();
                        }
                    }
                }



                _(function () {
                    Ylmf.ScriptLoader.Add({
                        src:url
                    });
                })
            },
            //缓存广告与滚动、点击爆光
            advDataCache:(function(){
                var advCache = {};
                var _this = this;

                var bulidIMG = function (URL) {
                    var img = new Image(),
                        key = 'mediav_sio_log_' + Math.floor(Math.random() *
                            2147483648).toString(36);
                    window[key] = img;
                    img.onload = img.onerror = img.onabort = function() {
                        img.onload = img.onerror = img.onabort = null;
                        window[key] = null;
                        img = null;
                    };
                    img.src = URL;
                }

                $(window).off('scroll.advDataScroll').on('scroll.advDataScroll', function(){
                    var scrollTop = $(this).scrollTop();
                    var delCache = [];
                    for(var i in advCache) {
                        var obj = advCache[i];
                        var $node = obj.node;
                        var item = obj.item;
                        var imptk = item.imptk || [];
                        if(scrollTop + $(this).height() >=  $node.offset().top ) {
                            for(var k=0;k<imptk.length;k++) {
                                bulidIMG(imptk[k]);
                            }
                            delCache.push(i);
                        }
                    }
                    for(var i=0;i<delCache.length;i++) {
                        delete advCache[delCache[i]];
                    }
                });

                return {
                    clear:function () {
                        advCache = {};
                    },
                    add:function (key, node, item) {
                        advCache[key] = {
                            node:node,
                            item:item
                        }
                        node.on('click', function () {
                            var clktk = item.clktk || [];
                            for(var i=0;i<clktk.length;i++) {
                                bulidIMG(clktk[i]);
                            }
                        })
                    },
                    remove:function (key) {
                        delete advCache[key];
                    },
                    get:function () {
                        return advCache;
                    }
                }
            })(),
            //广告数据格式生成DOM插入
            getAdvData:function (data, start, num) {

                var formatmodel = function(str,model){
                    for(var k in model){
                        var re = new RegExp("{"+k+"}","g");
                        str = str.replace(re,model[k]);
                    }
                    return str;
                }
                var _this = this;
                var ads = data.ads;
                var $children = $('#bodyInfo').children().filter('[ads!=1]');
                for(var i=start;i<=num+start;i++) {
                    ;(function (ind) {
                        if(ind%4 == 0) {
                            var $node = $children.eq(ind-1);
                            var item = ads[ ((ind + 1 - start) /4)  - 1 ];
                            if(!item) {
                                return;
                            }
                            var tpl;
                            switch(item.type*1) {
                                case 1:
                                    tpl = '<li ads="1">'+
                                                '<div class="dB_l">'+
                                                    '<a href="{curl}" target="_blank"><img src="{img}" /></a>'+
                                                '</div>'+
                                                '<div class="dB_r">'+
                                                    '<h2><a href="{curl}" target="_blank">{title}</a></h2>'+
                                                    '<p><span class="dB_tag">广告</span>来源：{src} {desc}</p>'+
                                                '</div>'+
                                            '</li>';
                                break;
                                case 2:
                                    var imgs = [];
                                    var len = item.assets.length > 3 ? 3 : item.assets.length;
                                    for(var k=0;k<len;k++) {
                                        var _item = item.assets[k];
                                        imgs.push('<a href="'+_item.curl+'" target="_blank"><img src="'+_item.img+'" /></a>')
                                    }
                                    item['imgs'] = imgs.join('');
                                    tpl = '<li ads="1">'+
                                                '<div class="dB_r" style="padding-left:0px">'+
                                                    '<h2 style="margin-bottom:10px;">'+
                                                        '<a href="{curl}">{title}</a>'+
                                                    '</h2>'+
                                                    '<div class="three_icimg">'+
                                                        '{imgs}'+
                                                    '</div>'+
                                                    '<p style="clear:both"><span class="dB_tag">广告</span>来源：{src} {desc}</p>'+
                                                '</div>'+
                                            '</li>'
                                break;
                                case 3:
                                    tpl = '<li ads="1">'+
                                                '<div class="dB_r" style="padding-left:0px">'+
                                                    '<h2 style="margin-bottom:10px;">'+
                                                        '<a href="{curl}">{title}</a>'+
                                                    '</h2>'+
                                                    '<div class="icimg">'+
                                                        '<a href="{curl}"><img src="{img}" /></a>'+
                                                    '</div>'+
                                                    '<p style="clear:both"><span class="dB_tag">广告</span>来源：{src} {desc}</p>'+
                                                '</div>'+
                                            '</li>'
                                break;
                            }
                            if($node.length && tpl) {
                                var $nodeAds = $(formatmodel(tpl, item));
                                _this.advDataCache.add(ind, $nodeAds, item);
                                $node.after($nodeAds);
                            }
                        }
                    })(i);
                }
            },
			showJT : function(){
				if(!!document.getElementById('FixNav1')){
					
				}
			}
		};
		var w_Base = new DownInfo();
		window.w_Base = w_Base;
		$(window).on('scroll', function(){
            w_Base.dSc();
            //信息流广告默认从指定位置加载
            if(!w_Base.isAddChangeBodyBanner && window.lazyLoadeMsgBanner) {
                var $ShopBlock = $('#ShopBlock'),
                    scrollTop = $(this).scrollTop();

                if($ShopBlock.length) {
                    var _shopTop = $ShopBlock.offset();
                    if( scrollTop + $(this).height() >= _shopTop.top) {
                        w_Base.isAddChangeBodyBanner = true;
                        w_Base.getAddBanner(20);
                    }
                }else {
                    w_Base.isAddChangeBodyBanner = true;
                    w_Base.getAddBanner(20);
                }
            }

        });
	}
})();
