import Vue from 'vue'
import {
	date
} from '@/common/js/util'


Vue.filter('date', (timeStamp, format='Y-m-d H:i')=>{
	if(!timeStamp) return '';
	return date(format, timeStamp);
})
Vue.filter('complineData', (timeStamp)=>{
	if(!timeStamp) return '';
	return timeStamp.split(' ')[0];
})

Vue.filter('friendDate', (timeStamp, format='Y-m-d H:i')=>{
	if(!timeStamp) return '';
	return date(format, timeStamp);
})

Vue.filter('price', (price, fixed=0)=>{
	if(!price || isNaN(price)){
		return 0
	}
	return fixed > 0 ? parseFloat(price).toFixed(fixed) : + parseFloat(price).toFixed(2);
})
Vue.filter('phone', (phone)=>{
	if(!phone || isNaN(phone)){
		return 0
	}
	return phone.substring(0, 3) + '****' + phone.substring(7);
})
Vue.filter('acount', (acount)=>{
	if(!acount || isNaN(acount)){
		return 0
	}
	return '****' + acount.substring(7);
})
