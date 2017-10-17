// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*引入公共样式*/
require('./assets/style/common.css');
require('./assets/style/swiper.min.css')
//  import 'babel-polyfill'
import Vue from 'vue'
import $ from 'jquery'
import APP from './App'

// 期待写成公共部分
import wx from 'weixin-js-sdk'
import ajax from 'assets/js/ajax'
import utils from 'assets/js/utils'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 期待写成公共组件
import myAlert from '@/components/component/showAlert'

import router from './router/mobile'

import statistics from '@/assets/js/Statistics'

statistics.init(ajax);

// Vue.use(ajax)

Vue.config.productionTip = false;

//全局路由钩子
//当进入下一个路由前执行
router.beforeEach(function(to, from, next) {
    var lock = false;
    if(to.path=='/picture' || to.path=='/center' || to.path=='/find' || to.path=='/follow' || /newschat/i.test(to.path)){
        ajax.messageNotify((res) => {
            if ((res.status == 202) && !utils.isWeixin()) {
                lock = true;
            }
        })
    }
    
    if(lock == false){
        //解除window绑定的事件
        $(window).unbind();
        statistics.routerListener(to.path);

        //统计用户行为，监听滚动事件
        statistics.scrollListener(to.path);

        next();
    } else {
        $('.login-index').show();
        $('#phone').focus()
    }
});

new Vue({
	render: h => h(APP),
	router,
	watch: {
        '$route' : function(){
            if (_czc) {
                var location = window.location
                var content_url = location.pathname + location.hash
                var referer_url = '/'
                _czc.push(['_trackPageview', content_url, referer_url])
            }
        }
    },
}).$mount('#app')

