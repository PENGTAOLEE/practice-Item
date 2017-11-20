var My_skin,oSkinCss,curSkinValue,preViewSkin;
(function(){
    var themeShow = false,
        curAni = null,
        _theme = $("#theme"),
        skinStyleObj = $("#js_skinStyle"),
        themeChangeBtn = $("#themeChange a"),
        _jsXhr = null,
        cssPath = "static/css/theme/",
        themeTypePath = "sub/theme/",
        curPage = 0,
        maxPage = 1;
    YLMF.addEvents(["skinShow","skinHide"]);    
    var Skin = {
        init : function(){
            var me = this;
            $("#changeSkinBtn").click(function(){
                if(themeShow){
                    Skin.cancel();
                    Skin.hide();
                }else{
                    Skin.show();
                }
                //Skin.show();
            });
            
            me.skinTypeInit();
            $("#themeSortBtn a").click(function(){
                $("#themeSortBtn a").removeClass("current");
                $(this).addClass("current");
                me.loadSkinType($(this).attr("skintype"));
            });
            
            $("#themeUseDefault").click(function(){
               me.useDefault(); 
            });
            $("#themeCancelBtn").click(function(){
               me.cancel(); 
            });
            $("#themeSave").click(function(){
               me.save(); 
            });
            $("#themePre").click(function(){
                me.listPre();
            });
            $("#themeNext").click(function(){
                me.listNext();
            });
			$("#Ly_Default").click(function(){
                me.Ly_Default();
            });
            //for change page
            maxPage = $("#scrollContainer ul").size();
            
        },
        show : function(){
            themeShow = true;
            $("#themesContainer").stop().slideDown();
            YLMF.fireEvent("skinShow",this,null);
        },
        hide:function(){
            themeShow = false;
            $("#themesContainer").stop().slideUp();
            YLMF.fireEvent("skinHide",this,null);
        },
        preViewSkin : function(PvSkinName){
            preViewSkin = PvSkinName;
            $("#js_skinStyle").attr("href",cssPath + PvSkinName + ".css");
            this.updateCls();
        },
        loadSkinType : function(skinType){
            var me = this;
            $("#scrollContainer").html("");
            $("#scrollContainer").addClass("loadingBg");
            _jsXhr = $.ajax({
                url : themeTypePath + skinType + ".html",
                success:function(txt){
                    
                    $("#scrollContainer").html(txt);
                    $("#scrollContainer").removeClass("loadingBg");
                    me.skinTypeInit();
                }
            });
        },
        skinTypeInit:function(){
            var me = this;
            //console.log(preViewSkin);
            
            $("#scrollContainer li").click(function(){
                $("#scrollContainer li").removeClass("selected");
                $(this).addClass("selected");
                var _preViewSkin = this.getAttribute("skin");
                if(_preViewSkin){
                    me.preViewSkin(_preViewSkin);
                }
                
            });
            me.updateCls();
            curPage = 0;
            maxPage = $("#scrollContainer ul").size();
            //console.log(curSkinValue);
        },
        useDefault:function(){          
            curSkinValue = Config.defaultTheme;
            this.preViewSkin(Config.defaultTheme);
			this.record();
            this.hide();
			this.listen_df();
        },
		record:function(){
			var md = Special ? current_ly:current_ly.md;
			My_skin[md] = curSkinValue;
			if(login.Logined){
				var md = Special ? current_ly:current_ly.md;
				$.ajax({
				  url:"http://my.114la.com/api/index.php?c=api&a=setindextcb&appkey=26a12af305d876a677aa&templateid="+md+"&skin="+curSkinValue,
				  type:"GET", 
				  dataType:'jsonp'
				});
			}
			else{Cookie.set(Config.SkinCookieName,My_skin);}
		},
		Ly_Default:function(){
			var md = Special ? current_ly:current_ly.md;
			curSkinValue = My_Layout.skin[md];
			this.preViewSkin(curSkinValue);
			this.record();
			$("#Ly_Default").hide();
			this.hide();
		},
        cancel:function(){
            this.preViewSkin(curSkinValue);
            this.hide();
        },
        updateCls:function(){
            $("#scrollContainer li").removeClass("selected");
            $("#scrollContainer li").each(function(i,n){
                if($(n).attr("skin") == preViewSkin){
                    $(n).addClass("selected");
                }
            });
        },
        save:function(){
            //alert("ddd");
            curSkinValue = preViewSkin;
			this.record();
            this.hide();
			this.listen_df();
        },
		listen_df:function(){
			var md = Special ? current_ly:current_ly.md;
			if(My_skin[md]==My_Layout.skin[md]||current_ly.md==0){$("#Ly_Default").hide();}
			else{$("#Ly_Default").show();}
		},
        listNext:function(){
            //alert("next");
            if(curPage + 1 == maxPage){
                return;
            }
            curPage = curPage+1;
            $("#scrollContainer ul").hide().eq(curPage).show();
        },
        listPre:function(){
            //alert("pre");
            if(curPage == 0){
                return;
            }
            curPage = curPage - 1;
            $("#scrollContainer ul").hide().eq(curPage).show();
        },
		ly_skin: function(PvSkinName){
            Skin.preViewSkin(PvSkinName);
			curSkinValue = PvSkinName;
			this.listen_df();
        },
		Login_in:function(skins){
			My_skin = skins;
			if(My_skin[2]=="game"){
				My_skin[2]="video";
				$.ajax({
				  url:"http://my.114la.com/api/index.php?c=api&a=setindextcb&appkey=26a12af305d876a677aa&templateid=2&skin=video",
				  type:"GET", 
				  dataType:'jsonp'
				});
			}    //换位
			if(My_skin[3]=="video"){
				My_skin[3]="game";
				$.ajax({
				  url:"http://my.114la.com/api/index.php?c=api&a=setindextcb&appkey=26a12af305d876a677aa&templateid=3&skin=game",
				  type:"GET", 
				  dataType:'jsonp'
				});
			}  //换位
			oSkinCss=Special? My_skin[current_ly]:My_skin[current_ly.md];
			curSkinValue = oSkinCss;
			preViewSkin = curSkinValue;
			//console.log(curSkinValue);
            this.ly_skin(curSkinValue);
			this.listen_df();
		},
		Login_out:function(){
			My_skin=Cookie.get(Config.SkinCookieName);
			if(!My_skin){
				My_skin = My_Layout.skin;
				Cookie.set(Config.SkinCookieName,My_skin);
			}
			else{
				My_skin=My_skin.split(",");
				if(My_skin[2]=="game"){My_skin[2]="video";Cookie.set(Config.SkinCookieName,My_skin);}
				if(My_skin[3]=="video"){My_skin[3]="game";Cookie.set(Config.SkinCookieName,My_skin);}  //换位
				if(My_skin.length<My_Layout.skin.length){
				    for(var i=My_skin.length;i<My_Layout.skin.length;i++){My_skin.push(My_Layout.skin[i]);}
					Cookie.set(Config.SkinCookieName,My_skin);
				}  //换位
			}
			var md = Special? current_ly:current_ly.md;
			oSkinCss = My_skin[md];
			curSkinValue = oSkinCss;
			preViewSkin = curSkinValue;
			//console.log(curSkinValue);
            this.ly_skin(curSkinValue);
			this.listen_df();
		}
    };   
	window.Skin = Skin;
	Skin.init();
})();