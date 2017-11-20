/*
*
*
*
*/
var is_search_360 =  window.SERACH360 || null;
var search_360_sm = window.SERACH360_SM || null;
if(is_search_360) {
    Config.Search.defaultimg = ['static/images/search_360.png', '综合搜索'];
    Config.Search.web = {
        action: "https://www.so.com/s",
        name: "q",
        btn: "搜索一下",
        url: "https://www.so.com/s?src=lm&ls="+(search_360_sm || 'sm2135213')+"&lm_extend=ctype:31",
        params: {
            src:'lm',
            ls: search_360_sm || 'sm2135213',
            lm_extend:'ctype:31'
        }
    }
}

var KeywordCount = function(keyword, Counturl) {
    if (!keyword || keyword == "") {
        return
    }
    var url = Counturl || "http://www.tjj.com/index";
    var rd = new Date().getTime();
    var Count = new Image();
    var countVal = "";
    for (var i in keyword) {
        if (i == 'u') {
            countVal += ('?' + i + '=' + encodeURIComponent(keyword[i]));
        } else {
            countVal += ('&' + i + '=' + encodeURIComponent(keyword[i]));
        }
    }
    if (url == "http://www.tjj.com/index") {
        Count.src = url + countVal + '&i=' + rd + "&uid=" + YLMF.UID;
    } else {
        Count.src = url + "?i=" + rd + countVal + "&uid=" + YLMF.UID;
    }
}

var cache = (function () {
    var cacheBox = {};
    var _get = function(name) {
        if (cacheBox[name]) return cacheBox[name];
        return null
    }
    var _set = function(name, value, A) {
        if (!A) { cacheBox[name] = value; }
        else {
            if (Yl.getType(cacheBox[name]) != "array") { cacheBox[name] = []; }
            cacheBox[name].push(value)
        }
    }
    var _remove = function(name) {
        delete cacheBox[name]
    }
    var _is = function(name) {
        return (_get(name) == null) ? false : true
    }
    return {
        get: _get,
        set: _set,
        is: _is,
        remove: _remove
    }
})();

;(function(){
    
    $(document).click(function(e){
        var obj = e.target || e.srcElement;
        var isLink = function(el) {
            return el.tagName && el.tagName.toUpperCase() == "A";
        }
        if (isLink(obj) || isLink(obj.parentNode) || isLink(obj.parentNode.parentNode)) {
            if (obj.rel && obj.rel == 'nr') {
                return;
            }
            var L, T;
            if (obj.parentNode.tagName.toUpperCase() == "A" && obj.tagName.toUpperCase() == "IMG") {
                L = $(obj).closest('a').attr('href'),
                T = obj.alt;
            } else if (obj.parentNode.parentNode.tagName.toUpperCase() == "A") {
                L = $(obj).closest('a').attr('href'),
                T = $(obj).text();
            } else {
                L = obj.href || $(obj).closest('a').attr('href') ||"",
                T = $(obj).text();
                if ($.trim(L) == "javascript:void(0);" || $.trim(L) == "javascript:void(0)") {
                    L = T;
                }
                if (obj.getAttribute("rel")) {
                    L = T = $(obj).text();
                }
            }
            KeywordCount({
                u: L,
                n: T,
                q: 0,
                tj: obj.getAttribute('tj') || $(obj).closest('a').attr('tj') || ""
            });
        }
    });
    window.Search = {
        HiddenParams : [],
        // Ticket : false,  机票部分
        init : function(){
            YLMF.addEvents(["changeSearchType"]);
            $("#tsrcInp").focus(function(){
                YLMF.cancelDefer("tsrcInpBlur");
                //$("#tsrcInp").addClass("focus");
            });
            $("#tsrcInp").blur(function(){
                YLMF.defer("tsrcInpBlur",function(){
                    //$("#tsrcInp").removeClass("focus");
                },100);
            });
            $("#tsrc-tab a").click(function(event){
                //YLMF.cancelDefer("tsrcInpBlur");
                $("#tsrc-tab .active").removeClass("active");
                $(this).addClass("active");
                $("#tsrcInp").focus();
                var rel = this.getAttribute("rel");
                /*if(rel=="ticket"){
                    Search.Ticket = true;
                    $("#SearchBox .SerMain").addClass("Ticket");
                    Config.Search[rel] && Search.set(Config.Search[rel]);
                }
                else{
                    if(Search.Ticket){
                        Search.Ticket = false;
                        $("#SearchBox .SerMain").removeClass("Ticket");
                    }
                    Config.Search[rel] && Search.Set(Config.Search[rel]);
                } 机票部分*/
                Config.Search[rel] && Search.Set(Config.Search[rel]); //如果解注机票，要注释此行
                YLMF.fireEvent("changeSearchType",this,rel);
            });
            if(!(BaiduTn.tn=="0"&&BaiduTn.ch=="0")){this.Set(Config.Search.web);} //判断是否搜狗，如果百度tn、ch都为0，那么程序认为是搜狗，就不运行重建搜索参数。
            $("#tsrcInp").focus();
            $("#SearchBox .center").mouseenter(function(){$("#tsrcInp").focus()}); //鼠标移到搜索区，搜索框自动获取焦点
            $("#tsrcInp").keydown(function(){
                window.setTimeout(function(){
                    if($("#tsrcInp").val() != ""){
                        $("#tsrcInp").hasClass("focus") || $("#tsrcInp").addClass("focus");
                    }else{
                        $("#tsrcInp").removeClass("focus");
                    }
                },100);
            });
        },
        removeParams : function(inputArr){
            for (var i = 0, len = inputArr.length; i < len; i++) {
                $("#searchForm").get(0).removeChild(inputArr[i]);
            }
            return [];
        },
        Set : function(searchItem){
            // console.log(searchItem);
            $("#searchForm").get(0).action = searchItem.action;
            var _charset = searchItem.charset ? searchItem.charset:"utf-8";
            $("#searchForm").attr("accept-charset",_charset);
            if(document.all){window._charset=_charset;}
            $("#tsrcInp").get(0).name = searchItem.name;
            if(searchItem.img){
                $("#SerLogo img").attr({"src":searchItem.img[0],"alt":searchItem.img[1]});
            }
            else{
                $("#SerLogo img").attr({"src":Config.Search.defaultimg[0],"alt":Config.Search.defaultimg[1]});
            }
            if (this.HiddenParams.length > 0) {
                Search.HiddenParams = Search.removeParams(Search.HiddenParams);
            }
            $("#SerLogo a").attr("href",searchItem.url);
            $("#topSearchBtn").html(searchItem.btn);

            if(is_search_360) {
                if(searchItem.name == 'q') {
                    $('#searchForm').after($('#sogoupid'));
                }else {
                    $('#sogoupid').appendTo('#searchForm');
                }
                $('#js-input_360').remove();
            }

            
            for (var item in searchItem.params) {
                var _input = document.createElement("input");
                _input.setAttribute("name",item);
                _input.setAttribute("value",encodeURIComponent(searchItem.params[item]));
                _input.setAttribute("type","hidden");
                Search.HiddenParams.push(_input);
                $("#searchForm").append(_input);
                /*
                $("#searchForm").create("input", {
                    name: item,
                    value: searchItem.params[item],
                    type: "hidden"
                }, function (el) {
                    HiddenParams.push(el);
                    this.append(el);
                })
                */
            } //创建需要的参数，并保存数组中
        },
        /*set : function(searchItem){
            if(searchItem.img){
                $("#SerLogo img").attr({"src":searchItem.img[0],"alt":searchItem.img[1]});
            }
            else{
                $("#SerLogo img").attr({"src":Config.Search.defaultimg[0],"alt":Config.Search.defaultimg[1]});
            }
            $("#SerLogo a").attr("href",searchItem.url);
        },//机票专用*/
        beforeSearch : function(){
            
        }
    }
    
    Search.init();
})();

;(function(){
    var searchHowNew =  $("#tsrc-toplist");
    var searHowIns = $("#slb-arrow");
    var hostNews = $("#slb-hot");
    YLMF.addEvents(["topListShow","topListHide"]);
    //展开、关闭
    var hnState = 'close';
    searHowIns.on('click',function(){
        if(hnState=='close'){
            
            searchHowNew.show();
            searHowIns.find("i").addClass("up");
            YLMF.fireEvent("topListShow",this,null);
        }else{
           
            searchHowNew.hide();
            searHowIns.find("i").removeClass("up");
            YLMF.fireEvent("topListHide",this,null);
        }
		var g = YLMF.getEvent();
		if (g && g.stopPropagation) {
			g.stopPropagation()
		} else {
			if (window.event) {
				window.event.cancelBubble = true
			}
		}
    });
    hostNews.click(function(){
        
        searchHowNew.show();
        searHowIns.find("i").addClass("up");
        
        var g = YLMF.getEvent();
		if (g && g.stopPropagation) {
			g.stopPropagation()
		} else {
			if (window.event) {
				window.event.cancelBubble = true
			}
		}
        
        YLMF.fireEvent("topListShow",this,null);
    });
    YLMF.addListener({
        topListShow : function(){
            hnState = 'open';
            var oData = new Date();
            oData.setDate(oData.getDate()+1);
            hostNews.hide();
            Cookie.set("hostNews","1",oData); 
        },
        topListHide: function(){
             hnState = 'close';
        }
    });
    
  

	$(document.body).on("click", function() {
		var g = YLMF.getEvent();
		var f = g.target || g.srcElement;
		hnState = "close";
		searchHowNew.hide();
		searHowIns.find("i").removeClass("up")
	});

    window.Ylmf.toplist = function(topData){
        var _html = '<div class="list">';
        var i = 0;
        var emSize = 0;
        for(i=0;i<topData.length;i++){
            if(topData[i].tag){
                emSize +=1 ;
            }
            var ind = i+1;
            _html += '<a href="http://www.baidu.com/s?wd='+ encodeURIComponent(topData[i].title)+'&tn=hkxs_1_pg&ch=10&hl_tag=hotsug"><i class="'+(i<3?'hot':'')+'">'+ind+'</i><span class="hnTitle">'+topData[i].title+'</span>'+(topData[i].tag=='new'?'<em></em>':'')+'</a>'
        }
        _html+="</div>";
        _html+='<a href="http://top.baidu.com/" class="bdtop-link">由百度搜索风云榜提供</a>';
        searchHowNew.html(_html);
        hostNews.html(emSize);
        if(!Cookie.get("hostNews") && emSize != 0){
            hostNews.show();
        }else{
            hostNews.hide();
        }
    }
    Ylmf.ScriptLoader.Add({
        src: "http://api4.114la.com/1114_buzz.json?t=" + parseInt(Math.random() * 10000),
        charset: "utf-8"
    });  
})();



var Suggest = (function(){

    var K = $("#tsrcInp"), S = $("#tsrc-suggestion"), Query, //输入值
     currentKey = -1, dataScript = null, //数据脚本
     dataResult, //结果数据
     KeywordItems, //li
     mouseSelect = false, stopRequest = false, Hidestate = false, isClose = false;
    var hostNews = $("#hostNews");
    var searHowIns = $(".search-how").find("ins");
    var searchHistoryKey = "searchHistory";
    YLMF.addEvents(["showSuggest","hideSuggest"]);
    K.get(0).onkeydown = function(e){
        
        var e = e || window.event;
        if (isClose) {
            return;
        }
        switch (e.keyCode) {
            case 38:
                if (Hidestate) {
                    if (this.value == "")
                        return;
                    S.show();
                    Hidestate = false;
                }
                else {
                    currentKey--
                }
                selectItem();
                if(e.preventDefault){
                    e.preventDefault();
                }else{
                    e.returnValue  = false;
                }
                break;
            case 40:
                if (Hidestate) {
                    if (this.value == "")
                        return;
                    S.show();
                    Hidestate = false;
                }
                else {
                    currentKey++
                }
                selectItem();
                break;
            case 27:
                this.value = Query;
                hideSuggest();
                break;
            case 13:
                cache.set("Handdle_Key", "13");
                hideSuggest();
                break;
            default:
                //stopRequest = false;
                break;
        }
    }
    
    K.get(0).onkeyup = function (e) {
       
        var e = e || window.event;
        if (isClose) {
            return;
        }

        Query = this.value;

        switch (e.keyCode) {
            case 38:
                stopRequest = true;
                break;
            case 40:
                stopRequest = true;
                break;
            case 8:
                if (this.value == "") {
                    //hideSuggest();
                    showSearchHistory();
                }
                else {
                    requestData();
                }
                break;
            case 27:
                this.value = Query;
                hideSuggest();
            case 13:
                cache.set("Handdle_Key", "13");
                hideSuggest();
                break;
            default:
                if (Query != "") {
                    requestData();
                }

                break;
        }
    }
    
    K.get(0).onblur = function () {
        if (!mouseSelect) {
            YLMF.defer("hideSugget",function(){
                hideSuggest();
            },100);
            //TS.hide();
        }
    }
    K.get(0).onfocus = function(){
        YLMF.cancelDefer("hideSugget");
        if($.trim(K.get(0).value) == ""){
            showSearchHistory();
        }
    }
    
    var selectItem = function() {
        if (!KeywordItems)
            return;
        var len = KeywordItems.length;

        stopRequest = true;
        if (currentKey < 0) {
            currentKey = len - 1;
        }
        else
            if (currentKey >= len) {
                currentKey = 0;
            }
        for (var i = 0, len = KeywordItems.length; i < len; i++) {
            KeywordItems[i].className = "";
        }
        KeywordItems[currentKey].className = "hover";
        K.get(0).value = $(KeywordItems[currentKey]).find("a").html();
    }
    
    
    var showSuggest = function() {
		
        if (typeof (dataResult) != "object" || typeof (dataResult) == "undefined")
            return;
        var html = '<div class="list"><ul>';
        for(var i=0;i<dataResult.length;i++){html += '<li key="' + i + '"><a href="javascript:void(0)" target="_self">' + dataResult[i] + '</a></li>';}
        html += '</ul></div>';
        KeywordItems = S.get(0).getElementsByTagName("li");
        S.get(0).innerHTML = html;
        S.show();
        currentKey = -1;
        Hidestate = false;
        mouseHandle();
        YLMF.fireEvent("showSuggest",this,null);
    }

    var showSuggest360 = function() {
        
        if (typeof (dataResult) != "object" || typeof (dataResult) == "undefined")
            return;
        var html = '<div class="list"><ul>';
        for(var i=0;i<dataResult.length;i++){html += '<li key="' + i + '"><a href="javascript:void(0)" target="_self">' + dataResult[i]['word'] + '</a></li>';}
        html += '</ul></div>';
        KeywordItems = S.get(0).getElementsByTagName("li");
        S.get(0).innerHTML = html;
        S.show();
        currentKey = -1;
        Hidestate = false;
        mouseHandle();
        YLMF.fireEvent("showSuggest",this,null);
    }
    
    var hideSuggest = function() {
        S.hide();
        Hidestate = true;
        YLMF.fireEvent("hideSuggest",this,null);
    }

    var closeSuggest = function() {
        K.get(0).setAttribute("autocomplete", "on");
        K.get(0).focus();
        S.hide();
        isClose = true;
    }

    var mouseHandle = function() {
        S.get(0).onmouseover = function (e) {
            var e = e || window.event, target = e.target || e.srcElement;
            target = target.parentNode;
            if (target.tagName.toUpperCase() == "LI") {
                for (var i = 0, len = KeywordItems.length; i < len; i++) {
                    KeywordItems[i].className = "";
                }
                target.className = "hover";
                currentKey = parseInt(target.getAttribute("key"));

                $(target).on("mouseout", function (el) {
                    el.className = "";
                })
            }
            mouseSelect = true;
        }
        S.get(0).onmouseout = function () {
            mouseSelect = false;
        }

        S.get(0).onclick = function (e) {
            var e = e || window.event, target = e.target || e.srcElement;
            target = target.parentNode;
            if (target.tagName.toUpperCase() == "LI") {
                K.get(0).value = $(target).find("a").html();
                K.get(0).focus();
                hideSuggest();
                var SF = document.getElementById("searchForm");
                cache.set("Handdle_Key", "S");
                SF.onsubmit();
                SF.submit();
            }
            if (target.id == "closeSugBtn") {
                closeSuggest();
            }

        }
    }
    
    var addSearchHistory = function(word){
        if(!word || word == ""){
            return;
        }
        //debugger;
        var _his = Cookie.get(searchHistoryKey);
       
        if(_his){
            _his = _his.split("|");
        }else{
            _his = [];
        }
        if(_his.length > 9){
            _his.shift();
        }
        _his.push(word.replace("|",""));
        _his = _his.join("|");
        Cookie.set(searchHistoryKey,_his);
    }
    
    var showSearchHistory = function(){
        hideSuggest();
        return;
        var _his = Cookie.get(searchHistoryKey);
        if(_his){
            dataResult = _his.split("|");
            showSuggest();
        }
       
    }
    
    $("#searchForm").get(0).onsubmit = function () {
        if(document.all){document.charset=window._charset;setTimeout(function(){document.charset='utf-8';},100);}
        var search_type = cache.get("CURRENT_SE_TAB") ? cache.get("CURRENT_SE_TAB") : "web";
        addSearchHistory(K.get(0).value);
        KeywordCount({
            type: search_type,
            word: K.get(0).value,
            url: window.location.href,
            key: cache.get("Handdle_Key")
        }, "http://www.tjj.com/click.php");
        
        /**114la统计：统计搜索关键词**/
        /**百度统计：统计搜索关键词
        if(_hmt){
           _hmt.push(['_trackEvent', '搜索框','submit', search_type, K.get(0).value ]);    
        }**/
        
    };
    $("#search_btn").on("click", function () {
        cache.set("Handdle_Key", "B");
    });

    var requestData = function() {
        var head = $("head").get(0);
        var TAB = cache.get("CURRENT_SE_TAB");
        if (dataScript) {
            if (TAB == "taobao") {
                dataScript.charset = "utf-8";
            }
            else {
                dataScript.charset = "gb2312";
            }
        }
        if (!$.browser.msie) {
            if (dataScript) {
                head.removeChild(dataScript);
            }
            dataScript = null;
        } // IE不需要重新创建script元素
		if(dataScript){
			$(dataScript).remove();
			dataScript = null;
		}
        if (!dataScript) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (TAB == "taobao") {
                script.charset = "utf-8";
            }
            else {
                script.charset = "gb2312";
            }
            head.insertBefore(script, head.firstChild);
            dataScript = script;
        }
        var rd = new Date().getTime();
        var key = encodeURIComponent(K.get(0).value);
        var Url = "";

        if(is_search_360) {
            TAB = '360';
            script.charset = 'utf-8';
        }

        switch (TAB) {
            case "taobao":
                Url = "http://suggest.taobao.com/sug?code=utf-8&callback=taobaoSU&q=" + key + "&rd=" + rd
                break;
            case '360':
                Url = "https://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&format=json&word="+key+"&caller="+(search_360_sm || "sm2135213")+"&callback=SU360"
                break;
            default:
                Url = "http://unionsug.baidu.com/su?wd=" + key + "&p=3&cb=baiduSU&t=" + rd;
        }
        dataScript.src = Url;
    }
    //360
    window.SU360 = function (O) {
        if (typeof (O) == "object" && typeof (O.result) != "undefined" && typeof (O.result[0]) != "undefined") {
            dataResult = O.result;
            
            showSuggest360();
        }
        else {
            hideSuggest();
        }
    };
    //baidu
    window.baiduSU = function (O) {
        if (typeof (O) == "object" && typeof (O.s) != "undefined" && typeof (O.s[0]) != "undefined") {
            dataResult = O.s;
			
            showSuggest();
        }
        else {
            hideSuggest();
        }
    };
    window.taobaoSU = function (O) {
        if (typeof (O) == "object" && typeof (O.result) != "undefined" && typeof (O.result[0][0]) != "undefined") {
            dataResult = O.result;
            showSuggest();
        }
        else {
            hideSuggest();
        }
    }

    if((navigator.userAgent.match(/(iPad|Android)/i))){  //平板设备下运行
        var kval="", _inter = null;
        K.blur(function(){clearInterval(_inter)});
        K.focus(function(){
            _inter = setInterval(function(){
                if(kval != K.val() && K.val() != ""){
                    requestData();
                    kval = K.val();
                }
            },100);  
        });
    }
})();

// 百度顶部固定
;(function(){   
    var _preScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var fixedSearchShowTimmer = null;
	var fixedSearch = $("#SearchBox");
    var fixedSearchShow = false;
    var scrollSearch = function(){
        var _top = document.documentElement.scrollTop || document.body.scrollTop;
        var flagTop = fixedSearch.offset().top;
        var detaTop = _preScrollTop-_top;
        var underflag = _top - flagTop;
        _preScrollTop = _top;
        if(!fixedSearchShow && underflag>0){fixedSearch.addClass("FixedSearch");fixedSearchShow = true;}
        else if(fixedSearchShow && (underflag<0) ){fixedSearch.removeClass("FixedSearch");fixedSearchShow = false;}
    }
    $(window).on('scroll', function(){scrollSearch();});
})();