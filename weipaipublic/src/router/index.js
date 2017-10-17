import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import banner from '@/components/homepage/banner'

//const banner = r => require.ensure([], () => r(require('@/components/homepage/banner')), 'banner')

Vue.use(Router)

export default new Router({
  	routes: [
    	{
      		path: '/',
      		name: 'Hello',
      		component: Hello
    	},
    	{
    		path:'/banner',
	    	name: 'banner',
	        component: banner,
    	}
    ],
  	mode : "history",
	scrollBehavior: function(to, from, savedPosition) {
        // return 期望滚动到哪个的位置     注意: 这个功能只在 HTML5 history 模式下可用。
        if (savedPosition) {//返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
        // $(window).unbind();
    },
})
