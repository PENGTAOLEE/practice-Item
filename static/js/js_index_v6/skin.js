var My_skin,oSkinCss,curSkinValue,preViewSkin;
(function(){
    var themeShow = false,
        curAni = null,
        _theme = $("#theme"),
        skinStyleObj = $("#js_skinStyle"),
        themeChangeBtn = $("#themeChange a"),
        _jsXhr = null,
        cssPath = "static/css/skin/",
        themeTypePath = "sub/theme/",
        curPage = 0,
        maxPage = 1,
        pwid = $("#scrollContainer").width();
    YLMF.addEvents(["skinShow","skinHide"]);    
    var Skin = {
        init : function(){
            var me = this;
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
            $("#ChangeSkin").click(function(){
                if(themeShow){me.hide();}
                else{me.show();}
                if(!loadskinpic){
                    var delayimgs = $("#scrollContainer li img.delay");
                    var de_len = delayimgs.length;
                    for (i = 0; i < de_len; i++) {
                        var href = delayimgs.eq(i).attr("data-original");
                        delayimgs.eq(i).attr("src", href);
                        if (i == de_len - 1) {
                            delayimgs.removeClass("delay");
                        }
                    }
                    loadskinpic = true;
                }
            });
            //for change page
            maxPage = $("#scrollContainer ul").size();
            if(login.Logined){typeof UserConfig != "undefined" && Skin.Login_in(UserConfig.Skin);}
            else{Skin.Login_out();}
            $("#scrollContainer .center").css("width",maxPage*pwid);
        },
        show : function(){
            themeShow = true;
            $("#themesContainer").stop().slideDown();
            $("#ChangeSkin").html("收起<s></s><i class='up'></i>");
            YLMF.fireEvent("skinShow",this,null);
        },
        hide:function(){
            themeShow = false;
            $("#themesContainer").stop().slideUp();
            $("#ChangeSkin").html("换肤<s></s><i></i>");
            YLMF.fireEvent("skinHide",this,null);
        },
        preViewSkin : function(PvSkinName){
            preViewSkin = PvSkinName;
            var _href = cssPath + PvSkinName + ".css" + UpDataCache;
            if($("#js_skinStyle").attr("href") != _href){$("#js_skinStyle").attr("href",_href);}
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
        },
		record:function(){
			My_skin = curSkinValue;
			if(login.Logined){;
				$.ajax({
				  url:"http://my.114la.com/api/index.php?c=api&a=setindexmodel&appkey=26a12af305d876a677aa&type=s&v="+curSkinValue,
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
            curSkinValue = preViewSkin;
			this.record();
            this.hide();
        },
        listNext:function(){
            if(curPage + 1 == maxPage){
                $("#scrollContainer .center").animate({"left":-curPage*pwid-100},100,function(){
                    $("#scrollContainer .center").animate({"left":-curPage*pwid+75},120,function(){
                        $("#scrollContainer .center").animate({"left":-curPage*pwid-50},140,function(){
                            $("#scrollContainer .center").animate({"left":-curPage*pwid},160);
                        });
                    });
                });
            }
            else{
                curPage = curPage+1;
                $("#scrollContainer .center").stop(true,false).animate({"left":-curPage*pwid},360);
            }
            
        },
        listPre:function(){
            if(curPage == 0){
                $("#scrollContainer .center").animate({"left":100},100,function(){
                    $("#scrollContainer .center").animate({"left":-75},120,function(){
                        $("#scrollContainer .center").animate({"left":50},140,function(){
                            $("#scrollContainer .center").animate({"left":0},160);
                        });
                    });
                });
            }
            else{
                curPage = curPage - 1;
                $("#scrollContainer .center").stop(true,false).animate({"left":-curPage*pwid},360);
            }
            
        },
		ly_skin: function(PvSkinName){
            Skin.preViewSkin(PvSkinName);
			curSkinValue = PvSkinName;
        },
		Login_in:function(skin){
			My_skin = skin;
			oSkinCss = My_skin;
			curSkinValue = oSkinCss;
			preViewSkin = curSkinValue;
			//console.log(curSkinValue);
            this.ly_skin(curSkinValue);
		},
		Login_out:function(){
			My_skin=Cookie.get(Config.SkinCookieName);
			if(!My_skin){
				My_skin = Config.defaultTheme;
				Cookie.set(Config.SkinCookieName,My_skin);
			}
			oSkinCss = My_skin;
			curSkinValue = oSkinCss;
			preViewSkin = curSkinValue;
			//console.log(curSkinValue);
            this.ly_skin(curSkinValue);
		}
    };   
	window.Skin = Skin;
	Skin.init();
})();