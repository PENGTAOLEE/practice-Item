<template>
    <div class="content">
        <ul @click.capture="selectedAddress($event)">
            <li v-for="(al,index) in addressList" :key='index' >
                <h2 class="address-title" style="font-size:28px;">{{ al.title }}</h2>
                <div class="address-details" style="font-size:24px;">{{ al.address }}</div> 
            </li>
        </ul>
    </div>
</template>

<script>
    var ajax = require('ajax');
    var utils = require('utils');
    export default {
        data:function(){
            return {
                addressList : [],//周边地址列表
            }
        },
        mounted : function(){
            var lat=this.$route.query.lat;
            var lng=this.$route.query.lng;
            var url= "http://apis.map.qq.com/ws/geocoder/v1/?location="+lat+','+lng+"&output=jsonp&&key=UYXBZ-XOZRV-SB3P6-UWH5C-W5SKS-ATBXD&get_poi=1";
            var vue = this;
            ajax.dingwei(lat,lng,url,function(res){
                if(res['status'] == 0){
                    vue.addressList = res.result.pois;
                }
            });
        },
        methods: {
            // 传递当前点击到地址选择页面
            selectedAddress: function(ev) {
                var addressTitle,
                    addressDetails,
                    $nodeName = ev.target.nodeName.toUpperCase();
                if ($nodeName !== "LI") {
                    addressTitle = $(ev.target).parents('li').find('.address-title').html();
                    addressDetails = $(ev.target).parents('li').find('.address-details').html();
                } else {
                    addressTitle = $(ev.target).find('.address-title').html();
                    addressDetails = $(ev.target).find('.address-details').html();
                }
                // 保存到sessionStorage 
                sessionStorage.setItem('addressTitle',addressTitle);
                sessionStorage.setItem('addressDetails',addressDetails);

                // 跳转地址输入页面
                if (top.location.search.match("payment")) {
                    parent.location.href = '/forms'+top.location.search;
                }else if(top.location.search.match("sellersendgood")){//卖家立即发货
                    parent.location.href = '/forms'+top.location.search;
                }else if(top.location.search.match("selleragreereturn")){//卖家同意退款
                    parent.location.href = '/forms'+top.location.search;
                }else if(top.location.search.match("buyerset")||top.location.search.match('compete')){//买家和卖家设置中心
                    parent.location.href = '/forms'+top.location.search;
                }else {
                    // parent.location.href = '/Forms'
                }
                
            }
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