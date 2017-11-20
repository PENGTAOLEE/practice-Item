var searchName = window.location.search; (function() {
    var a = [];
    var c = [["5", "5.html"]];
    for (var b = 0; b < c.length; b++) {
        if ("?" + c[b][0] == searchName) {
            window.location.href = "http://www.114la.com/" + c[b][1]
        }
    }
})();
if (typeof mainDomain == "undefined") {
    var mainDomain = "http://www.114la.com"
}
var staticDomain = mainDomain + "/static4"; (function() {
    var a = ["good", "wgho", "setup", "touchds", "339la", "hang", "ie567", "sky", "361la"];
    var c = [["xy", "xy.html"], ["long", "long.html"], ["xiazaiba", "xiazaiba.html"], ["soft", "soft.html"], ["xs", "xs.html"], ["qvod", "qvod.html"], ["wl", "wl.html"], ["hua", "hua.html"], ["wgho", "wgho.html"], ["anyue", "anyue.html"], ["setup", "setup.html"]];
    for (var b = 0; b < c.length; b++) {
        if ("?" + c[b][0] == searchName) {
            window.location.href = "http://hao.ylmf.com/" + c[b][1]
        }
    }
})();

; (function() {
    var h = document.getElementById("brownTop");
    var e = document.getElementById("browserText");
    var href_id = document.getElementById("browserHref");
    var f = document.getElementById("closeBro");
    f.onclick = function() {
        h.style.display = "none";
        var a = new Date();
        a.setDate(a.getDate() + 1);
        Cookie.set("brown", "no", a)
    };
	var g = function(b, n) {
        var o = navigator.userAgent;
        var c = !!window.ActiveXObject;
        var a = c && !window.XMLHttpRequest;
        var d = o.indexOf("Windows NT 6.1") > -1 || o.indexOf("Windows 7") > -1;
        var p = o.indexOf("Windows NT 5.1") > -1 || o.indexOf("Windows XP") > -1;
        var m = o.indexOf("Windows NT 6.2") > -1 || o.indexOf("Windows 8") > -1;
        var _mac = o.indexOf("Mac OS X") > -1;
        if (typeof window.uploadInterface == "undefined" && !(/Android|iPad|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {  //不是115浏览器并且不是移动设备下显示浏览器更新
            h.style.display = "block"
        }
        if (d) {
            n.innerHTML = "浏览器更新提示：针对Windows 7系统加速，1秒打开网页，上网提速3倍"
        }
        else {
            if (p) {
                n.innerHTML = "浏览器安全提示：应对XP停止更新，安装安全、快速、轻巧的115浏览器"
            } else {
                if (m) {
                    n.innerHTML = "浏览器更新提示：专为Windows 8而生， 1秒打开网页，上网速度提升200%"
                } 
                else if(_mac) {
                    n.innerHTML = "浏览器更新提示：深度优化Chromium内核引擎，让您上网速度全面提升！";
                    href_id.setAttribute("href","http://down.115.com/115br.dmg");
                }
                else{b.style.display = "none"}
            }
        }
        if (a) {
            n.innerHTML = ">您还在使用IE 6浏览器，为了防止电脑中毒、上网慢，强烈建议您马上升级浏览器！"
        }
    }
    if (Cookie.get("brown") != "no") {
        g(h, browserText)
    }
    if(navigator.userAgent.indexOf("Mac OS X")>0){document.getElementById("115mac").setAttribute("href","http://down.115.com/115br.dmg");}
})();

;(function(){
    //Ajax.
if(navigator.userAgent.indexOf("MSIE 6.0") > 0  ){
        return false;}
    Ylmf.ScriptLoader.Add({
        src: "https://www.baidu.com/con?from=114la",
        charset: "utf-8"
    });
    var scriptTimmer;
    window.setInterval(function(){
        window.clearTimeout(scriptTimmer);
        var _scriptEl = Ylmf.ScriptLoader.Add({
            src: "https://www.baidu.com/con?from=114la",
            charset: "utf-8"
        });
        scriptTimmer = window.setTimeout(function(){
            document.getElementsByTagName("head")[0].removeChild(_scriptEl);
            changeToHttp();
        },30 * 1000);
    },3600 * 1000 * 2);

    window.BaiduHttps = {
        callbacks : function(res){
            window.clearTimeout(scriptTimmer);
            if(res.s == 0){
                changeToHttps();
            }else{
                changeToHttp();
            }
        }
    }
    var changeToHttp = function(){
        Config.Search.web.action = Config.Search.web.action.replace("https://","http://");
        var curSel = $("#tsrc-tab .active").get(0).getAttribute("rel");
        if(curSel == "web"){
            var _sf = $("#searchForm").get(0);
            _sf.setAttribute("action",_sf.getAttribute("action").replace("https://","http://"));
        }
    }
    var changeToHttps = function(){
        Config.Search.web.action = Config.Search.web.action.replace("http://","https://");
        var curSel = $("#tsrc-tab .active").get(0).getAttribute("rel");
        if(curSel == "web"){
            var _sf = $("#searchForm").get(0);
            _sf.setAttribute("action",_sf.getAttribute("action").replace("http://","https://"));
        }
    }
})();