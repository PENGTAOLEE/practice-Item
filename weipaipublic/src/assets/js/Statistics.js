/**
 * 用户行为统计
 */
function Statistics(ajax){
    //请求api的统计服务器地址
    this.api_url = window.config.statistics_url;
    this.events = StatisticsEvents;
    this.user_token = '';
    this.ajax = '';
};

Statistics.prototype = {
    constructor: Statistics,
    //初始化
    init: function(ajax) {
        //在这里获取ajax对象，避免循环依赖
        this.ajax = ajax;
        var _self = this;

        ajax.getUserToken(function(res){
            if(res.status == 200){
                _self.user_token = res.data;
            }
        });
        this.clickListener();
    },
    //监听全局点击事件
    clickListener: function() {
        var _self = this;

        window.addEventListener("click", function(event){
            var event_name = $(event.toElement).attr("data-statistics");

            if(event_name){
                if( _self.events.clickEvents[event_name]){
                    _self.events["clickEvents"][event_name](_self, event);
                } else {
                    _self.events["clickEvents"]['default'](_self, event);
                }
            }
        });
    },
    //监听滚动事件
    scrollListener: function(path_name) {
        var _self = this;
        $.each(_self.events.scrollEvents, function(i, n) {
            //将当前地址和滚动事件的key进行正则匹配
            //如果符合，则将方法绑定在滚动事件中
            if(n.pattern.test(path_name)){
                $(window).scroll(function(){
                    n.call(_self);
                });

                return false;
            }
        });
    },
    //路由监听
    routerListener: function(path_name) {
        this.request("goto", {"from" : path_name});
    },
    //api请求监听
    apiListener: function(url, params) {
        var api_white_list = [
            '/api/index',
            '/api/typelist'
        ];

        var _self = this;

        $.each(api_white_list, function(i, n) {
            //只统计白名单中的
            if(url == n){
                _self.request("api_"+url, params);

                return false;
            }
        })
    },
    //请求统计服务器
    request: function(action, params) {
        var data = params ? params : {};
        data["action"] = action;
        data["user_token"] = this.user_token;

        $.ajax({
            type : "get",
            url : this.api_url,
            dataType : "jsonp",
            data : data,
            success : function(res){
            }
        });
    }
};

var StatisticsEvents = {
    //点击事件
    clickEvents: {
        //默认的点击事件处理方法
        "default": function(statistics, event) {
            statistics.request($(event.toElement).attr("data-statistics"));
        },
        //拍品详情页，点击显示全部描述
        "click_descall": function(statistics, event) {
            if($(event.toElement).parent().hasClass("copy-stop")){
                statistics.request("click_descall_details");
            }
        }
    },
    //滚动事件
    scrollEvents: [
        //详情页滚动到底部
        {
            pattern : /^\/lotdetails\/[0-9]+$/,
            call: function(statistics) {
                var scrollTop = $(window).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(window).height();
                if(scrollTop + windowHeight == scrollHeight){
                    statistics.request("roll_bottom_details");
                }
            }
        }
    ]
};

var statistics = new Statistics();

module.exports = statistics;
