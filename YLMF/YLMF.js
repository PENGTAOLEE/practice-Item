// YLMF
;(function() {
    window.YLMF = window.YLMF || {};

    YLMF.namespace = function(c) {
        if (!c || !c.length) return null;
        
        var d = c.split("."),
            b = YLMF;

        for (var a = (d[0] == "YLMF") ? 1 : 0; a < d.length; ++a) {
            // 如果存在YLMF 就从第二个开始算起
            b[d[a]] = b[d[a]] || {};
            b = b[d[a]]
        }
        return b
    };

    // 浅拷贝
    YLMF._extend = function(d, s) {
        for (var p in s) {
            d[p] = s[p];
        }
        return d;
    };

    YLMF.isArray = function(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    YLMF.isObject = function(a) {
        return !!a && Object.prototype.toString.call(a) === "[object Object]";
    };

    YLMF.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]';
    },

    YLMF.each = function(obj, fn) {
        var key;
        if (typeof fn !== 'function') return;
        obj = obj || [];
        if (YLMF.isArray(obj)) {
            for (var key = 0, len = obj.length; key < len; key++) {
                fn.call(obj[key], key, obj[key]);
            }
        }

        if (YLMF.isObject(obj)) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    fn.call(obj[key], key, obj[key]);
                }
            }
        }
    };

    YLMF._extend(YLMF, {
        trim: function(str) {
            var str = str || '';
            if (!String.prototype.trim) {
                str = str.replace(/(^\s*)|(\s*$)/g, '')
            } else {
                str = str.trim();
            }
            return str;
        },

        /**
         * 将地址栏查询参数转为json对象
         * @param url
         * @return {Object}
         */
        getQueryParams: function(url, decode){
            if(!url) return {};
            url = url.split("#")[0];

            var us = url.split("?"), 
                obj = {}, 
                u;
            if(us.length > 1) {
                us = us[1].split("&");
                for(var i = 0,len = us.length;i<len;i++){
                    u = us[i].split("=");
                    obj[u[0]]= decode ? decodeURIComponent(u[1]) : u[1];
                }
            }
            return obj;
        },

        // 获取行内样式
        getStyle: function(node, name) {
            var style = node.currentStyle ? node.currentStyle : win.getComputedStyle(node, null);
            return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
        },

        /**
         * 将地址栏指定key的查询参数
         * @param key
         * @param url
         * @return {String}
         * @memberOf oofUtil
         */
        getQueryParamByKey: function(key, url){
            url = url || location.href;
            var obj = this.getQueryParams(url, true);
            return obj[key] || '';
        },

        // 加载js文件
        loadScript: function(config) {
            if (!config || !config.src) return;
            var doc = document;
            var Head = doc.getElementsByTagName('head')[0],
            Script = doc.createElement('script');
            Script.onload = Script.onreadystatechange = function() {
                if (Script && Script.readyState && Script.readyState != 'loaded' && Script.readyState != 'complete') return;
                Script.onload = Script.onreadystatechange = Script.onerror = null;
                Script.Src = '';
                if (!doc.all) {
                    Script.parentNode.removeChild(Script);
                }
                Script = null;
                config.callback && config.callback();
            };
            Script.src = config.src;
            Script.charset = config.charset || 'gb2312';
            Head.insertBefore(Script, Head.firstChild);
            return Script;
        },

        /**
         * 加载一个样式文件
         * @param config.src
         * @param config.key
         * @param config.callback
         */
        loadCss: function(config) {
            var src = config.src || '';
            var key = config.key || '';
            var callback = config.callback || null;
            if(this.isFunction(key)){
                callback = key;
                key = false;
            }

            if(!key||!document.getElementById(key)){
                var link = document.createElement("link");
                link.id = key || "";
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = src;
                link.onreadystatechange = link.onload = function(e){
                    if ( !link.readyState || /loaded|complete/.test( link.readyState ) ) {
                        link.onload = link.onreadystatechange = null;
                        callback&&callback();
                    }
                }
                console.log(link)
                document.getElementsByTagName("head")[0].appendChild(link);
            }else{
                callback && callback();
            }
        },

        // 延时
        deferTimmer: {},
        /**
         * 延时执行
         * @param  { string }   n name
         * @param  { function } fn callback
         * @param  { number }   t time
         * @param  { object }   s 作用域
         * @param  { array }    a arguments
         */
        defer: function(n, fn, t, s, a) {
            t = t || 500;
            s = s || window;
            a = a || [];
            if (n) {
                this.cancelDefer(n);
                this.deferTimmer[n] = window.setTimeout(function() {
                    fn.apply(s, a)
                }, t)
            } else {
                window.setTimeout(function() {
                    fn.apply(s, a)
                }, t)
            }
        },
        cancelDefer: function(n) {
            window.clearTimeout(this.deferTimmer[n])
        },
        // 调用 => YLMF.defer('aa', function() {console.log(arguments)}, 500, window, [1,2,3,4,5,6])

        // 如果数组中有元素满足条件返回 true，否则返回 false。
        some: function(a, fn) {
            if (a.some) {
                return a.some(c)
            }
            
            if (typeof fn != "function") {
                throw new TypeError()
            }
            for (var d = 0, len = a.length; d < len; d++) {
                if (d in a && fn.call(c, a[d], d, a)) {
                    return true
                }
            }
            return false
        },
    }); 
})();

// 字符串
YLMF._extend(YLMF, {
    // 获取唯一ID
    getGUID: (function () {
        var guid_id = 0;
        return function (str) {
            return (str || "") + "_" + (+new Date) + "_" + guid_id++;
        }
    }()),

});



// 事件
YLMF.namespace("Observable");
YLMF._extend(YLMF.Observable, {
    addEvents: function(a) {
        if (YLMF.isObject(a)) {
            for (var c in a) {
                this.addEvents(c)
            }
        } else {
            if (typeof a == "string") {
                this.addEvent(a);
            } else {
                if (YLMF.isArray(a)) {
                    for (var b = 0; b < a.length; b++) {
                        this.addEvent(a[b])
                    }
                }
            }
        }
    },
    addEvent: function(a) {
        if (typeof a == "string") {
            this.events = this.events || {};
            this.events[a] = []
        }
    },
    fireEvents: function(c, a) {
        this.fireEvent(c, a);
    },
    fireEvent: function(c, a) {
        if (typeof c == "string") {
            var b = Array.prototype.slice.call(arguments);;
            this.events && YLMF.each(this.events[c],
            function(d, e) {
                e.apply(a || this, b.slice(2) || [])
            })
        }
    },
    addListener: function(b, c) {
        if (YLMF.isObject(b)) {
            for (var a in b) {
                this.events && this.events[a].push(b[a]);
            }
        } else if (typeof b == "string") {
            this.events && this.events[b].push(c);
        }
    },
    removeEvents: function(a) {
        if (YLMF.isObject(a)) {
            for (var b in a) {
                this.removeEvents(b)
            }
        } else {
            if (typeof a == "STRING") {
                this.events = this.events || {};
                delete this.events[a]
            }
        }
    },
    removeListener: function(b) {
        for (var a in b) {
            this.events && (this.events[a] = YLMF.grep(this.events[a],
            function(d, c) {
                return d != b[a]
            }))
        }
    },
    on: function(b, c) {
        this.addListener(b, c);
    },
    grep: function(a, b, c) {
        var d = [],
        e;
        c = !!c;
        for (var f = 0,
        g = a.length; f < g; f++) e = !!b(a[f], f),
        c !== e && d.push(a[f]);
        return d;
    }
});
YLMF._extend(YLMF, YLMF.Observable);
// 调用方式
/*YLMF.addEvents(["lpt","zdd"]);
YLMF.addListener({
    lpt : function(){
        console.log('hello') 
    },
    zdd: function(){
        console.log('im fine')
    }
});
YLMF.fireEvent("lpt", this, null);*/

// 倒计时
YLMF._extend(YLMF, {
    countdown: function(endTime, serverTime, callback){
        var that = this,
            type = typeof serverTime === 'function',
            end = new Date(endTime).getTime(), // 结束时间戳
            now = new Date((!serverTime || type) ? new Date().getTime() : serverTime).getTime(), // 当前时间戳
            count = end - now,
            time = [
                Math.floor(count/(1000*60*60*24)), //天
                Math.floor(count/(1000*60*60)) % 24, //时
                Math.floor(count/(1000*60)) % 60, //分
                Math.floor(count/1000) % 60 //秒
            ];
        
        if(type) callback = serverTime;
         
        var timer = setTimeout(function(){
          that.countdown(endTime, now + 1000, callback);
        }, 1000);
        
        callback && callback(count > 0 ? time : [0, 0, 0, 0], serverTime, timer);
        
        if(count <= 0) clearTimeout(timer);
        return timer;
    }
});
// 调用
// var endTime = new Date(2018, 4, 5).getTime(), //结束日期
//     serverTime = new Date().getTime(); //假设为当前服务器时间，这里采用的是本地时间，实际使用一般是取服务端的

// YLMF.countdown(endTime, serverTime, function(date, serverTime, timer){
//     var str = date[0] + '天' + date[1] + '时' +  date[2] + '分' + date[3] + '秒';
//     document.getElementById('test').innerHTML = '距离2018年5月5日还有：'+ str;
// });

// 时间
YLMF._extend(YLMF, {
	digit: function(num, length){
		var str = '';
		num = String(num);
		length = length || 2;
		for(var i = num.length; i < length; i++){
		  str += '0';
		}
		return num < Math.pow(10, length) ? str + (num|0) : num;
	},

	toDateString: function(time, format){
		var that = this,
			date = new Date(time || new Date()),
			ymd = [
			that.digit(date.getFullYear(), 4),
			that.digit(date.getMonth() + 1),
			that.digit(date.getDate())
			],
			hms = [
			that.digit(date.getHours()),
			that.digit(date.getMinutes()),
			that.digit(date.getSeconds())
			];
	
		format = format || 'yyyy-MM-dd HH:mm:ss';
  
		return format.replace(/yyyy/g, ymd[0])
			.replace(/MM/g, ymd[1])
			.replace(/dd/g, ymd[2])
			.replace(/HH/g, hms[0])
			.replace(/mm/g, hms[1])
			.replace(/ss/g, hms[2]);
	},

	// 多长时间之前
	timeAgo: function(time, onlyDate){
		var that = this,
		arr = [[], []],
		stamp = new Date().getTime() - new Date(time).getTime();
		
		//返回具体日期
		if(stamp > 1000*60*60*24*8){
		  stamp =  new Date(time);
		  arr[0][0] = that.digit(stamp.getFullYear(), 4);
		  arr[0][1] = that.digit(stamp.getMonth() + 1);
		  arr[0][2] = that.digit(stamp.getDate());
		  
		  //是否输出时间
		  if(!onlyDate){
			arr[1][0] = that.digit(stamp.getHours());
			arr[1][1] = that.digit(stamp.getMinutes());
			arr[1][2] = that.digit(stamp.getSeconds());
		  }
		  return arr[0].join('-') + ' ' + arr[1].join(':');
		}
		
		//30天以内，返回“多久前”
		if(stamp >= 1000*60*60*24){
		  return ((stamp/1000/60/60/24)|0) + '天前';
		} else if(stamp >= 1000*60*60){
		  return ((stamp/1000/60/60)|0) + '小时前';
		} else if(stamp >= 1000*60*2){ //2分钟以内为：刚刚
		  return ((stamp/1000/60)|0) + '分钟前';
		} else if(stamp < 0){
		  return '未来';
		} else {
		  return '刚刚';
		}
	}
});

if(window.define) {
    define(function(){
        return YLMF;
    })
};


