var ajax = require("ajax");
var config = window.config;

var websocket = {
    websocket : "",
    //websocket连接地址
    websocketUrl : window.config.websocket_host,
    //websocket连接参数
    urlParams : "",
    //设置websocket连接参数
    setUrlParams : function(value){
        this.urlParams = value;
    },
    //打开一个websocket
    open : function(){
        var that = this;

        ajax.getToken(function(res){
            if(res.status == 200){
                that.init(res.data.apitoken);
            } else {
                that.init("");
            }
        });
    },
    //websocket初始化
    init : function(token){
        this.websocket = new WebSocket(this.websocketUrl + "?token="+token+"&"+this.urlParams);

        this.websocket.onopen = function(evt){
            console.log("connected to websocket server");
        };

        this.websocket.onclose = function(evt){
            console.log("disconnected");
        };

        this.websocket.onerror = function(evt, e){
            console.log("error occured:" + evt.data);
        };
    },
    //设置websocket接受数据时
    setOnMessage : function(event){
        this.websocket.onmessage = function(evt){
            //将数据转换为json格式
            var data = JSON.parse(evt.data);

            event(data);
        }
    },
    //websocket发送数据
    sendMeg : function(data){
        //发送数据
        this.websocket.send(JSON.stringify(data));
    },
    //关闭当前的websocket
    close : function(){
        this.websocket.close();
    }
};

export default {
    open : function(){
        websocket.open();
    },
    setOnMessage : function(event){
        websocket.setOnMessage(event);
    },
    sendMsg : function(data){
        websocket.sendMeg(data);
    },
    setUrlParams : function(value){
        websocket.setUrlParams(value);
    },
    close : function(){
        websocket.close();
    }
}
