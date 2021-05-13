<template>
	<view class="" :style="{height:height+'px'}">
		<view class="app">
			<view class="cell row b-b">
				<text class="tit">报修人</text>
				<input class="input" type="text" maxlength="10" v-model="address.linkman" placeholder="请输入报修人姓名"
					placeholder-class="placeholder" />
			</view>
			<view class="cell row b-b">
				<text class="tit">联系电话</text>
				<input class="input" type="number" maxlength="11" v-model="address.mobile" placeholder="请输入联系电话"
					placeholder-class="placeholder" />
			</view>
			<view class="cell row  fill b-b" @click="navTo('/pages/address/position')">
				<text class="tit">所在地区</text>
				<text class="input clamp" :class="{placeholder: !address.address}">
					{{ address.address ? address.address:'请选择' }}
				</text>
				<text class="mix-icon icon-you"></text>
			</view>
			<view class="">
				<view class="tit">详细地址 <text class="placeholder" style="margin-left: 30upx;">街道、楼牌等</text></view>
				<textarea class="textarea" type="text" maxlength="20" v-model="address.addressDetail" placeholder="请输入详细地址"
					placeholder-class="placeholder" />
			</view>
			<view class="cell row">
				<text class="tit fill">设为默认地址</text>
				<switch :checked="address.state==1" style="transform: scale(.7);" color="#72BFFA"
					@change="onSwitchChange" />
			</view>

			<view class="fixed_massage">
				<mix-button ref="confirmBtn" text="提交" background="#72BFFA" marginTop="60rpx" @onConfirm="submit"></mix-button>
			</view>
			<mix-loading v-if="isLoading" :mask="true"></mix-loading>
		</view>
	</view>

</template>

<script>
	import {
		checkStr
	} from '@/common/js/util'
	export default {
		data() {
			return {
				height: uni.getSystemInfoSync().screenHeight,
				id: '',
				address: {}
			}
		},
		onLoad(options) {
			this.address=JSON.parse(options.item)
			// this.loadData();
		},
		methods: {
			submit() {
				this.$util.throttle(async () => {
					const data = this.address;
					if (!data.linkman) {
						this.$util.msg('请输入报修人姓名');
						this.$refs.confirmBtn.stop();
						return;
					}
					if (!checkStr(data.mobile, 'mobile')) {
						this.$util.msg('请输入正确的手机号码');
						this.$refs.confirmBtn.stop();
						return;
					}
					if (!data.address) {
						this.$util.msg('请选择您所在地区');
						this.$refs.confirmBtn.stop();
						return;
					}
					if (!data.addressDetail) {
						this.$util.msg('请输入您的详细地址');
						this.$refs.confirmBtn.stop();
						return;
					}
					const parmas = {
						uid: uni.getStorageSync('uid'),
						addressId:data.id,
						state: data.state,
						linkman: data.linkman,
						mobile: data.mobile,
						address: data.address,
						addressDetail: data.addressDetail,
						longitude: data.longitude,
						latitude: data.latitude
						
					}
					const res = await this.$request('editMyAddress', parmas,{showLoading:true});
					this.$util.msg(res.msg);
					if (res.code == 0) {
						setTimeout(() => {
							uni.navigateBack();
						}, 500)
					}
				})

			},
			//设置收货地址
			setAddress(item) {
				this.address.address=`${item.address}(${item.title})`;
				this.address.longitude=item.location.lng;
				this.address.latitude=item.location.lat;
			},
			onSwitchChange(e) {
				e.detail.value ? this.address.state = 1 : this.address.state = 0;
			}
		}
	}
</script>

<style scoped lang="scss">
	.textarea {
		width: 100%;
		height: 228upx;
		background: #F6F6F6;
		padding: 20upx;
	}

	.fixed_massage {
		position: fixed;
		left: 50%;
		bottom: 60rpx;
		transform: translateX(-50%);
	}

	.app {
		padding: 10rpx 20rpx 0;
	}

	.tit {
		min-width: 150rpx;
		font-size: 26rpx;
		color: #666666;
		line-height: 100upx;
	}

	.cell {
		height: 100upx;

		.input {
			flex: 1;
			font-size: 26upx;
			color: #333;
		}

		.icon-you {
			flex-shrink: 0;
			margin-right: 8rpx;
			margin-left: 40rpx;
			font-size: 24rpx;
			color: #aaa;
		}
	}
</style>
