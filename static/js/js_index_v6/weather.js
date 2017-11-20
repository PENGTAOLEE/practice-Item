var BSG = ["1010101","1010201","1012801","1012806"],isBSG=1;  //为北上广深定义的参数
;(function($) {
    //添加数组IndexOf方法 ie7\8
    if(!Array.prototype.indexOf){Array.prototype.indexOf=function(elt){var len=this.length>>>0;var from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0)from+=len;for(;from<len;from++){if(from in this&&this[from]===elt)return from}return-1}}
    var W = document.getElementById('weather');
    var Weather = {
        CityCookieName: 'citydata_v2',
        DefaultCity: ['10101', '1010101', '101010100', '北京', '北京' , '北京'],
        StatIPQueue: [],
        StatGetQueue: [],
        NewCityArrs: {},  //定义一个新的城市类，初始为空
        NowCity:[],  //定义一个当前选择城市数组，初始为空
        tipTimeout:null,  //下雨提示timeout
        Set: function() {
            var that = this;
            if($("#w_city option").length==0){  //未加载过天气选择时
                $.get("static/city/base.json",
                    function(data){
                        var _option = "";
                        for(var i in data){
                            var zm = data[i].split(",")[0];
                            var wz = data[i].split(",")[1];
							i = String(i).indexOf('k') > -1 ? parseInt(i.substring(1)) : i;
                            if(i==that.NowCity[0]){
                                _option += "<option value='"+i+"' selected='selected'>"+zm+"&nbsp;"+wz+"</option>";
                            }
                            else{_option += "<option value='"+i+"'>"+zm+"&nbsp;"+wz+"</option>";}
                        }
                        $("#w_pro").html(_option);
                        that.NewCityArrs["base"] = data;
                        that.initCitys(that.NowCity[0],that.NowCity[4]);
                    },
                "json");
            }
            W.style.display = "none";
            $("#setCityBox").show();
        },
        ShowStatus: function(num) {
            if (!num) {return;}
            $(".weather-tip").hide();
            var that = this;
            switch (num) {
            case 100:
                str = '正在判断城市，请稍后...&nbsp; <a href="javascript:void(0);" onclick="Weather.Set();return false;" target="_self">[手动设置]</a> <a href="http://tool.114la.com/tianqi/">快速查看</a>';
                break;
            case 101:
                str = '判断城市失败，默认为北京，请手动设置。';
                break;
            case 102:
                str = '正在获取天气数据，请稍候... <a href="http://tianqi.114la.com" target="_blank">快速查看</a>';
                break;
            case 404:
                str = '很抱歉，暂无该城市天气数据。<a href="javascript:void(0);" onclick="Weather.Set();return false;" target="_self">[选择其它城市]</a>';
                break;
            case 500:
                str = '服务器错误或本地网络过慢。<a href="javascript:void(0);" target="_self" onclick="Weather.Init();return false;">[点击重试]</a>';
                break;
            case 200:
                var result = arguments[1];
                var weekStr = ['日', '一', '二', '三', '四', '五', '六'],
                nowD = new Date();
                var w1 = nowD.getDay();
                var w2 = nowD.getDay() == 6 ? 0 : w1 + 1;
                var QUA = result[8]&&result[9] ? '<p class="air_qua">空气质量：<a href="#{air_url}">#{air_aqi}<span class="#{qua_lev}">#{air_qua}</span></a></p>':'';
                var TPL = '<ul class="weather"><li><h4 class="city">#{city}<a class="cut" href="javascript:void(0);" target="_self" onclick="Weather.Set();return false;">[切换]</a></h4>'+QUA+'</li><li class="tWrap"><div class="i"><a href="#{tq_url}"><img title="#{img1_title}" src="#{img1}.png" /></a></div><a href="#{tq_url}" class="t">今&nbsp;#{today}<i class="tem">#{img1_title}</i></a></li><li class="mWrap"><div class="i"><a href="#{tq_url}"><img  title="#{img2_title}" src="#{img2}.png" /></a></div><a href="#{tq_url}"  class="t">明&nbsp;#{tomorrow}<i class="tem">#{img2_title}</i></a></li></ul>';
                var str = format(TPL, {
                    cityid: result[3],
                    city: result[0],
                    today: result[1],
                    tomorrow: result[2],
                    img1: result[4],
                    img2: result[5],
                    week1: weekStr[w1],
                    week2: weekStr[w2],
                    img1_title: result[6],
                    img2_title: result[7],
                    air_aqi:result[8],
                    qua_lev:result[9],
                    air_qua:result[10] ? result[10].substr(0,2):result[10],
                    air_url:result[11],
                    tq_url:result[12]
                });
                var nowcity;
                if($("#w_city option").length==0){  //未加载过天气选择时
                    nowcity = Cookie.get(Weather.CityCookieName).split(",");
                }
                else{
                    nowcity = [$("#w_pro").val(), $("#w_city").val(), $("#l_city").val(),$("#w_pro option:selected").html().split("&nbsp;")[1],$("#w_city option:selected").html().split("&nbsp;")[1],$("#l_city option:selected").html().split("&nbsp;")[1]];
                    Cookie.set(Weather.CityCookieName,nowcity);
                }
                this.NowCity = nowcity;
                if(typeof forBSGS != "undefined" && typeof BSGS != "undefined"){forBSGS();}  //要判断北上广深加的代码
                break;
            }
            W.innerHTML = str;
        },
        AutoGetData: function(data){  //获取ip后加载城市、天气
            var that = this;
            var _option = "";
            for(var i in data){
                var zm = data[i].split(",")[0];
                var wz = data[i].split(",")[1];
				i = String(i).indexOf('k') > -1 ? parseInt(i.substring(1)) : i;
                if(wz==ILData[2]){
                    _pid=i;
                    _wz=wz;
                    _option += "<option value='"+i+"' selected='selected'>"+zm+"&nbsp;"+wz+"</option>";
                    that.initCitys(_pid,ILData[3],function(){
                        var a_id = $("#l_city option:selected").val();
                        that.Get(a_id);
                    });
                }
                else{_option += "<option value='"+i+"'>"+zm+"&nbsp;"+wz+"</option>";}
            }
            $("#w_pro").html(_option);
            that.NewCityArrs["base"] = data;
        },
        Ip2City: function(callback) {
            this.ShowStatus(100);
            Ylmf.ScriptLoader.Add({
                src: 'http://api.114la.com/ip',
                charset: 'gb2312'
            });
            var that = this;
            if (typeof Ip2CityTimeOut != "undefined") {
                window.clearTimeout(Ip2CityTimeOut)
            }
            var Ip2CityTimeOut = window.setTimeout(function() {
                Cookie.clear(this.CityCookieName);
                callback && callback(that.DefaultCity)
            },
            3000);
            window.ILData_callback = function() {
                if (typeof(ILData) != "undefined") {
                    if (typeof Ip2CityTimeOut != "undefined") {
                        window.clearTimeout(Ip2CityTimeOut)
                    }
                    if (ILData[2] && ILData[3]) {
                        if(!that.NewCityArrs["base"]){  //城市根文件不存在时
                            var _pid,_cid,_wz;
                            $.get("static/city/base.json",
                                function(data){
                                    that.AutoGetData(data);
                                },
                            "json");
                        }
                        else{  //城市根文件已加载过时
                            var cityBase = that.NewCityArrs["base"];
                            that.AutoGetData(cityBase);
                        }
                    }
                    else {
                        that.ShowStatus(101);
                        Cookie.set(that.CityCookieName, that.DefaultCity);
                        that.NowCity = that.DefaultCity;
                    }
                }
                else{
                    that.ShowStatus(101);
                    Cookie.set(that.CityCookieName, that.DefaultCity);
                    that.NowCity = that.DefaultCity;
                }
            }
        },
        Get: function(cityid) {
            if (!cityid) return;
            var showStatus = this.ShowStatus;
            var that = this;
            showStatus(102);
            Ylmf.ScriptLoader.Add({   //加载服务器时间
                src: "http://api.tianqi.114la.com/weather/index.php/Api/serverDate",
                charset: "utf-8",
                callback:function(){
                    Ylmf.ScriptLoader.Add({   //加载天气信息
                        src: "http://api.tianqi.114la.com/weather/index.php/api/weather_114la/areaid/"+cityid+"/cb/Weather.callback",
                        charset: "utf-8"
                    });
                }
            });
        },
        Init: function() {
            var ckname = this.CityCookieName;
            var that = this;
            if (Cookie.get(this.CityCookieName)) {
                var City = Cookie.get(this.CityCookieName).split(',');
                if (!City[2]) {
                    Cookie.clear(this.CityCookieName);
                    that.Init()
                }
                that.NowCity = City;
                this.Get(City[2])
            } else {
                this.Ip2City();
            }
        },
        initCitys: function(pid,name,callback) {
            if (!pid) return;
            var that = this;
            if(!that.NewCityArrs[pid]){
                $.get("static/city/"+pid+".json",
                    function(data){
                        getit(data);
                        that.NewCityArrs[pid] = data;
                    },
                "json");
            }
            else{
                var thiscity = that.NewCityArrs[pid];
                getit(thiscity);

            }
            function getit(data){
                var _option = "";
                for(var i in data){
                    var zm = data[i].split(",")[0];
                    var wz = data[i].split(",")[1];
					i = String(i).indexOf('k') > -1 ? parseInt(i.substring(1)) : i;
                    if(name&&wz==name){_option += "<option value='"+i+"' selected='selected'>"+zm+"&nbsp;"+wz+"</option>";}
                    else{_option += "<option value='"+i+"'>"+zm+"&nbsp;"+wz+"</option>";}
                }
                $("#w_city").html(_option);
                if(!name){$("#w_city").get(0).selectedIndex = 0;}
                that.NewCityArrs[pid] = data;
                if(callback){that.initAreaCitys($("#w_city").val(),name,callback);}
                else if(name){that.initAreaCitys($("#w_city").val(),name);}
                else{that.initAreaCitys($("#w_city").val());}
                
            }
        },
        initAreaCitys: function(cid,name,callback) {
            var _pid = $("#w_pro").val();
            var that = this;
            if(!that.NewCityArrs[cid]){
                $.get("static/city/"+_pid+"/"+cid+".json",
                    function(data){
                        getit(data);
                        that.NewCityArrs[cid] = data;
                    },
                "json");
            }
            else{
                var thisarea = that.NewCityArrs[cid];
                getit(thisarea);
            }
            function getit(data){
                var _option = "";
                for(var i in data){
                    var zm = data[i].split(",")[0];
                    var wz = data[i].split(",")[1];
					i = String(i).indexOf('k') > -1 ? parseInt(i.substring(1)) : i;
                    if(name&&wz==that.NowCity[5]){_option += "<option value='"+i+"' selected='selected'>"+zm+"&nbsp;"+wz+"</option>";}
                    else{_option += "<option value='"+i+"'>"+zm+"&nbsp;"+wz+"</option>";}
                }
                $("#l_city").html(_option);
                callback&&callback();
            }
        },
        custom: function() {
            var nowcityid = $("#l_city").val();
            if(!nowcityid){alert("请选择好城市和地区!");return;}
            this.Get(nowcityid);
            document.getElementById("setCityBox").style.display = "none";
            W.style.display = ""
        },
        autoLoad: function() {
            Cookie.clear(this.CityCookieName);
            NowCity = [];
            this.Ip2City();
            document.getElementById("setCityBox").style.display = "none";
            W.style.display = ""
        },
        callback: function(data) {    //加载天气的主方法
            if(data.error_code){   //加载不到天气文件时
                $("#weatherCon").html("无此城市天气");
                Weather.ShowStatus(404)
                return;
            }
            var Data = data.weatherinfo;
            var _weather = $("#weather").get(0);
            var Desc = [Data['temp1'], Data['temp2'], Data['temp3']];
            var result = this.serDate == Data.date ? [Data.city, Desc[0], Desc[1], Data['areaid'], Data['IconPath1']+Data['img1'], Data['IconPath1']+Data['img2'], Data['weather1'], Data['weather2'],Data["air_aqi"],Data["air_quality_level"],Data["air_quality"],Data["air_url"],Data["url"]] : [Data.city, Desc[1], Desc[2], Data['areaid'], Data['IconPath1']+Data['img2'], Data['IconPath1']+Data['img3'], Data['weather2'], Data['weather3'],Data["air_aqi"],Data["air_quality_level"],Data["air_quality"],Data["air_url"],Data["url"]];
            var _weatherTip = $(".weather-tip");
            if (result) {
                Weather.ShowStatus(200, result);
                var rainImgs = ["03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "19", "21", "22", "23", "24", "25"];
                var snowImgs = ["13", "14", "15", "16", "17", "26", "27", "28"];
                var muaiImgs = ["53"];
                if (rainImgs.indexOf(Data['img1']) != -1) {
                    _weatherTip.get(0).childNodes[0].nodeValue = "有雨，出门带伞哦"
                }
                if (snowImgs.indexOf(Data['img1']) != -1) {
                    _weatherTip.get(0).childNodes[0].nodeValue = "今天有雪，小心路滑"
                }
                if (muaiImgs.indexOf(Data['img1']) != -1) {
                    _weatherTip.get(0).childNodes[0].nodeValue = "雾霾天气，注意防护"
                }
                if (rainImgs.concat(snowImgs).concat(muaiImgs).indexOf(Data['img1']) != -1) {

                    _weatherTip.show();
                    _weatherTip.find(".weather-close").on("click",
                    function() {
                        _weatherTip.hide()
                    });
                    if(Weather.tipTimeout){window.clearTimeout(Weather.tipTimeout)}
                    Weather.tipTimeout = window.setTimeout(function() {
                        _weatherTip.fadeOut()
                    },
                    10000);
                }
            }
            Weather.hidenInfo(Data);
            YLMF.fireEvent("AfterGetWeather", this, data);
        },
        hidenInfo:function(Data) {    //加载天气隐藏部分的方法
            var that = this;
            var _day = this.serDate == Data.date ? ["","今天", "明天", "后天"]:["","昨天","今天", "明天", "后天"];
            var _html = "<div class='weather-day'>";
            var _iconpath = Data.IconPath2;
            var tq_url = Data["url"];
            var air_url = Data["air_url"];
            $(".header .box-weather .sevent a").attr("href",tq_url);
            for (var i = 1; i <= 5; i++) {
                if(_day[i]){
                    _html += "<a href='"+tq_url+"'><span>" + _day[i] + "(" + Data["week"+i] + ")</span>";
                }
                else{
                    _html += "<a href='"+tq_url+"'><span>" + Data["week"+i] + "</span>";
                }
                _html += "<img src='" + _iconpath + Data["img" + i] + ".png' alt='' /><em>" + Data["temp" + i] + "</em><em>" + Data["weather" + i] + "</em><em>" + Data["wind" + i] + "</em></a>";
            }
            _html += "</div>";
            _html += "<div class='weather-life'>";
            if(Data["air_quality"]&&Data["air_pm25"]){_html += "<p><a href='"+air_url+"' style='float:right;'>空气质量排行</a><a href='" + air_url + "'>空气质量指数：" + Data["air_aqi"] + "&nbsp;&nbsp;<span class='grade " + Data["air_quality_level"] + "'>" + Data["air_quality"] +  " </span>&nbsp;&nbsp;PM2.5：" + Data["air_pm25"] + "</a></p>";}
            if(Data["air_affect"]){_html += "<p><em>" + Data["air_affect"] + "</em></p>";}
            _html += "<ul>";
            if(Data["ziwaixian"]){_html += "<li>紫外线强度：" + Data["ziwaixian"] + "</li>";}
            if(Data["chuanyi"]){_html += "<li>穿衣指数：" + Data["chuanyi"] + "</li>";}
            if(Data["chenlian"]){_html += "<li>晨练指数：" + Data["chenlian"] + "</li>";}
            if(Data["shushidu"]){_html += "<li>舒适度指数：" + Data["shushidu"] + "</li>";}
            if(Data["xiche"]){_html += "<li>洗车指数：" + Data["xiche"] + "</li>";}
            if(Data["ganmao"]){_html += "<li>感冒指数：" + Data["ganmao"] + "</li>";}
            if(Data["bingqilin"]){_html += "<li>冰激凌指数：" + Data["bingqilin"] + "</li>";}
            if(Data["kongtiao"]){_html += "<li>空调指数：" + Data["kongtiao"] + "</li>";}
            _html += "</ul>";
            _html += "</div>";
            $("#weatherCon").html(_html);
        },
        loadserDate:function(Date) {    //加载服务器日期
            this.serDate = Date.serverDate;
        }
    }
    window.Weather = Weather;
    Weather.Init();
    $("#box-weather").hover(function() {
        YLMF.cancelDefer("hideWeatherPanel");
        YLMF.defer("showWeatherPanel",
        function() {
            $("#box-weather").addClass("box-weatherHover");
            $("#weather-popup").fadeIn()
        },
        500)
    },
    function() {
        YLMF.cancelDefer("showWeatherPanel");
        YLMF.defer("hideWeatherPanel",
        function() {
            $("#weather-popup").hide();
            $("#box-weather").removeClass("box-weatherHover")
        })
    });
    $("#weather-popup").hover(function() {
        YLMF.cancelDefer("hideWeatherPanel")
    },
    function() {
        YLMF.defer("hideWeatherPanel",
        function() {
            $("#weather-popup").hide();
            $("#box-weather").removeClass("box-weatherHover")
        })
    });
})(jQuery);