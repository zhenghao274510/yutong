/**
 * @Method Description
 * @Author: hao zheng@
 * @Description: 数据请求整合 处理
 * @bassUrl server 
 * @param {a===Object||file} 传给后台参数Method 请求方法   url  所请求的接口路径
 * @return  Promise对象  所有数据信息
 * @createTime: 2020-7-7 15:05:06
 */
const bassUrl = require('./config.js').bass;
import {
	msg
} from "./util.js"

export const request = (url, data = {}, method = 'post') => {
	return new Promise(function(e, n) {
		uni.request({
			data,
			url: encodeURI(bassUrl + '/app/user/' + url),
			method: "post",
			sslVerify:false,
			success: function(res) {
				200 == res.statusCode ? e(res.data) : msg(`错误码:${res.statusCode}`);
			},
			fail: function(err) {
				"request:fail " === err.errMsg && msg("请求数据失败！"), n(err.data);
			}
		});
	});
}

