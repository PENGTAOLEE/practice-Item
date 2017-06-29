# 多个倒计时
场景：一个页面需要初始化多个倒计时，并且下拉加载初始化倒计时

首先定义函数处理时间
```javascript
// utils.js
/**
 * 出价倒计时
 * @param {number}   startime     开始时间
 * @param {number}   endtime      结束时间
 * @param {function} countFunc    倒计时执行过程回调
 * @param {function}   endFunc    倒计时结束回调
 * @author  lpt
 */
var Alarm = function (startime, endtime, countFunc, endFunc) {
    this.time = Math.floor((endtime - startime)); //时间
    this.countFunc = countFunc; //计时函数
    this.endFunc = endFunc; //结束函数
    this.flag = 't' + Date.parse(new Date()); //
};
Alarm.prototype.start = function () {
    var self = this;

    self.flag = setInterval(function () {
        if (self.time <= 0) {
            clearInterval(self.flag);
            self.endFunc();
        } else {
            var minute, hour, day, second;
            day     = Math.floor(self.time / 60 / 60 / 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 / 24) : Math.floor(self.time / 60 / 60 / 24);
            hour    = Math.floor(self.time / 60 / 60 ) < 10 ? '0' + Math.floor(self.time / 60 / 60) : Math.floor(self.time / 60 / 60);
            minute  = Math.floor(self.time / 60 % 60) < 10 ? '0' + Math.floor(self.time / 60 % 60) : Math.floor(self.time / 60 % 60);
            second  = Math.floor(self.time % 60) < 10 ? '0' + Math.floor(self.time % 60) : Math.floor(self.time % 60);
            //倒计时执行函数
            self.countFunc(second, minute, hour, day);
            self.time--;
        }
    }, 1000);
};

module.exports = {
  // 定时器构建对象
  Alarm: Alarm,
}
```

触发倒计时
```javascript
var utils = require('utils');
/**
 * 触发倒计时
 * @param {obj}   obj            倒计时对象
 * @param {string}   startTime   开始时间
 * @param {string} endTime       截止时间
 * @author  lpt
 */
emitCountDown: function(obj,startTime,endTime) {
    var alarm = new utils.Alarm(startTime, endTime, function (second, minute, hour, day) { //计时钟
        // success Callback
        obj.find('.follow-time .cutdown-timebox').html('<span>'+hour+'</span>时<span>'+minute+'</span>分<span>'+second+'</span>秒' );
    }, function () {
       // faild callback
    });
    alarm.start();  
    return alarm;
},
```

<!-- 把需要创建的倒计时时间推到另一个数组 -->
```javascript
var timeCountDownId = [];
timeCountDownId.push({
    id: id,
    startTime: nowTime,
    endTime: endTime
})
```

创建倒计时
```javascript
createCoundown: function() {
    var _this = this;
    setTimeout(function(){
        // 为每个item添加倒计时
        if(_this.timeCountDownId) {
            $.each(_this.timeCountDownId, function(index,item){
                // 触发倒计时
                var alarm;
                clearInterval(_this.timer)
                alarm = _this.emitCountDown($("#time_down_"+this.id),this.startTime,this.endTime);
                _this.timer =  alarm.flag;

                delete _this.timeCountDownId[index];
            });
        }
        // 开拍倒计时
    },50)

},
```
