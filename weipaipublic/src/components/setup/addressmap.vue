<template>
<div id="address-map">
    <!--  通过 iframe 嵌入前端定位组件，此处没有隐藏定位组件，使用了定位组件的在定位中视觉特效  -->
    <iframe id="geoPage" width="100%" height="50%" frameborder=0 scrolling="no" style="display: none"
            src="https://apis.map.qq.com/tools/geolocation?key=UYXBZ-XOZRV-SB3P6-UWH5C-W5SKS-ATBXD&referer=xiaofupai">
    </iframe>

    <!-- 接收到位置信息后 通过 iframe 嵌入位置标注组件 -->
    <iframe id="markPage" width="100%" height="70%" frameborder=0 scrolling="no" src=""></iframe>
    <div class="line"></div>
    <!-- 我自己的地址展示区 -->
    <iframe src="" id="address_list" width="100%" height="30%"  frameborder="0" ></iframe>
</div>
</template>

<script>
    var ajax = require('ajax');
    export default {
        data:function(){
            return {
                addressList : [],
            }
        },
        mounted : function(){
            var loc;
            var isMapInit = false;
            //监听定位组件的message事件
            window.addEventListener('message', function(event) {
                loc = event.data; // 接收位置信息
                if(loc  && loc.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
                    //定位你成功调用反编码地图查询周边地址列表
                    document.getElementById('address_list').src = '/AddressList?lat='+loc.lat+'&lng='+loc.lng;
                    var markUrl = 'https://apis.map.qq.com/tools/poimarker' + '?marker=coord:' + loc.lat + ',' + loc.lng +
                        ';title:我的位置;addr:' + (loc.addr || loc.city) + '&key=UYXBZ-XOZRV-SB3P6-UWH5C-W5SKS-ATBXD&referer=xiaofupai';
                    //给位置展示组件赋值
                    document.getElementById('markPage').src = markUrl;
                } else { //定位组件在定位失败后，也会触发message, event.data为null
                    console.log('定位失败');
                }
            }, false);
            //为防止定位组件在message事件监听前已经触发定位成功事件，在此处显示请求一次位置信息
            document.getElementById("geoPage").contentWindow.postMessage('getLocation', '*');
            //设置6s超时，防止定位组件长时间获取位置信息未响应
            setTimeout(function() {
                if(!loc) {
                    //主动与前端定位组件通信（可选），获取粗糙的IP定位结果
                    document.getElementById("geoPage").contentWindow.postMessage('getLocation.robust', '*');
                }
            }, 6000); //6s为推荐值，业务调用方可根据自己的需求设置改时间，不建议太短
        },
        methods : {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#address-map {
    width: 100%;
    height: 100%;
}

/* 地图 */
#markPage {
    position: fixed;
    top: 0;
    height: 30rem;
}

.line {
    width: 100%;
    height: 0rem;
    background: #fff;
}

/* 列表 */
#address_list {
    margin-top: 30rem;
    height: 1220px;
}
.content {
    background: #fff;
}
.content ul {
    padding-bottom: 1rem;
}
.content ul li {
    padding: .7rem 0;
    padding-left: 2.7rem;
    padding-right: 1rem;
    border-bottom: 1px solid #ccc;
    font-family: PingFangSC;
    background: url(../../assets/img/addIocn.png) no-repeat .7rem 1rem;
}
.address-title {
    font-size: 1.6rem;
    color: #333;
}
.address-details {
    font-size: 1.4rem;
    color: #999;
}
</style>