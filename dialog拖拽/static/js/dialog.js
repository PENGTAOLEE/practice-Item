var Core = window["Core"] || {};
;(function () {

	//正在活动的桌面(Web OS遗留)
	Core.ACTIVE = {
	    AcDesk: 0,
	    GetMain: function(){
	        return $(document);
	    }
	}

	Core.Html = {
	    GetShadow: function(){
	        return '';
	        return '<div class="shadow-cor cor-tl"></div><div class="shadow-cor cor-tr"></div><div class="shadow-cor cor-br"></div><div class="shadow-cor cor-bl"></div><div class="shadow-cor cor-t"></div><div class="shadow-cor cor-r"></div><div class="shadow-cor cor-b"></div><div class="shadow-cor cor-l"></div>';
	    },
	    StopPropagation:function(e){
	        Util.Html.StopPropagation(e);
	    },
	    GetFullIFrame: function(){
	        return "";
	    //return ($.browser.msie?'<iframe width="100%" height="100%" style="z-index:-1;position:absolute;top:0;left:0;">':"");
	    }
	}

	///import core.js
	///import config.js
	/*
	 对话框
	 */
	Core.DialogBaseHandler = {};
	Core.DialogBase = function(settings){
	    var _temp = '<div class="dialog-box" style="display:none;z-index:1000000002">'+
	        Core.Html.GetShadow()+
	        '<div class="dialog-header" rel="title_box">'+
	        '<h3 rel="base_title"></h3>'+
	        '</div>'+
	        '<div class="dialog-handle">'+
	        '<a href="javascript:;" class="close" btn="close">关闭</a>'+
	        '</div>'+
	        '<div rel="base_content"></div>'+
	        '</div>';
	    var _box,_cover,_timer, _self = this;
	    var _settings = !settings? {}: settings;
	    this.Main = Core.ACTIVE.GetMain();

	    var create = function(win){
	        if(!_self.warp){
	            _self.warp = $(settings.warpHtml||_temp);
	            if(_settings.width){	//判断是否设置宽度
	                _self.warp.width(_settings.width);
	            }
	            $(document.body).append(_self.warp);
	            _self.warp.find("[btn]").mousedown(function(e){
	                Core.Html.StopPropagation(e);
	                return true;
	            })
	            _self.warp.find("[btn]").click(function(e){
	                switch($(this).attr("btn")){
	                    case "close":
	                        _self.Close();
	                        break;
	                }
	                return false;
	            });
	            if(_settings.title){
	                _self.warp.find("[rel='base_title']").html(_settings.title);
	            }
	            if(_settings.content){
	                _self.warp.find("[rel='base_content']").append(_settings.content);
	            }

	            // if(!window.DialogNotMove){
	                var mset = {
	                ClickBox: _self.warp.find("[rel='title_box']"),
	                Box: _self.warp,
	                Outer: _self.Main
	                };
	                Util.Mouse.MoveBox(mset);
	            // }


	            if(_self.Initial){
	                _self.Initial();
	            }
	            if($.browser.msie && $.browser.version == 6){

	            }
	            else{
	                _self.warp.css({
	                    'position': 'fixed'
	                });
	            }
	        }
	        if(!_cover){
	            _cover = $('<div style="z-index: 1000000001; display: none;background: none repeat scroll 0 0 #000;_padding-top:40px;height: 100%;left: 0;position: absolute;top: 0;width: 100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;"><div style="height:100%;width:100%;"></div></div>');
	            $(document.body).append(_cover);

	            if ($.browser.msie && $.browser.version == 6) {
	                var doc = document.documentElement;
	                _cover.css({
	                    width: ((doc.scrollWidth>doc.clientWidth)?doc.scrollWidth:doc.clientWidth) + 'px',
	                    height: ((doc.scrollHeight>doc.clientHeight)?doc.scrollHeight:doc.clientHeight) + 'px'
	                });
	            }
	            else{
	                _cover.css({
	                    position: 'fixed'
	                });
	            }

	            _cover.bind("mousedown",function(){
	                if(_timer){
	                    window.clearInterval(_timer);
	                }
	                _timer = window.setInterval(function(){
	                    if(_timer_index % 2){
	                        // _self.warp && _self.warp.addClass(Core.CONFIG.ActiveClass);
	                    }
	                    else{
	                        // _self.warp && _self.warp.removeClass(Core.CONFIG.ActiveClass);
	                    }
	                    _timer_index++;
	                    if(_timer_index > (3 * 2 + 1)){
	                        _timer_index = 1;
	                        if(_timer){
	                            window.clearInterval(_timer);
	                        }
	                    }
	                }, 70);
	            });

	            $(document).on("keydown", function(e){
	                if(e.keyCode == 27){
	                    if(_cover){
	                        _self.Close();
	                        return false;
	                    }
	                }
	            })
	        }

	        Util.Layer.Center(_self.warp,{
	            Main: false,
	            NoAddScrollTop: true
	        });

	        if($.browser.msie && $.browser.version == 6){
	            _self.warp.css({
	                top: $(window).scrollTop() + ($(window).height() - _self.warp.height())/3
	            });
	        }

	    }

	    var _timer_index = 1;

	    this.Open = function(calback,win){
	        create(win);
	        if(calback){
	            calback();
	        }
	        _cover.show();
	        _self.warp.show();
	        _self.warp.find('[btn="close"]').focus().blur();
	        if(!Core.DialogBase.History){
	            Core.DialogBase.History = 0;
	        }
	        Core.DialogBase.History++;
	        Core.DialogBaseHandler['ShowHandler'] && Core.DialogBaseHandler['ShowHandler']();
	    }

	    this.Close = function(){
	        _cover && _cover.hide().remove();
	        _self.warp && _self.warp.hide().remove();
	        _cover = false;
	        _self.warp = false;
	        if(Core.DialogBase.History){
	            Core.DialogBase.History--;
	        }
	        if(Core.DialogBase.History < 0){
	            Core.DialogBase.History = 0;
	        }
	        Core.DialogBaseHandler['CloseHandler'] && Core.DialogBaseHandler['CloseHandler']();
	    }
	}

})();


;(function(){
    var mod = function(actions){
        var _content = $('<div class="dialog-frame"><iframe frameborder=0 src="" style="width:100%;"></iframe></div>'), _self = this;
        if(!actions) actions = {};
        var _top = Util.Override(Core.DialogBase, _self, {
            Initial: function(){
                if($.browser.mozilla){
                    _content.find('iframe').on("load", function(){
                        try{
                            var win = $(this.contentWindow);
                            $(win).on("keydown", function(e){
                                if(e.keyCode == 27){
                                    return false;
                                }
                            });
                        }catch(e){}
                    });
                }
            },
            GetIframe: function(){
                return _content.find('iframe')[0];
            },
            Show: function(url){
                _top.Open(function(){
                    _content.find('iframe').off("load").on("load", function(){
                        if(actions && actions['ready']){
                            var ifr = this;
                            window.setTimeout(function(){
                                actions['ready'](ifr.contentWindow);
                            }, 10);
                        }
                    })
                });
                _content.find('iframe').attr("src", url);
            },
            Reset: function(width, height, notcenter){
                if(width){
                    _self.warp.width(width);
                }
                if(height){
                    _content.find('iframe').height(height);
                }
                if(!notcenter){
                    Util.Layer.Center(_self.warp,{
                        Main: false,
                        NoAddScrollTop: true
                    });
                }

            },
            Close: function(doHide){
                actions && actions["close"] && actions["close"](doHide);
                window.setTimeout(function(){
                    _content.find('iframe').attr("src", "");
                    _top.Close();
                },10);

            },
            ResetTitle: function(title){
                _self.warp.find('[rel="base_title"]').html(title);
            }
        }, {
            content: _content,
            title: "新窗口",
            warpHtml:actions.warpHtml
        });
    }

    Core.FrameBaseDG = mod;


    //多层IFrame对话框
    Core.SimpleFrameDG = (function(){
        var _cache = {}, _ready = false, _ackey,_hideBack = {},_doHandler = {},_hideBackData = {};
        return {
            Open: function(key, url, setting){
                if(!setting) {
                    setting = {};
                }
                if(setting.callback){
                    _doHandler[key] = setting.callback;
                }
                else{
                    _doHandler[key] = false;
                }

                if(!setting.width) setting.width = 320;
                _ready = false;
                if(setting){
                    _ready = setting.ready;
                }
                if(!_cache[key]){
                    _cache[key] = new mod({
                        ready: function(win){
                            _ready && _ready(win);
                        },
                        close: function(doHide){
                            if(!doHide){
                                if(_hideBack[key]){
                                    _doHandler[key] && _doHandler[key](_hideBackData[key]);
                                }
                            }
                        },
                        warpHtml:setting.warpHtml
                    });
                }
                _hideBackData[key] =  null;
                _hideBackData[key] = setting.hide_data;
                _hideBack[key] = setting.is_hide_back;

                _cache[key].Show(url);
                _ackey = key;
                if(setting){
                    _cache[key].Reset(setting.width, setting.height);
                    _cache[key].ResetTitle(setting.title? setting.title: "新窗口");
                }
                return _cache[key];
            },
            Close: function(key,data){
                if(!key){
                    key = _ackey;
                }
                if(_cache[key]){
                    if(_doHandler[key]) _doHandler[key](data);
                    _cache[key].Close(true);
                }
            },
            Reset: function(key, setting){
                if(_cache[key]){
                    _cache[key].Reset(setting.width, setting.height, setting.notcenter);
                }
            }
        }
    })();

    /*
     * IFrame 对话窗
     */
    Core.FrameDG = (function(){
        var _mod, _doHandler, _hideBack = false, _hideBackData, _ready;

        return {
            IsOpen: function(){
                if(_mod){
                    return _mod.warp.length;
                }
                return false;
            },
            GetIframe: function(){
                if(_mod){
                    return _mod.GetIframe();
                }
                else{
                    return false;
                }
            },
            Reset: function(width, height, notcenter){
                if(_mod){
                    _mod.Reset(width, height, notcenter);
                }
            },
            ResetTitle: function(title){
                if(_mod){
                    _mod.ResetTitle(title);
                }
            },
            Open: function(url, setting){
                if(setting.callback){
                    _doHandler = setting.callback;
                }
                else{
                    _doHandler = false;
                }

                if(setting.ready){
                    _ready = setting.ready;
                }
                else{
                    _ready = false;
                }

                if(!_mod){
                    _mod = new mod({
                        ready: function(win){
                            _ready && _ready(win);
                        },
                        close: function(doHide){
                            if(!doHide){
                                if(_hideBack){
                                    _doHandler && _doHandler(_hideBackData);
                                }
                            }
                        }
                    });
                }
                _hideBackData =  null;
                _hideBackData = setting.hide_data;

                _hideBack = setting.is_hide_back;
                _mod.Show(url);

                if(setting){
                    _mod.Reset(setting.width, setting.height);
                    _mod.ResetTitle(setting.title? setting.title: "新窗口");
                }
                return _mod;
            },
            Close: function(data){
                if(_mod){
                    if(_doHandler) _doHandler(data);
                    _mod.Close(true);
                }
            },
            Hide: function(){
                if(_mod){
                    _mod.Close();
                }
            }
        }
    })();
})();

;(function () {
	// body...

	Core.Message = (function() {
	    var _dialog;

	    /*
	     弹窗消息类
	     */
	    var _MessageModel = function() {
	        var _self = this, _initState = false, _callback, _openStatus = false, _dialog_type;

	        var _content = $('<div>' +
	                '<div class="dialog-msg" rel="content"></div>' +
	            '<div class="dialog-action">'+
	            '<a href="javascript:;" class="dgac-cancel"  style="display:none;" btn="cancel">取消</a>'+
	            '<a href="javascript:;" class="dgac-confirm" btn="confirm">确定</a>'+
	            '</div>');

	        Core.DialogBase.call(this, {
	            content: _content,
	            title: '信息提示'
	        });	//继承dialog

	        var setTitle = function(title) {
	            title && _self.warp.find("[rel='base_title']").html(title);
	        }

	        //初始化事件
	        this.Initial = function() {
	            if (!_initState) {
	                $(document).bind("keyup", function(e) {
	                    if (_openStatus) {
	                        if (e.keyCode == 13 || e.keyCode == 32) {
	                            _content.find("[btn='confirm']").click();
	                        }
	                        else if (e.keyCode == 27) {
	                            switch (_dialog_type) {
	                                case 0:
	                                    _content.find("[btn='confirm']").click();
	                                    break;
	                                case 1:
	                                    _content.find("[btn='cancel']").click();
	                                    break;
	                            }

	                        }
	                    }
	                })
	            }
	        }

	        var _closeFun = this.Close;

	        this.Close = function() {
	            _closeFun();
	            _openStatus = false;

	        }

	        this.Show = function(obj) {
	            _callback = false;
	            _self.Open(function() {
	                var cancelBtn = _content.find("[btn='cancel']");
	                var confirmBtn = _content.find("[btn='confirm']");
	                if (obj.confirm_link) {
	                    confirmBtn.unbind("click").bind("click", function() {
	                        if (_callback) {
	                            _callback(true);
	                        }
	                        _self.Close();
	                        return true;
	                    });
	                    confirmBtn.attr("href", obj.confirm_link).attr("target", "_blank");

	                    cancelBtn.unbind("click").bind("click", function() {
	                        var r = true;
	                        if (_callback) {
	                            r = _callback(false);
	                        }
	                        if (r === false) {
	                            return false;
	                        }
	                        _self.Close();
	                        return false;
	                    })
	                }
	                else {

	                    if (confirmBtn.attr("target")) {
	                        confirmBtn.removeAttr("target");
	                        confirmBtn.attr("href", "javascript:;");
	                    }
	                    _self.warp.find("[btn]").unbind("click").bind("click", function() {
	                        var r = true;
	                        if (_callback) {
	                            r = _callback($(this).attr("btn") == "confirm");
	                        }
	                        if (r === false) {
	                            return false;
	                        }
	                        _self.Close();
	                        return false;
	                    })
	                }
	                if (obj.confirm_text) {
	                    confirmBtn.html(obj.confirm_text);
	                }
	                else {
	                    confirmBtn.html("确定");
	                }

	                if (obj.cancel_text) {
	                    cancelBtn.html(obj.cancel_text);
	                }
	                else {
	                    cancelBtn.html("取消");
	                }
	                _callback = obj.callback;
	                setTitle(obj.title);
	                if (obj.dialog_type == undefined) {
	                    obj.dialog_type = 0;
	                }
	                if (!obj.type) {
	                    obj.type = "war"
	                }
	                var html_temp = '<h3 rel="text">' +
	                        '<i class="hint-icon hint-{type}"></i><span>{text}</span></h3>' +
	                        (obj.content ? '<div class="dialog-msg-text" rel="text_content">{content}</div>' : "");
	                var con = _content.find("[rel='content']");
	                con.html(String.formatmodel(html_temp, obj));
	                confirmBtn.removeClass("btn-orange");
	                switch (obj.dialog_type) {
	                    case 0:
	                        cancelBtn.hide();
	                        break;
	                    case 1:
	                        cancelBtn.show();
	                        break;
	                }
	                _dialog_type = obj.dialog_type;
	                _openStatus = true;

	                if(!obj.con_style){
	                    obj.con_style = {};
	                }
	                var conStyle = obj.con_style;
	                if(conStyle.warp){
	                    conStyle.warp(con);
	                }
	                else{
	                    var styleTxt = con.attr('style');
	                    if(styleTxt){
	                        var arr = styleTxt.split(';');
	                        if(arr && arr.length){
	                            for(var i = 0, len = arr.length; i < len; i++){
	                                var item = arr[i];
	                                var iitem = item.split(':');
	                                if(iitem.length){
	                                    con.css(iitem[0], '');
	                                }
	                            }
	                        }
	                    }
	                    con.removeAttr('style');
	                }
	                if(conStyle.title){
	                    conStyle.title(con.find('[rel="text"]'));
	                }
	                if(conStyle.content){
	                    conStyle.content(con.find('[rel="text_content"]'));
	                }



	            }, obj.win);
	        }
	    }

	    var init = function() {
	        if (!_dialog) {
	            _dialog = new _MessageModel();
	        }
	    }

	    var _alertTimer;

	    return {
	        Confirm: function(obj) {
	            init();
	            obj.dialog_type = 1;
	            _dialog.Show(obj);
	        },
	        Alert: function(obj) {
	            init();
	            obj.dialog_type = 0;
	            _dialog.Show(obj);
	            if (obj.timeout) {
	                _alertTimer = window.setTimeout(function() {
	                    Core.Message.Hide();
	                }, obj.timeout);
	            }
	        },
	        Hide: function() {
	            if (_alertTimer) {
	                window.clearTimeout(_alertTimer);
	            }
	            if (_dialog) {
	                _dialog.Close();
	            }
	        }
	    }
	})();


	/*
		迷你信息提示
	*/
	Core.MinMessage = (function(){
	    var _dom, _timer;
	    var _temp = '<div class="popup-hint" style="z-index:9999999999;">'+
	    '<i class="" rel="type"></i>'+
	    '<em class="sl"><b></b></em>'+
	    '<span rel="con"></span>'+
	    '<em class="sr"><b></b></em>'+
	    '</div>';
	    var _temp = '<div class="ex-popoup-hint " style="z-index:9999999999;"><s></s><span rel="con">操作成功提示！</span></div>';
	    var _cache = {
	        Type:{
	            "suc": "exph-suc",
	            "war": "exph-war",
	            "err": "exph-err",
	            "load": "exph-loader",
	            "inf": "exph-war"
	        }
	    };

	    //创建消息DOM
	    var create = function(text,type){
	        if(!_dom){
	            _dom = $(String.format(_temp,text));
	            $(document.body).append(_dom);
	            if($.browser.msie && $.browser.version == 6){

	            }
	            else{
	                _dom.css({position: 'fixed'});
	            }

	        }
	        _dom.find("[rel='con']").html(text);
	        var icon = _dom;
	        for(var k in _cache.Type){
	            icon.removeClass(_cache.Type[k]);
	        }
	        icon.addClass(_cache.Type[type]);
	    }

	    //隐藏
	    var hide = function(){
	        if(_timer){
	            window.clearTimeout(_timer);
	        }
	        if(_dom){
	            _dom.hide();
	        }
	    }

	    return {
	        Show: function(obj){
	            if(!obj.type){
	                obj.type = "war";
	            }
	            create(obj.text,obj.type);
	            var NoAddScrollTop = !($.browser.msie && $.browser.version == 6);
	            Util.Layer.Center(_dom,{
	               NoAddScrollTop: NoAddScrollTop
	            });
	            var st = ($(window).height() - _dom.outerHeight())/4.5;
	            if(st < 50){
	                st = 50;
	            }
	            var srt = 0;
	            if(!NoAddScrollTop){
	                srt = $(window).scrollTop();
	            }
	            if(st){
	                st += srt;
	            }
	            _dom.css('top', st);
	            _dom.show();
	            if(_timer){
	                window.clearTimeout(_timer);
	            }
	            _timer = window.setTimeout(hide, obj.timeout || 2000);
	        },
	        Hide: function(){
	            hide();
	        }
	    }
	})();


})();



;
(function() {
    Core.WriteInput = (function() {
        var activeBox;

        return {
            Open: function(callback, config) {
                if (!config) {
                    config = {};
                }

                var editCon = $('<div class="dialog-input" style="padding: 20px 30px 40px;">' +
                        (!config.ext?'<input type="text" rel="txt" class="text" style="width:610px;" '+(config.placeholder?'placeholder="'+config.placeholder+'"':'')+'/>' :
                        '<input type="text" rel="txt" class="text" style="width:362px;" '+(config.placeholder?'placeholder="'+config.placeholder+'"':'')+'/>'+
                        '<span class="file-ext-name" rel="ext_name" style="top:30px;border: 1px solid;border-color: #CECECF;box-shadow: inset 0px 0px 0px rgba(0,0,0,0.1);">'+config.ext+'</span>' )+
                        '</div>' +
                        '<div class="dialog-action">' +
                        '<a href="javascript:;" class="dgac-cancel" btn="cancel">取消</a>' +
                        '<a href="javascript:;" class="dgac-confirm" btn="confirm">确定</a>' +
                        '</div>');

                var editBox = new Core.DialogBase({
                    title: config.title || '请输入内容',
                    content: editCon
                });
                activeBox = editBox;

                editBox.Open();
                var docallback = function() {
                    if (callback) {
                        var isClose = callback(editCon.find("[rel='txt']").val());
                        if (isClose) {
                            editBox.Close();
                            activeBox = false;
                            return;
                        }
                        else {
                            editCon.find("[rel='txt']").focus();
                        }
                    }
                }
                editCon.find("[rel='txt']").val(config.text || '');

                editCon.find("[rel='txt']").on("keydown", function(e) {
                    if (e.keyCode == 13) {
                        docallback();
                    }
                    else if (e.keyCode == 27) {
                        editBox.Close();
                        activeBox = false;
                    }
                })

                editCon.find("[btn]").on("click", function(e) {
                    switch ($(this).attr("btn")) {
                        case "confirm":
                            docallback();
                            break;
                        case "cancel":
                            editBox.Close();
                            activeBox = false;
                            break;
                    }
                    return false;
                })

                editCon.find("[rel='txt']")[0].focus();
                window.setTimeout(function() {
                    editCon.find("[rel='txt']")[0].select();
                    if(config.ext){
                        window.setTimeout(function(){
                        editCon.find("[rel='txt']").width(420 - editCon.find("[rel='ext_name']").width() - 20);
                        }, 10);
                    }
                }, 20);
                return editBox;
            },
            Close: function() {
                activeBox.Close();
                activeBox = false;
            }
        }
    })();
})();