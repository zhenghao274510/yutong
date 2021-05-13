import Vue from 'vue'
import App from './App'
import sPullScroll from "@/components/s-pull-scroll/index.vue"
import mixLoading from "@/components/mix-loading/mix-loading.vue"
Vue.component('mix-loading',mixLoading)
Vue.component('s-pull-scroll',sPullScroll)
import {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage
} from '@/common/js/util'

import filter from '@/common/filter/filter'
import mixin from '@/common/mixin/mixin'
Vue.mixin(mixin) 
Vue.prototype.$util = {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
