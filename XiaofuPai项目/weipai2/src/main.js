// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*引入公共样式*/
require('./assets/style/common.css');
import Vue from 'vue'
import banner from '@/components/homepage/banner'
import App from './App'
import router from './router'

import ajax from './assets/js/ajax'


Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   history: true,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')

