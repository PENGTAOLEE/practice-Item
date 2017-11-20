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
    function ban(n) {
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
$.fn.fortab = function(files,btn,div,n,load,ev){
	var btns = $(this).find(btn),
	boxes=$(this).find(div),cr=n?n:0,_work=false,tabTimeout=null;
	var _ev = ev ? ev:"mouseover";
	btns.on(_ev,function(e){
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
	function tab(index){
		if(_work==true) return;
		_work=true;
		boxes.eq(cr).fadeOut(200,function(){
			boxes.eq(index).fadeIn(200,function(){_work=false;});
			if(/^\s*$/.test(boxes.eq(index).html())){Tools.loadfile(boxes.eq(index),files[index]);}
		});
		btns.eq(cr).removeClass("active");
		btns.eq(index).addClass("active");
		cr=index;
		if(load){Cookie.set(load[1],index);}
	}
	if(load){
		var _n = Cookie.get(load[1]) ? Cookie.get(load[1]):load[0];
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
	var _ev = ev ? ev:"mouseover";
	btns.on(_ev,function(e){
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
	function tab(index){
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
	loadfile:function(div,file,callback){
		$.ajax({ 
		  type:'get', 
		  dataType:'html', 
		  url:file,
		  beforeSend:function(){div.css("position","relative");div.html("<img class='loading' src='static/images/loading.gif' />");},
		  success:function(data){div.html(data)},
		  complete: function(){div.css("position","");if(callback!=undefined){callback();}}
	  });
	},
	load_part:function(n){
		var obj = $("#"+Cr_LoadOrder[n]+"Block");
		var file = Files[Cr_LoadOrder[n]];
		Tools.loadfile(obj,file,function(){Tools.up_down();});		
	},
	sc_load:function(obj){
		window.Cr_LoadOrder = Cookie.get(Config.Ck_LoadOrder) ? Cookie.get(Config.Ck_LoadOrder).split(","):Config.LoadOrder;    //得出加载顺序id
        if(!Cookie.get(Config.Ck_LoadOrder)){Cookie.set(Config.Ck_LoadOrder,Config.LoadOrder)}
        window.Load_n = 0;    //当前加载到第几块
        window.Load_Max = Cr_LoadOrder.length;    //最多加载块数
        for(var i=Load_n;i<Load_Max;i++){
	        obj.eq(i).attr("id",Cr_LoadOrder[i]+"Block");
	        $("#FixNav ul .ToTop").before(Config.FixNavLi[Cr_LoadOrder[i]]);
	    }    //给对象加id 右侧导航加内容
	    $("#FixNav").slideDown(1000);
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
			// if(fri&&_top>=360){$("#FixNav .ToTop").fadeIn();}
		}
		sc(true);
		setTimeout(function(){sc(true);},1500);
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
		Cookie.set(Config.Ck_LoadOrder,_order);
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
        function play(){
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
var BaiduTn = {tn: "hkxs_1_pg",ch: "10"};
var Config = {
    LoadOrder:["Video","Game","Shop","Relax"],    //默认加载顺序
    Ck_LoadOrder:"LoadOrder",   //记录加载顺序cookie名
    Df_Video:[0,"VideoLoad"],   //视频块默认加载第n个切换及其cookie名
    Df_Game:[0,"GameLoad"],   //游戏块默认加载第一个切换及其cookie名
    Df_Relax:[0,"RelaxLoad"],   //放松块默认加载第一切换及其cookie名
    Ck_bank:"Bank2015",  //记录银行cookie名
    FixNavLi:{
	    "Video":"<li class='n1'><a href='javascript:void(0);' target='_self'><span></span>看片</a></li>",
	    "Game":"<li class='n2'><a href='javascript:void(0);' target='_self'><span></span>游戏</a></li>",
	    "Shop":"<li class='n3'><a href='javascript:void(0);' target='_self'><span></span>购物</a></li>",
	    "Relax":"<li class='n5'><a href='javascript:void(0);' target='_self'><span></span>放松</a></li>"
    },
    defaultTheme:"normal",
    Search : {
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
            url: "http://v.baidu.com/v",
            params: {
                ie:"utf-8",
                tn: BaiduTn.tn,
                ch: BaiduTn.ch
            }
        },
        music:{
            action: "http://mp3.baidu.com/m",
            name: "word",
            btn: "百度一下",
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
            action: "http://image.baidu.com/i",
            name: "word",
            btn: "百度一下",
            img: ["public4/rebuild/images/s/pic.gif?v2.0", "百度图片"],
            url: "http://image.baidu.com/",
            params: {
                ct: "201326592",
                cl: "2",
                pv: "",
                lm: "-1",
                ie: 'utf-8'
            }
        },
        zhidao:{
            action: "http://zhidao.baidu.com/q",
            name: "word",
            btn: "百度一下",
            img: ["public4/rebuild/images/s/zhidao.gif?v2.0", "百度知道"],
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
            img: ["public4/rebuild/images/s/yesky.gif", "中关村"],
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
            url: "http://map.baidu.com/",
            params: {
                 ie: 'utf-8'
            }
        },
        computer: {
            action: "http://search.yesky.com/searchproduct.do",
            name: "wd",
            btn: "搜 索",
            img: ["public4/rebuild/images/s/yesky.gif", "天极电脑"],
            url: "http://product.yesky.com/",
            params: {
                ie: "utf-8"
            }
        },
        gouwu:{
            action: "http://search8.taobao.com/browse/search_auction.htm",
            name: "q",
            url: "http://www.taobao.com/",
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
        action: "http://zx.passport.189.cn/Logon/UDBCommon/S/PassportLogin.aspx?PassportLoginRequest=3500000000400101%243qGTaeZcFhxvAWjKmUNeSXwAgn1LsgB7Baj1rQn96XNKuzpE%2baP%2b9Q6CDg1Bqmrnosfrnoa6ujbo%0aBzYxmWBAESIoGVwlaoSM4%2fMixUkU7%2fAcJ0L4Yrckifcqhk3rO22i",
        params: {
            __VIEWSTATE: "/wEPDwUKMTYxODg2ODExNQ9kFgJmD2QWDgIBDxYCHgVzdHlsZQUSdmlzaWJpbGl0eTp2aXNpYmxlFgICAQ8PFgIeBFRleHQFG+eUqOaIt+WQjeaIluWvhueggemUmeivr+OAgmRkAg0PDxYEHgtOYXZpZ2F0ZVVybAVIaHR0cDovL3Bhc3Nwb3J0LjE4OS5jbi9TZWxmUy9ML1JlZy9TZWxlY3QuYXNweD9EZXZpY2VObz0zNTAwMDAwMDAwNDAwMTAxHwEFByDms6jlhoxkZAIPDw8WAh8BBTRodHRwOi8vd3d3LjE4OS5jbi93ZWJtYWlsL2pzcC8xODltaXNjL3Y1L2Nzcy91ZGIuY3NzZGQCEQ8PFgIfAQUtaHR0cDovL3dlYm1haWw1LjE4OS5jbi93ZWJtYWlsL1VEQkxvZ2luUmV0dXJuZGQCEw8PFgIfAQUQMzUwMDAwMDAwMDQwMDEwMWRkAhUPDxYCHwEFDDEyNC4yMDUuNzcuOWRkAhcPDxYCHwEFDHZCWWdGcWRydTVrPWRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQtjYl9TYXZlTmFtZYevyftAQT5CX9s2VZJOrPsTLqDH",
            __EVENTVALIDATION: "/wEWCQLckeONBALT8dy8BQKd+7qdDgK/8ZbBBQKhwImNCwK1yJy1AQLhyKz0DgKh/9zICgKnqZGuBiPwFoYTVzM5HAbhLCKRJWRuEyet",
            txtUserID: "#{u}",
            txtPwd: "#{p}"
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
    function LB_size(){
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
    function overPage(obj,up) {
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
        if(moving){event.preventDefault();}
        var _this = $(this);
        var up = delta > 0 ? true:false;
        var I = $(this).find(".ChangeBtn i");
        var _up = I.hasClass("down") ? false:true;
        if((_up&&!up)||(!_up&&up)){
            event.preventDefault();
            overPage(_this,up);
        }
    }); 
    $("#LS_xw .imgBox ul").eq(0).tabimg(5000);
    $("#LS_xw .imgBox ul").eq(1).tabimg(5000);
    $("#LS_xc .imgBox ul").eq(0).tabimg(5000);
    $("#LS_xc .imgBox ul").eq(1).tabimg(5000);
    $("#LS_yx .imgBox ul").eq(0).tabimg(5000);
    $("#LS_yx .imgBox ul").eq(1).tabimg(5000);
    $(".Content .headline .imgBox").tabimg(5000);
    $(".Content .Same").eq(0).fortab(Files.Lpart1, ".til a", ".Re_Box");
    $(".Content .Same").eq(1).fortab(Files.Lpart2, ".til a", ".Re_Box", 3);
    $(".Content .Same").eq(2).fortab(Files.Lpart3, ".til a", ".Re_Box");
    $(".Content .Shop").nortab(".til a", ".Box");
    $(".Content .Tools").nortab(".til a", ".Tbox .Tab");
    //主内容左边部分 end
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
    var CitySelecter = new CityPicker("#TrainStar", "#TrainCity");
    var CitySelecter2 = new CityPicker("#TrainEnd", "#TrainCity");
    var CitySelecter3 = new CityPicker("#FlyStar", "#FlyCity");
    var CitySelecter4 = new CityPicker("#FlyEnd", "#FlyCity");
    var CitySelecter5 = new CityPicker("#HotelCity", "#FlyCity");
    var TrainDate = new DateInput("#TrainDate", {},
    true);
    var FlyDate = new DateInput("#FlyDate", {},
    true);
    var HotelDate = new DateInput("#HotelDate", {},
    true);
    IdFocus(["TrainStar", "TrainEnd", "TrainDate"], "TrainSubmit");
    IdFocus(["FlyStar", "FlyEnd", "FlyDate"], "FlySubmit");
    IdFocus(["HotelCity", "HotelDate", "HotelName"]);
    //火车机票等 end
    Skin.Login_out();
    Tools.sc_load($(".AllWrap .SameBox"));
    Tools.verticalTab($(".header .handle .xiaohua"),5000);
})();

//银行有关
;(function(){
    var bankShowTimmer,bankHideTimmer;
    $("#bank").hover(function(){
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
        now_bank.html(_text+"<i></i>");
        if(login.Logined){user_change_bank(_href,_text)}
        else{Cookie.set(Config.Ck_bank,_href+","+_text);}
        $("#bank_list").slideUp(200);
    });
    if(Cookie.get(Config.Ck_bank)){loadbank(Cookie.get(Config.Ck_bank));}
    else{loadbank("http://www.icbc.com.cn/icbc/,工商银行");}
    function loadbank(obj){
        if(obj){
          var now_bank = $("#bank");
          var _href = obj.split(",")[0];
          var _text = obj.split(",")[1];
          now_bank.html(_text+"<i></i>");
          now_bank.attr("href",_href);
        }
    }
})();
