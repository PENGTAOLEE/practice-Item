/**
 * User: linweilong(TGL)
 * Date: 2014-01-14 14:06
 */
var __uri = function(uri){
    return uri;
}
;(function(){
    var toString = Object.prototype.toString,
    /*hasOwn = Object.prototype.hasOwnProperty,
     push = Array.prototype.push,
     slice = Array.prototype.slice,*/
        trim = String.prototype.trim,
    //indexOf = Array.prototype.indexOf,
    // Used for trimming whitespace
        trimLeft = /^\s+/,
        trimRight = /\s+$/,

        class2type = {};
    (function(){
        var arr = "Boolean Number String Function Array Date RegExp Object".split(" "),name;
        for(var i = 0;i<arr.length;i++){
            name = arr[i];
            class2type[ "[object " + name + "]" ] = name.toLowerCase();
        }
    }());
    var core_hasOwn = class2type.hasOwnProperty;

    var _type=function( obj ) {
        return obj == null ?
            String( obj ) :
            class2type[ toString.call(obj) ] || "object";
    },isFunction =function( obj ) {
        return _type(obj) === "function";
    } ,isArray = Array.isArray || function( obj ) {
        return _type(obj) === "array";
    },	isWindow = function( obj ) {
        return obj != null && obj == obj.window;

    }, isPlainObject =function( obj ) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if ( !obj || _type(obj) !== "object" || obj.nodeType || isWindow( obj ) ) {
            return false;
        }

        try {
            // Not own constructor property must be Object
            if ( obj.constructor &&
                !core_hasOwn.call(obj, "constructor") &&
                !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                return false;
            }
        } catch ( e ) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.

        var key;
        for ( key in obj ) {}

        return key === undefined || core_hasOwn.call( obj, key );
    }


    var extend = function(){
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !isFunction(target) ) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( length === i ) {
            target = this;
            --i;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];

                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = extend( deep, clone, copy );

                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }

    var getNamespace = function(namespace,orgObj,has_parent){
        namespace =namespace.split(".");
        var obj = orgObj || window,key,parent;
        while(key = namespace.shift()){
            if(!obj[key]) return undefined;
            parent = obj;
            obj = obj[key];
        }
        if(obj && has_parent){
            return [obj,parent];
        }
        return obj;

    }

    var createNamespace = function(namespace,orgObj,object){
        namespace =namespace.split(".");
        var obj = orgObj || window,key,last = namespace.pop();
        object = object || {};
        while(key = namespace.shift()){
            if(!obj[key]) obj[key] = {};
            obj = obj[key];
        }
        if(!obj[last]) obj[last] = object;
        else extend(obj[last] , object)

        return obj[last];
    }


    /**
     * @class oofUtil
     *
     * */
    var oofUtil = createNamespace("oofUtil");

    oofUtil = extend(oofUtil,
        /**
         * @class oofUtil
         * */
        {
        /**
         * 获取obj的类型
         * @param obj
         * @returns {string}
         * @function
         */
        type: _type,
        /**
         * 判断obj是否为数组
         * @param obj
         * @returns {boolean}
         * @function
         */
        isArray: isArray,
        /**
         * 是否为数字（数字字符串）
         * @param obj
         * @returns {boolean}
         */
        isNumeric: function( obj ) {
            return !isNaN( parseFloat(obj) ) && isFinite( obj );
        },
        /**
         * 是否为函数
         * @param obj
         * @returns {boolean}
         * @function
         */
        isFunction: isFunction,
        /**
         * 是否为普通对象
         * @param obj
         * @returns {boolean}
         * @function
         */
        isPlainObject:isPlainObject,
        /**
         * 是否为window对象
         * @param obj
         * @returns {boolean}
         * @function
         */
        isWindow:isWindow,
        /**
         * 创建命名空间
         * @param namespace 命名空间串
         * @param orgObj 相对对象（默认为window）
         * @param object 初始对象（默认为{}）
         * @returns {object}
         * @function
         */
        createNamespace:createNamespace,
        getNamespace:getNamespace,
        /**
         * 合并对象到第一个参数 (摘抄自jQuery)
         * @returns {*|{}}
         * @function
         */
        extend:extend,
        /**
         * 去除字符串两端空字符
         * @param text
         * @returns {string}
         * @function
         */
        trim: trim ?
            function( text ) {
                return text == null ?
                    "" :
                    trim.call( text );
            } :

            // Otherwise use our own trimming functionality
            function( text ) {
                return text == null ?
                    "" :
                    text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
            },
        /**
         * 获取一个唯一ID
         * @param str 前缀
         * @returns {string}
         * @function
         */
        getGUID:(function () {
            var guid_id = 0;
            return function (str) {
                return (str || "") + "_" + (+new Date) + "_" + guid_id++;
            }
        }()),
        /**
         * 获取一个唯一ID
         * @param prefix
         * @param more_entropy
         * @returns {*}
         */
        uniqid : function  (prefix, more_entropy) {
            if (typeof prefix == 'undefined') {
                prefix = "";
            }

            var retId;
            var formatSeed = function (seed, reqWidth) {
                seed = parseInt(seed, 10).toString(16); // to hex str
                if (reqWidth < seed.length) { // so long we split
                    return seed.slice(seed.length - reqWidth);
                }
                if (reqWidth > seed.length) { // so short we pad
                    return Array(1 + (reqWidth - seed.length)).join('0') + seed;
                }
                return seed;
            };

            if (!this.php_js) {
                this.php_js = {};
            }
            if (!this.php_js.uniqidSeed) { // init seed with big random int
                this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
            }
            this.php_js.uniqidSeed++;

            retId = prefix; // start with prefix, add current milliseconds hex string
            retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
            retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
            if (more_entropy) {
                // for more entropy we add a float lower to 10
                retId += (Math.random() * 10).toFixed(8).toString();
            }

            return retId;
        },
        /**
         * 加载一个样式文件
         * @param src
         * @param key
         * @param callback
         */
        loadCss:function(src,key,callback){
            if(oofUtil.type(key)=="function"){
                callback =key;
                key = false;
            }
            if(!key||!document.getElementById(key)){
                var link = document.createElement("link");
                link.id = key||"";
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = src;
                link.onreadystatechange = link.onload = function(e){
                    if ( !link.readyState || /loaded|complete/.test( link.readyState ) ) {
                        link.onload = link.onreadystatechange = null;
                        callback&&callback();
                    }
                }
                document.getElementsByTagName("head")[0].appendChild(link);
            }else{
                callback&&callback();
            }

        },
        /**
         * 输出信息到控制台
         * @param obj
         * @param msg
         */
        log:function(obj,msg){
            try {
                if (window.console) {
                    if (msg) {
                        console.log(obj, msg);
                    }
                    else {
                        console.log(obj);
                    }
                }
            }catch (e) {}
        },
        mLog:function(obj,msg){
            try {
                if (window.console) {
                    if (msg) {
                        console.log(obj, msg);
                    }
                    else {
                        console.log(obj);
                    }
                }
            }catch (e) {}
        }
    });

    //oofUtil.bindLabelHide
    ;(function(){
        var doms=[],labs=[],timer=null;

        /**
         * 文本框有内容的时候隐藏对应的label
         * @param domIds jquery对象   #id数组   #id逗号分隔
         * @memberOf oofUtil
         */
        oofUtil.bindLabelHide=function(domIds,labLs){
            var tmp=domIds.jquery?domIds:domIds.join?jQuery(domIds.join(",")):jQuery(domIds);

            if(labLs){
                labLs=labLs.jquery?labLs:labLs.join?jQuery(labLs.join(",")):jQuery(labLs);
                for(var i= 0,c=tmp.length;i<c;i++){
                    doms.push(tmp.eq(i));
                    labs.push(labLs.eq(i));
                }
            }else{
                tmp.each(function(){
                    var lab=jQuery("[for="+this.id+"]");
                    if(lab.length>0)
                    {
                        doms.push(jQuery(this));
                        labs.push(lab);
                    }
                });
            }

            if(!timer){
                timer=setInterval(function(){
                    for(var i= 0,c=doms.length;i<c;i++)
                    {
                        try{
                            labs[i][doms[i].val()==""?"show":"hide"]();
                        }catch(e){

                        }

                    }
                },50);
            }

        }
    }());

    //oofUtil.getQueryParams
    //oofUtil.getQueryParamByKey
    ;(function(){
        var _cache = {
            queryValues:{}
        };
        /**
         * 将地址栏查询参数转为json对象
         * @param url
         * @return {Object}
         * @memberOf oofUtil
         */
        oofUtil.getQueryParams=function(url,decode){
            if(!url) return {};
            url=url.split("#")[0];
            var us=url.split("?"),obj={},u;
            if(us.length>1){
                us=us[1].split("&");
                for(var i= 0,c=us.length;i<c;i++){
                    u=us[i].split("=");
                    obj[u[0]]=decode? decodeURIComponent(u[1]) : u[1];
                }
            }
            return obj;
        }

        /**
         * 将地址栏指定key的查询参数
         * @param key
         * @param url
         * @return {String}
         * @memberOf oofUtil
         */
        oofUtil.getQueryParamByKey=function(key,url){
            url=url||location.href;
            var obj=_cache.queryValues[url]||(_cache.queryValues[url]=oofUtil.getQueryParams(url));
            return obj[key]||"";
        }
    }());


    //oofUtil.bindSearchInputHide
    ;(function(window,undefined){
        var timer,list=[];

        function startTimer(){
            timer=setInterval(function(){
                for(var i= 0,c=list.length, d,v;i<c;i++)
                {
                    try{
                        d=list[i];
                        v= $.trim(d.ipt.val());
                        d.lab&&d.lab[v==""?"show":"hide"]();
                        d.clr&&d.clr[v==""?"hide":"show"]();
                    }catch(e){

                    }
                }
            },200);
        }

        /**
         * 绑定搜索框默认事件
         * @param callback
         * @param clearCallback
         */
        oofUtil.bindSearchInputHide = function (opt,callback) {
            if(!opt || !opt.ipt.length) return ;
            opt.clr&&opt.clr.click(function(){
                opt.ipt.val("");
                callback&&callback();
                return false;
            })
            list.push(opt);
            if(!timer){
                startTimer();
            }
            //util.bindLabelHide("#js-search_input");
        };
    }(window));

    oofUtil.getAjaxPagerHtml=function(curr,pageSize,record,size){
        var half=~~(size/2),b,e,page, t,arr=[],i;
        curr=curr||0;
        pageSize=pageSize||20;
        b=curr-half;
        e=curr+ half;
        record=record||0;
        t=record%pageSize;
        page=parseInt(record/pageSize);
        curr=curr||1;
        if(t) page++;

        if(page<=1) return "";

        if(page<=size+4){
            b=1;
            e=page;
        }else{
            if(curr==page-half){
                b--;
            }

            if(b<1){
                b=1;
                e=b+size;
            }else if(b==3){
                b=1;
            }

            if(curr==1+half){
                e++;
            }

            if(e>page){
                e=page;
                if(b!=1)
                    b=e-size;
                if(b<1) b=1;
            }else if(e==page-2){
                e=page;
            }
        }


        if(curr!=1){
            arr.push("<a href='javascript:;' class='prev' start='"+((curr-2)*pageSize)+"'>\u4E0A\u4E00\u9875</a>");
        }else{
            arr.push("<span class='prev'>\u4E0A\u4E00\u9875</span>");
        }

        if(b!=1){
            arr.push(curr==1?"<span class='current'>1</span>":"<a href='javascript:;' start='0'>1</a>");
            if(b!=2)
                arr.push("<a href='javascript:;' start='"+((curr-size-1)*pageSize)+"'>...</a>");
        }
        for(i=b;i<=e;i++){
            arr.push(curr==i?"<span class='current'>"+i+"</span>":"<a href='javascript:;' start='"+((i-1)*pageSize)+"'>"+i+"</a>");
        }

        if(e!=page){
            if(e!=page-1)
                arr.push("<a href='javascript:;' start='"+((curr+size-1)*pageSize)+"'>...</a>");
            arr.push(curr==page?"<span class='current'>"+page+"</span>":"<a href='javascript:;' start='"+((page-1)*pageSize)+"'>"+page+"</a>");
        }
        if(curr!=page){
            arr.push("<a href='javascript:;' class='next' start='"+(curr*pageSize)+"'>\u4E0B\u4E00\u9875</a>");
        }else{
            arr.push("<span class='next'>\u4E0B\u4E00\u9875</span>");
        }
        return arr.join("");
    };

    //oofUtil.getIframes
    ;(function(){
        function find(win,doc){
            var $list = doc.find('iframe');
            var rs =[] ;
            $list.each(function(){
                try{
                    var w = this.contentWindow || this.window;
                    if(w==win){
                        rs=[this];
                        return false;
                    }
                    var r = find(win, jQuery(w.document));
                    if(r&& r.length){
                        r.push(this);
                        rs = r;
                        return false;
                    }
                }catch(e){}
            })
            return rs;
        }

        /**
         * 获取当前win的iframe序列
         * @param win
         * @returns {*}
         */
        oofUtil.getIframes = function(win){
            try{
                return find(win,jQuery(top.document));
            }catch(e){

            }
        }
    }());

    //oofUtil.focusEnd
    //oofUtil.selectAll
    //oofUtil.select
    ;(function(){
        function select(ele,begin,end){
            try{
                if(ele.createTextRange){

                    var rng = ele.createTextRange();
                    rng.collapse();
                    rng.select();
    /*
                    rng.moveStart("character",begin);
                    rng.moveEnd("character",end);
    */

                    var r = (document.selection||document.getSelection()).createRange();
                    r.collapse(false);
                    r.moveStart("character", begin);//从m位开始
                    r.moveEnd("character", end);//选取n位
                    r.select();


                }else if(ele.setSelectionRange){
                    ele.setSelectionRange(begin,end);
                    ele.focus();
                }
            }catch(e){}
        }

        /**
         * 焦点定位到输入框最后
         * @method focusEnd
         * @param ele
         */
        oofUtil.focusEnd = function(ele){
            select(ele,ele.value.length,ele.value.length)
        }
        /**
         * 选中输入框所有内容
         * @method selectAll
         * @param ele
         */
        oofUtil.selectAll = function(ele){
            select(ele,0,ele.value.length)
        }
        /**
         * 选中输入框指定内容
         * @method select
         * @param ele
         * @param begin
         * @param end
         *
         */
        oofUtil.select = select;

        /**
         * 获取当前光标开始\结束位置
         * @param elem
         * @returns {*}
         */
        oofUtil.getCursor = function(elem){
            if (elem.selectionStart !== undefined) {
                return {
                    selectionStart:elem.selectionStart,
                    selectionEnd:elem.selectionEnd
                };
            } else { //IE 6,7,8
                var range = document.selection.createRange();
                var len = range.text.length;
                range.moveStart("character", -elem.value.length);
                var start = range.text.length;
                return {
                    selectionStart:start,
                    selectionEnd:start+len
                };
            }
        }

        oofUtil.insertText = function(elem,text){
            var cur = oofUtil.getCursor(elem);
            text = text || '';
            elem.value = elem.value.substring(0, cur.selectionStart) + text + elem.value.substring(cur.selectionEnd, elem.value.length);
            select(elem,cur.selectionStart +text.length,cur.selectionStart +text.length);

        }
    }());

    //oofUtil.param
    ;(function(){
        /**
         * 组装提交参数
         * @param a
         * @param traditional
         * @returns {string}
         */
        oofUtil.param = function( a, traditional ) {
            var s = [],
                add = function( key, value ) {
                    // If value is a function, invoke it and return its value
                    value = oofUtil.isFunction( value ) ? value() : value;
                    s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
                };

            // If an array was passed in, assume that it is an array of form elements.
            if ( oofUtil.isArray( a ) || ( a.jquery && !oofUtil.isPlainObject( a ) ) ) {
                // Serialize the form elements
                jQuery.each( a, function() {
                    add( this.name, this.value );
                });

            } else {
                // If traditional, encode the "old" way (the way 1.3.2 or older
                // did it), otherwise encode params recursively.
                for ( var prefix in a ) {
                    buildParams( prefix, a[ prefix ], traditional, add );
                }
            }

            // Return the resulting serialization
            return s.join( "&" );
        }

        var rbracket = /\[\]$/;
        function buildParams( prefix, obj, traditional, add ) {
            if ( oofUtil.isArray( obj ) ) {
                // Serialize array item.
                for(var i= 0,v,c=obj.length;i<c;i++){
                    v = obj[i];
                    if ( traditional || rbracket.test( prefix ) ) {
                        // Treat each array item as a scalar.
                        add( prefix, v );

                    } else {
                        buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
                    }
                }


            } else if ( !traditional && jQuery.type( obj ) === "object" ) {
                // Serialize object item.
                for ( var name in obj ) {
                    buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
                }

            } else {
                // Serialize scalar item.
                add( prefix, obj );
            }
        }

    }());

    //oofUtil.loadJs
    //oofUtil.checkLoadModules
    ;(function(){
        oofUtil.loadJs = function(src,callback){

            if(window.seajs){
                seajs.use(src,callback);
            }else{
                $.getScript(src,callback);
            }
        }

        function loadCallback(modules,callback){
            var rs = [];
            for(var i= 0,k,c=modules.length;i<c;i++){
                k = modules[i];
                rs.push(oofUtil.getNamespace(k));
            }
            callback && callback(rs);
        }

        var baseSets={
            'detectZoom':'libs/detect-zoom/detect-zoom.js',
            'oofUtil.shell':'shell.js',
            'oofUtil.cookies':'oofUtil/cookies.js',
            'oofUtil.date':'oofUtil/date.js',
            'oofUtil.localData':'oofUtil/localData.js',
            'oofUtil.mouse':'oofUtil/mouse.js',
            'oofUtil.pinyin':'oofUtil/pinyin.js',
            'oofUtil.position':'oofUtil/position.js',
            'oofUtil.stringHelper':'oofUtil/stringHelper.js',
            'oofUtil.subscribe':'oofUtil/subscribe.js',
            'oofUtil.template':'oofUtil/template.js',
            'oofUtil.title':'oofUtil/title.js',
            'oofUtil.validate':'oofUtil/validate.js',
            'oofUtil.autoToken':'ajax/autoToken.js',
            'oofUtil.baseConnect':'ajax/baseConnect.js',
            'oofUtil.bridge':'ajax/bridge.js',
            'oofUtil.fileUpload':'ajax/fileUpload.js'
        };
        var reg =  /^(http[s]?:)?\/\//i;
        oofUtil.checkLoadModules = function(modules,callback,sets){
            if(!sets) sets={};
            if(!modules){
                modules = [];
                for(var k in sets){
                    modules.push(k);
                }
            }
            var rs = [];
            var ors = []
            for(var i= 0,k,c=modules.length;i<c;i++){
                k = modules[i];
                if(!oofUtil.getNamespace(k)){
                    k = sets[k] || baseSets[k];
                    if(k){
                        if(reg.test(k)){
                            ors.push(k);
                        }else{
                            rs.push(k);
                        }
                    }
                }
            }

            while(rs.length>10){
                ors.push('//assets.116cdrc.com/??'+rs.splice(0,9).join(','));
            }
            if(rs.length>0){
                ors.push('//assets.116cdrc.com/??'+rs.join(','));
            }
            if(ors.length){
                oofUtil.loadJs(ors,function(){
                    loadCallback(modules,callback);
                });
            }else{
                loadCallback(modules,callback);
            }

        }
    })();

    //oofUtil.focusWindow
    ;(function(){
        /**
         * 使光标定位在指定win
         * @param win
         */
        oofUtil.focusWindow=function(win){

            try{
                win = win || window;
                var $sel = win.jQuery('#js_oof_focus_sel__');
                if(!$sel.length){
                    $sel = win.jQuery('<select name="" id="js_oof_focus_sel__" style="position: absolute; left:-9999px; width: 10px;top:0"><option value=""></option></select>').appendTo(win.jQuery(win.document.body));
                }
                var st = Math.max((win.document.documentElement||win.document.body).scrollTop,win.document.body.scrollTop);
                $sel.css({top:10+st});
                $sel.focus();
                $sel.css({top:0});
                setTimeout(function(){
                    $sel.blur();
                },10)

            }catch(e){}
        }
    }());

    //oofUtil.loadImgSize
    ;(function(){

        /**
         * 获取图片尺寸
         * @param src
         * @param callback
         * @param loaded
         * @param notloadend
         */
        oofUtil.loadImgSize = function(src,callback,loaded,notloadend){
            var img = new Image();
            var timer;

            function c(tf){
                try{
                    timer && clearInterval(timer);
                    img.onreadystatechange = undefined;
                    if(tf){
                        img.onload = undefined;
                        img.onerror =  undefined;
                        img.src = 'about:blank'
                    }
                }catch(e){

                }
            }

            function _(onload){
                if(!img.src || img.src=='about:blank'){
                    return ;
                }
                var tmp=callback,tmp1=loaded;
                if(img.complete){//加载完成
                    loaded = null;
                    callback = null;
                    tmp && tmp(img.width,img.height)
                    tmp1 && tmp1(img);
                    c(true);
                }
                if(img.width>0||img.height>0){ //有宽高信息了

                    callback = null;
                    tmp && tmp(img.width,img.height);
                    c(notloadend);
                }

            }
            img.onerror = function(){
                var tmp=callback,tmp1=loaded;
                loaded = null;
                callback = null;
                c(true);
                tmp && tmp(0,0);
                tmp1 && tmp1(false);
            }

            img.onload =function(){
                _(true);
            } ;
            if(!notloadend){
                img.onreadystatechange = _;
                timer = setInterval(_,30);
            }

            img.src = src;

            _();
        }
    }());

    oofUtil.html2Text = function(v,double_encode){

            v = (v||"").toString();
            if (double_encode !== false && double_encode!=='false') {
                v = v.replace(/&/g, '&amp;');
            }
            v = v.replace(/</g, '&lt;').replace(/>/g, '&gt;');

            return v;
    }

    oofUtil.text2Html = (function() {
        // Remove HTML Entities
        var element = document.createElement('div');

        function decode_HTML_entities (str) {

            if(str && typeof str === 'string') {

                // Escape HTML before decoding for HTML Entities
                str = escape(str).replace(/%26/g,'&').replace(/%23/g,'#').replace(/%3B/g,';');

                element.innerHTML = str;
                if(element.innerText){
                    str = element.innerText;
                    element.innerText = '';
                }else{
                    // Firefox support
                    str = element.textContent;
                    element.textContent = '';
                }
            }
            return unescape(str);
        }
        return decode_HTML_entities;
    })();

    oofUtil.versionCompare = function( stra, strb ) {
        var straArr = stra.split('.');
        var strbArr = strb.split('.');
        var maxLen = Math.max( straArr.length, strbArr.length );
        var result, sa, sb;
        for ( var i = 0; i < maxLen; i++ ) {
            sa = ~~straArr[i];
            sb = ~~strbArr[i];
            if(sa > sb){
                result = 1;
            }
            else if(sa < sb){
                result = -1;
            }
            else {
                result = 0;
            }
            if ( result !== 0 ) {
                return result;
            }
        }
        return result;
    }

    if(window.define){
        define(function(){
            return oofUtil;
        })
    }else{

    }
    //return util;
}());


;(function(){
    var area_data;
    function getoption(data){
        if(!data||data.length==0) return "";
        var i, d, c,arr=[];
        for(i=0,c=data.length;i<c;i++){
            d=data[i];
            arr.push("<option value='");
            arr.push(d.id);
            arr.push("'>");
            arr.push(d.name);
            arr.push("</option>");
        }
        return arr.join("");
    }

    var setArea = function (areaid, $dom) {
        var o = {};
        o.area_id1 = Math.floor(areaid / 10000) * 10000;
        o.area_id2 = o.area_id1 == areaid ? undefined : Math.floor(areaid / 100) * 100;
        o.area_id3 = !o.area_id2 || o.area_id2 == areaid ? undefined : areaid;
        if($dom) {
            setTimeout(function () {
                $dom.find('[rel-select="group_prov"]').val(o.area_id1).change();
                setTimeout(function () {
                    $dom.find('[rel-select="group_city"]').val(o.area_id2).change();
                    setTimeout(function () {
                        $dom.find('[rel-select="group_last"]').val(o.area_id3).change();
                    },15);
                },15);
            }, 15);
        }
        return o;
    }
    var area = oofUtil.areaDatar = {
        getProvs:function(){
            var provs = [];
            var i = 0;
            for(p in area_data) {
                if( p=='l' ) continue;
                provs[i] = {'id':p, 'name':area_data[p].n };
                i++;
            }
            return provs;
        },
        getCitys:function(prov){

            var citys = [],data=area_data[prov];

            if(!data || data.l == 0) {
                return false;
            }
            data=data["c"];
            for(c in data) {
                if( c=='l' ) continue;
                citys.push({'id':c, 'name':data[c].n });
            }
            return citys;
        },
        getTowns : function( city) {
            var towns = [],data;
            var prov = Math.floor( city / 10000 ) * 10000;
            data=area_data[prov];
            if( !data || !data['c'] || !data['c'][city] || !data['c'][city].l ) {
                return false;
            }
            data=data['c'][city]['t'];
            for(var t in data) {
                towns.push({ 'id':t, 'name':data[t] });
            }
            return towns;
        },
        getName:function(d){
            var prov = Math.floor( d / 10000 ) * 10000,
                city= Math.floor( d / 100 ) * 100,arr=[],data;
            data=area_data[prov];
            if(data){
                arr.push(data.n);
                if(data.l&&(data=data["c"][city])){
                    arr.push(data.n);
                    if(data.l&&(data=data["t"][d])){
                        arr.push(data);
                    }
                }
            }
            return arr;
        },
        getProvOption:function(){
            return getoption(area.getProvs());
        },
        getCityOption:function(prov){
            return getoption(area.getCitys(prov));
        },
        getTownOption:function(city){
            return getoption(area.getTowns(city));
        },
        init:function (box, data, location_id, param) {
            area_data = data;
            var not_e = false;
            if(param){
                not_e = param.not_e;
            }
            var html = [];
            html.push('<div class="select-wrap"><select rel-select="group_prov"><option value="0">不限</option></select></div>');
            html.push('<div class="select-wrap"><select rel-select="group_city"><option value="0">不限</option></select></div>');
            if(param && param.three_level){
                html.push('<div class="select-wrap"><select rel-select="group_last"><option value="0">不限</option></select></div>');
            }
            html.push('<input type="hidden" value="" name="location_id" />');
            box.html(html.join(''));

            var getLocation = function () {
                var arr = [];
                box.find('select').each(function () {
                    if($(this).val() != 0) {
                        arr.push( $(this).val() );
                    }
                })
                if(arr.length) {
                    box.find('[name="location_id"]').val(arr[arr.length-1]);
                }else {
                    box.find('[name="location_id"]').val('');
                }
            }

            box.find('[rel-select="group_prov"]').empty().append(  (not_e ? '' : "<option value='0'>不限</option>")).append(oofUtil.areaDatar.getProvOption()).change(function () {
                var $city = box.find('[rel-select="group_city"]');

                var _html =  (not_e ? '' : "<option value='0'>不限</option>") + oofUtil.areaDatar.getCityOption($(this).val());

                $city.html( _html ).parent().show()

                if(!_html.length) {
                    $city.parent().hide();
                }

                var $last = box.find('[rel-select="group_last"]');

                _html = (not_e ? '' : "<option value='0'>不限</option>") + oofUtil.areaDatar.getTownOption($(this).val());

                $last.html( _html ).parent().show();

                if(!_html.length) {
                    $last.parent().hide();
                }
                box.find('[rel-select="group_city"]').change();

                getLocation();
                setTimeout(function () {
                    $city.change(function () {
                        $last.html(  (not_e ? '' : "<option value='0'>不限</option>") + oofUtil.areaDatar.getTownOption($(this).val()));
                        setTimeout(function () {
                            $last.change();
                        },10);
                        getLocation();
                    });
                }, 10);
            });

            box.find('[rel-select="group_city"]').change(function () {
                var $town = box.find('[rel-select="group_last"]');
                $town.html((not_e ? '' : "<option value='0'>不限</option>")  + oofUtil.areaDatar.getTownOption($(this).val()));
                if ($town.children().length <= 1) {
                    $town.parent().hide();
                } else {
                    $town.parent().show();
                }
            });

            if(location_id) {
                setArea(location_id, box);
            }else {
                if(not_e) {
                    setArea(110000, box);
                }
            }

        }
    };
}());
