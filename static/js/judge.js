//路径数组
var all_files = {
	"channel":["sub/3210.htm","sub/3240.htm","sub/3220.htm","sub/3230.htm","sub/3250.htm"],
	"md_shop":["","sub/taobaoShop.htm"],
	"md_game":["","sub/webGame.htm","sub/smallGame.htm"],
	"md_video":["","sub/moviesVideo.htm","sub/tvVideo.htm","sub/zongyiVideo.htm"],
	"md_joke":["","sub/meinvJoke.htm","sub/huabianJoke.htm"],
	"live":["","sub/jipiao.htm","sub/jiudian.htm","sub/caipiao.htm","sub/lvyou.htm"],
	"CI":["sub/channel.htm","sub/infor.htm"],
	"news":["sub/newspart1.htm","sub/newspart2.htm"],
	"news_tip":["<div class='news newsRow newsRow1 Special'></div>","<div class='news newsRow newsRow2 Special' id='newsRow2'></div>"],
	"video_3":["","sub/video-3-2.htm","sub/video-3-3.htm"],
	"video_4":["","sub/video-4-2.htm","sub/video-4-3.htm","sub/video-4-4.htm","sub/video-4-5.htm","sub/video-4-6.htm","sub/video-4-7.htm"],
	"video":["sub/video-1.htm","sub/video-2.htm","sub/video-3.htm","sub/video-4.htm"],
	"video_tip":["<div class='mbox video video1 Special'></div>","<div class='mbox video video2 Special'></div>","<div class='mbox video video3 Special'></div>","<div class='mbox video video4 Special'></div>"],
	"shop":["sub/shop-1.htm","sub/shop-2.htm","sub/shop-3.htm","sub/shop-4.htm","sub/shop-5.htm"],
	"shop_tip":["<div class='mbox sp_row sp_row1 Special' id='sp_row1'></div>","<div class='mbox sp_row sp_row2 Special' id='sp_row2'></div>","<div class='mbox sp_row sp_row3 Special' id='sp_row3'></div>","<div class='mbox sp_row sp_row4 Special' id='sp_row4'></div>","<div class='mbox sp_row sp_row5 Special' id='sp_row5'></div>"]
} 
var upData_h = new Date().getDate().toString() +  new Date().getHours().toString();
setInterval(function(){upData_h = new Date().getDate().toString() +  new Date().getHours().toString();},60*60*1000);
;(function(){
	var newsType = Cookie.get("newstype");
	if(newsType == "6211")newsType=null;
	if(newsType){
		all_files.news[1] = "sub/newspart2-" + newsType + ".htm";
	}

	$("#newsRow2 .row2Item").live("click",function(){
		var _newsType = $(this).attr("newstype");
		Cookie.set("newstype",_newsType);
		if(_newsType != "6211"){
			all_files.news[1] = "sub/newspart2-" + _newsType + ".htm";
		}else{
			all_files.news[1] = "sub/newspart2.htm";
		}
		
	});
})();
var My_normal,My_game,My_stock,My_selected,Special;
var my_layout={};
my_layout.My_normal={};
my_layout.My_game={};
my_layout.My_stock={};
var current_ly;
function toarry(name,str){
	var _arry = str.split(",");
	if(_arry[0]==2){name.md=3;Cookie.set("My_game",str.replace(/2/i,"3"));}//换位
	else{name.md=_arry[0];}
	name.channel=_arry[1];
	name.id_sq=_arry.slice(2,_arry.length);
}
function load_cr_ly(fri){
  toarry(my_layout.My_normal,My_normal);
  toarry(my_layout.My_game,My_game);
  toarry(my_layout.My_stock,My_stock);
  if(fri){
	  my_layout.selected=My_selected;
	  if(My_Layout[my_layout.selected].special){
		Special=true;
		current_ly = My_Layout[my_layout.selected].md;
		Ylmf.ScriptLoader.Add({
		  src: "static/js/special.js",
		  charset: "utf-8"
		});
	  }
	  else{
		Special=false;
		current_ly = my_layout[my_layout.selected];
		Ylmf.ScriptLoader.Add({
		  src: "static/js/general.js",
		  charset: "utf-8"
		});
	  };
  }
  else{
	  if(!Special){load_ly();}
	  if(login.Logined){user_change_ly();}
	  else{Cookie.set("My_selected",my_layout.selected);}
  }
}
function user_change_ly(){
	var md = Special ? current_ly:current_ly.md;
	var channel = Special ? 0:current_ly.channel;
	var id_sq = Special ? "0,1,2,3,4":current_ly.id_sq;
	if(md==2){md=3}
	else if(md==3){md=2} //换位
	$.ajax({
		  url:"http://my.114la.com/api/index.php?c=api&a=setindextcb&appkey=26a12af305d876a677aa&templateid="+md+"&channelid="+channel+"&blockid="+id_sq, 
		  type:"GET", 
		  dataType:'jsonp'
	});
}
function loadjsonp(json){
  for(var i=0;i<Layout.md.length;i++){
	if(json.data[i].template_id==0){My_normal = +json.data[i].template_id+","+json.data[i].channel_id+","+json.data[i].block_id;}
	if(json.data[i].template_id==2){My_game = +json.data[i].template_id+1+","+json.data[i].channel_id+","+json.data[i].block_id;}
	if(json.data[i].template_id==4){My_stock = +json.data[i].template_id+","+json.data[i].channel_id+","+json.data[i].block_id;}
  } 
  if(typeof(Special)!="undefined"){load_cr_ly();}
  else{My_selected = json.data.selected;load_cr_ly(true);}
  Skin.Login_in(json.data.skin);     //皮肤有关
}
function loginINjsonp(json){
	user_change_ly();
	Skin.Login_in(json.data.skin);
}
function cookie_ly(){
  My_normal = Cookie.get("My_normal");
  if(!My_normal){
	  var _mynormal = +My_Layout.My_normal.md+","+My_Layout.My_normal.channel+","+My_Layout.My_normal.id_sq;
	  Cookie.set("My_normal",_mynormal);
	  My_normal = _mynormal;
  };	
  My_game = Cookie.get("My_game");
  if(!My_game){
	  var _mygame = +My_Layout.My_game.md+","+My_Layout.My_game.channel+","+My_Layout.My_game.id_sq;
	  Cookie.set("My_game",_mygame);
	  My_game = _mygame;
  };
  My_stock = Cookie.get("My_stock");
  if(!My_stock){
	  var _mystock = +My_Layout.My_stock.md+","+My_Layout.My_stock.channel+","+My_Layout.My_stock.id_sq;
	  Cookie.set("My_stock",_mystock);
	  My_stock = _mystock;
  };
  if(typeof(Special)!="undefined"){load_cr_ly();}
  else{
	  My_selected = Cookie.get("My_selected");
	  if(!My_selected){Cookie.set("My_selected",My_Layout.selected);My_selected=My_Layout.selected;};
	  load_cr_ly(true);
  }
  Skin.Login_out(); //皮肤有关
}
if(login.Logined){
  Ylmf.ScriptLoader.Add({
	  src: "http://my.114la.com/api/index.php?c=api&a=getindextcb&appkey=26a12af305d876a677aa&callback=loadjsonp",
	  charset: "utf-8"
  });
}
else{cookie_ly();}

$(".personalized-custom-container .con ul li").live("click",function(event){
    
	if($(this).hasClass("current")){return;}
	var sp = [1,2,5]; 
	var n = $(this).index(),_n=0;
	if(n==1){_n=n;n=5;}
	else if(n>1){_n=n;n--;};
	var md_cr = _n;
	var md_all = $(".personalized-custom-container ul li");	
	var _current = $(".personalized-custom-container ul li.current");
	if(_current.length>0){
		var cr_src = _current.find("img").attr("src");
		_current.find("img").attr("src",cr_src.replace(/gif/g,"png"));
		_current.removeClass("current");
	};
	var _src = md_all.eq(md_cr).find("img").attr("src");
	md_all.eq(md_cr).find("img").attr("src",_src.replace(/png/g,"gif"));
	md_all.eq(md_cr).addClass("current");
	if(Special){
		if(window['News_On_Off']){
			window['News_On_Off'].Disabled();
		};
		if($.inArray(n,sp)>=0){
			current_ly = n;
			Skin.ly_skin(My_skin[current_ly]);
			my_layout.selected = "My_"+Layout.md[n];
			s_load_ly(true);
			if(login.Logined){user_change_ly();}
			else{Cookie.set("My_selected",my_layout.selected);}
		}
		else{
            try{load_ly();}
			catch(e){
				Ylmf.ScriptLoader.Add({
				  src: "static/js/general.js",
				  charset: "utf-8"
				});
			}
			Special = false;
			my_layout.selected = "My_"+Layout.md[n];
			current_ly = my_layout[my_layout.selected];
			if(login.Logined){user_change_ly();}
			else{Cookie.set("My_selected",my_layout.selected);}
			//判断
			var cr_str = current_ly.channel + "," +current_ly.id_sq;
			var df_str = My_Layout[my_layout.selected].channel + "," + My_Layout[my_layout.selected].id_sq;
			if(cr_str != df_str){$(this).find("b.load_Df").stop(false,true).animate({"bottom":0},300);}
			//更改皮肤
			Skin.ly_skin(My_skin[current_ly.md]);
		}
	}
	else{
		if($.inArray(n,sp)>=0){ 
			for(var i=0;i<Layout.id_sq.length;i++){$("#"+Layout.id_sq[i]).remove();}
			try{s_load_ly();}
			catch(e){
				Ylmf.ScriptLoader.Add({
				  src: "static/js/special.js",
				  charset: "utf-8"
				});				
			}
			current_ly = n;
			Special = true;       
			Skin.ly_skin(My_skin[current_ly]);
			my_layout.selected = "My_"+Layout.md[n];
			if(login.Logined){user_change_ly();}
			else{Cookie.set("My_selected",my_layout.selected);}
		}
		else{
			my_layout.selected = "My_"+Layout.md[n];
			current_ly = my_layout[my_layout.selected];
			if(login.Logined){user_change_ly();}
			else{Cookie.set("My_selected",my_layout.selected);}
			load_ly();
			//判断
			var cr_str = current_ly.channel + "," +current_ly.id_sq;
			var df_str = My_Layout[my_layout.selected].channel + "," + My_Layout[my_layout.selected].id_sq;
			if(cr_str != df_str){$(this).find("b.load_Df").stop(false,true).animate({"bottom":0},300);}
			//更改皮肤
			Skin.ly_skin(My_skin[current_ly.md]);
		}
	}
    
    
    //tjj 统计
    var Count = new Image();
    var _id = $(this).attr("id");
    var _txt = $(this).find("em").text();
    var _tagName = event.target || event.srcElement;
    
    _tagName = _tagName.tagName.toLowerCase();
    _tagName = _tagName == "img" ? "":"-Txt";
    var _url = "http://www.tjj.com/index?u=" + encodeURIComponent("http://www.114la.com/new/" + _id + _tagName + ".html") + "&n=" + encodeURIComponent(_txt) + "&q=0&tj=&i=1428907031159&uid="+ YLMF.UID;
    Count.src = _url;
    
    //KeywordCount({
    //    u: L,
    //    n: T,
    //    q: 0,
    //    tj: obj.getAttribute('tj') || ""
    //});
});

$("#fix_nav ul li a").live("click",function(){
	var _h = $("body").hasClass("widthScreen") ? 82:75;
	var _i = $(this).parent().index(),obj;
	if(_i==0) return;
	if(Special){
		obj = $(".Special");
		_i--;
		if(_i==max_lf){$('html,body').animate({scrollTop:0},500);return;}
		var _t = obj.eq(_i).offset().top;
		$('html,body').animate({scrollTop:_t-_h},500,function(){if(_i>_lf&&_i!=max_lf+1){while(_lf<max_lf){_lf++;loadfile($(".Special").eq(_lf),all_files[My_Layout[my_layout.selected].files][_lf]);}}});
	}
	else{
		_i -= 2;
		if(_i==-2){return;}
		else if(_i==-1){obj=$(".channel-box");}
		else if(_i==5){$('html,body').animate({scrollTop:0},500);return;}
		else{obj=$("#"+Layout.id_sq[current_ly.id_sq[_i]]);}
		var _t = obj.offset().top;
		$('html,body').animate({scrollTop:_t-_h},500,function(){if(_i>_sq&&_i!=5){while(_sq<max_sq){_sq++;load_md(_sq);}}});
	}
});
$(".personalized-custom-container ul li b.load_Df").click(function(){   //恢复默认模板配置
	my_layout[my_layout.selected].channel = My_Layout[my_layout.selected].channel;
	my_layout[my_layout.selected].id_sq = My_Layout[my_layout.selected].id_sq.concat();
	current_ly = my_layout[my_layout.selected];
	var new_md = +current_ly.md+","+current_ly.channel+","+current_ly.id_sq;
	if(login.Logined){user_change_ly();}
	else{Cookie.set(my_layout.selected,new_md);}
	_sq = _mix;
	max_sq = _max;
	load_ly();
	$(this).stop(false,true).animate({"bottom":"-30px"},300);
});

$(".top-panel a.btn-custom").click(function(){
	var _obj = $(".personalized-custom-container");
	if(_obj.is(":visible")){_obj.slideUp(300);$(this).find("i").attr("class","arrow-down");}
	else{_obj.slideDown(300);$(this).find("i").attr("class","arrow-up");}
});
$(".personalized-custom-container .con .close").click(function(){$(this).parents(".personalized-custom-container").slideUp(300);});
$(".personalized-custom-container").mouseleave(function(){var _this = $(this);setTimeout(function(){_this.slideUp(300);$("a.btn-custom i").attr("class","arrow-down");},300);});
//换个性定制
var gif_timeout;
$(".personalized-custom-container .con ul li").hover(function(){
	  if($(this).hasClass("current")){
		  var cr_str = current_ly.channel + "," +current_ly.id_sq;
		  var df_str = My_Layout[my_layout.selected].channel + "," + My_Layout[my_layout.selected].id_sq;
		  if(cr_str == df_str){return;}
		  else{$(this).find("b.load_Df").stop(false,true).animate({"bottom":0},300);}
	  }
	  else{
		  clearTimeout(gif_timeout);
		  var _src = $(this).find("img").attr("src");
		  $(this).find("img").attr("src",_src.replace(/png/g,"gif"));
		  var cr_src = $(this).siblings(".current").find("img").attr("src");
		  $(this).siblings(".current").find("img").attr("src",cr_src.replace(/gif/g,"png"));
	  }
  },function(){
	  if($(this).hasClass("current")){
		  $(this).find("b.load_Df").stop(false,true).animate({"bottom":"-30px"},300);
	  }
	  else{
		  var _src = $(this).find("img").attr("src");
		  $(this).find("img").attr("src",_src.replace(/gif/g,"png"));
		  var _img = $(this).siblings(".current").find("img");
		  var cr_src = _img.attr("src");
		  gif_timeout = setTimeout(function(){_img.attr("src",cr_src.replace(/png/g,"gif"));},500);
	  }
});
YLMF.addListener({
  login : function(data){
	Ylmf.ScriptLoader.Add({
	  src: "http://my.114la.com/api/index.php?c=api&a=getindextcb&appkey=26a12af305d876a677aa&callback=loadjsonp",
	  charset: "utf-8"
	});		  
	Ylmf.ScriptLoader.Add({
	  src: "http://my.114la.com/api/index.php?c=api&a=getindexinfo&appkey=26a12af305d876a677aa&callback=user_loadbank&infotype=bank",
	  charset: "utf-8"
	});
	if(typeof(new_sp)!="undefined"){
	  Ylmf.ScriptLoader.Add({
		  src: "http://my.114la.com/api/index.php?c=api&a=getindexinfo&appkey=26a12af305d876a677aa&callback=user_returnstock&infotype=stock",
		  charset: "utf-8",
		  callback:function(){
			  var _ss = user_cstr.split(",");
			  d_name = _ss;
			  new_sp.GetCustomData(_ss);
			  new_sp.Display(_ss);
		  }
		});
	}
  },
  logout : function(){
	  cookie_ly();
	  loadbank(Cookie.get("My_bank"));
	  if(typeof(new_sp)!="undefined"){
		var _ss = Cookie.get("stock").split(",");
	    d_name = _ss;
		new_sp.GetCustomData(_ss);
		new_sp.Display(_ss);
	  }
  }  
});
var preventDefault = function(){this.returnValue = false;};
function geteven(c){var f=c||window.event;if(!f){var g=this.getEvent.caller;while(g){f=g.arguments[0];if(f&&(Event==f.constructor||MouseEvent==f.constructor)){break}g=g.caller}}return f}
//tab切换
$.fn.fortab = function(files){	
	var btns = $(this).find("h3 a"),
	boxes=$(this).find(".fortab"),cr=0,_work=false;
	btns.click(function(e){
		var index = $(this).index();
		if(cr==index){return;}
		else{ 
		  var _event = geteven(e);
          _event.preventDefault();
		  if(_work==true){return;}
		  else{
			_work=true;
			boxes.eq(cr).fadeOut(200,function(){
				boxes.eq(index).fadeIn(200,function(){_work=false;});
				if(/^\s*$/.test(boxes.eq(index).html())){loadfile(boxes.eq(index),files[index]);}
			});
			btns.eq(cr).removeClass("current");
			btns.eq(index).addClass("current");
			cr=index;
		  }
		}
	});
}
$.fn.nortab = function(btn,div){	
	var btns = $(this).find(btn),
	boxes=$(this).find(div),cr=0,_work=false;
	btns.click(function(e){
		var index = $(this).index();
		if(cr==index){return;}
		else{
		  var _event = geteven(e);
          _event.preventDefault();
		  if(_work==true){return;}
		  else{
			_work=true;
			boxes.eq(cr).fadeOut(200,function(){boxes.eq(index).fadeIn(200,function(){_work=false;});});
			btns.eq(cr).removeClass("current");
			btns.eq(index).addClass("current");
			cr=index;
		  }
		}
	});
}
//图片轮播
$.fn.tabimg=function(speed)
{
	var _this = $(this);
	var num = $(this).find("li").length;
	_this.find("li:gt(0)").css("display","none");
	var par = $(this).parent();
	var btn;
    btn = "<i class='current'>1</i>";
    for(var i=1;i<num;i++){btn += "<i>"+(i+1)+"</i>";}
	par.find(".progress").append(btn);
	var _btn = par.find(".progress i");
	$(this).append("<i></i><s></s>");
	var i_btn = $(this).find("i");
	var s_btn = $(this).find("s");
	var move1 = false;
	var move2 = false;
	var nn=0;
	var auto2;
    function ban(n1,n2){
	   move2 = true;
	   _this.find("li").eq(n1).fadeOut(300,function(){_this.find("li").eq(n2).fadeIn(300,function(){move2 = false;nn=n2;});});   
	   _btn.eq(n1).removeClass("current");
	   _btn.eq(n2).addClass("current");
	   if(_this.hasClass("f_href")){var _href = _this.find("li").eq(n2).find("a").attr("href");$(".banner .href a").attr("href",_href);}//给主页轮播做超链接
	}
	_btn.click(function()
	{
		if(move2==true){return;}
		else{
		  var n2 = $(this).index();
		  var n1 = nn;
		  ban(n1,n2);
		}
	});
	i_btn.click(function(){
		if(move2==true){return;}
		else{if(nn>0){ban(nn,nn-1);}if(nn==0){ban(0,num-1);}}
	});
	s_btn.click(function(){
		if(move2==true){return;}
		else{if(nn<num-1){ban(nn,nn+1);}if(nn==num-1){ban(nn,0);}}
	});
	$(this).hover(function(){
		i_btn.stop(true,false).animate({"left":0},200);
		s_btn.stop(true,false).animate({"right":0},200);
	},function(){
		i_btn.stop(true,false).animate({"left":"-20px"},200);
		s_btn.stop(true,false).animate({"right":"-20px"},200);
	});	
	_this.hover(function(){move1=true;},function(){move1=false;}).trigger("mouseout");	
	auto2=setInterval(function(){
	   if(move2==true||move1==true){return;}
	   else{if(nn<num-1){ban(nn,nn+1);}if(nn==num-1){ban(nn,0);}}
	},speed);
}
//加载文件方法
function loadfile(div,file,callback){
	$.ajax({ 
	  type:'get', 
	  dataType:'html', 
	  url:file+"?"+upData_h,
	  beforeSend:function(){div.css("position","relative");div.html("<img class='loading' src='http://static.114la.com/public4/rebuild/images/loading2.gif' />");},
	  success:function(data){div.html(data)},
	  complete: function(){div.css("position","");if(callback!=undefined){callback();}}
  });
} 
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
})();
$("#bank_list a").click(function(){
	var now_bank = $("#bank").prev("a");
	var _href = $(this).attr("href");
	var _text = $(this).html();
	now_bank.attr("href",_href);
	now_bank.html(_text);
	if(login.Logined){user_change_bank(_href,_text)}
	else{Cookie.set("My_bank",_href+","+_text);}
});
if(login.Logined){
  Ylmf.ScriptLoader.Add({
	src: "http://my.114la.com/api/index.php?c=api&a=getindexinfo&appkey=26a12af305d876a677aa&callback=user_loadbank&infotype=bank",
	charset: "utf-8"
  });
}
else if(Cookie.get("My_bank")){loadbank(Cookie.get("My_bank"));};
function loadbank(obj){
	if(obj){
	  var now_bank = $("#bank").prev("a");
	  var _href = obj.split(",")[0];
	  var _text = obj.split(",")[1];
	  now_bank.html(_text);
	  now_bank.attr("href",_href);
	}
}
function user_loadbank(json){if(json.data==null){return;}else{if(json.data[0].info_value){loadbank(json.data[0].info_value);}}}
function user_change_bank(_href,_text){
  $.ajax({
    url:"http://my.114la.com/api/index.php?c=api&a=setindexinfo&appkey=26a12af305d876a677aa&infotype=bank&infovalue="+_href+","+_text, 
	type:"GET", 
	dataType:'jsonp'
  });
}