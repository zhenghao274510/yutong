<template>
	<view class="column">
		<view class="header">
			<image src="/static/logo.png" />
		</view>
		
		<view class="row center">
			<view>登录即视为您同意</view>
			<navigator url="./selym" class="selym">《用户协议》</navigator>
		</view>
		<button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo"
			v-if="show">微信授权登录</button>
		<button class="bottom" type="primary" open-type="getPhoneNumber" lang="zh_CN"
			@getphonenumber="bindGetPhoneNumber" v-else>进入</button>
			<mix-loading v-if="isLoading"></mix-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					openid: "",
					nickname: "",
					icon: "",
					sex: ""
				},
				show: true
			};
		},
		methods: {
			bindGetPhoneNumber(e) {
				console.log(e)
				let self = this;
				uni.getSetting({
					success(wxoptions) {
						if (wxoptions.authSetting['scope.userInfo']) {
							uni.login({
								success: async options => {
									console.log(options)
									let parmas = {
										encryptedData: e.detail.encryptedData,
										iv: e.detail.iv,
										uid: self.uid,
										code: options.code
									};
									const res = await self.$request('getPhoneNum',parmas,{showLoading:true});
									if (res.code == 0) {
										uni.setStorageSync('uid',self.uid);
										uni.setStorageSync('type',res.data.userType);
										self.back();
									} else {
										self.$util.msg(res.msg)
									}
								}
							})
						}
					}
				})
			},
			 bindGetUserInfo(e) {
				let self = this;
				console.log(e)
				if (e.detail.errMsg == "getUserInfo:ok") {
					 uni.login({
						success:async res=> {
							console.log(res)
							let parmas = {
								code: res.code,
								userInfo: e.detail.userInfo
							};
							const response =await self.$request('login',parmas,{showLoading:true});
								console.log(response)
							if (response.code == 0) {
								self.uid=response.data.id;
								self.show=false;
							} else {
								self.$util.msg(response.msg)
							}
						}
					})
				}
			}
		}
	}
</script>
<style>
	page {
		background: #FFFFFF;
	}
</style>
<style scoped lang="less">
	.selym{
		color:#0055ff;
	}
	.header {
		margin: 90px auto;
		text-align: center;
	}

	.hide {
		opacity: 0;
	}

	.header image {
		width: 494upx;
		height: 204upx;
	}

	.bottom {
		height: 80upx;
		width: 400upx;
		background: #0055ff !important;
		border-radius: 12upx;
		margin: 70upx auto;
		font-size: 30upx;
		color: #FFFFFF;
	}
</style>
