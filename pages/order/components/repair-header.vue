<template>
	<view class="repairCon row between"  v-if="address.linkman">
		<view class="fill repairLeft">
			<view class="leftTitle">报修人地址信息</view>
			<view class="leftInfo">
				<text>报修人：</text>
				<text >{{address.linkman}}</text>
				<text style="margin-left:30upx;">{{address.mobile}}</text>
			</view>
			<view class="leftInfo">
				<text>地址：</text>
				<text>{{address.address}}{{address.addressDetail}}</text>
			</view>
		</view>
		<view class="column center repairRight" @click='openMap' v-if="type==0">
			<image src="/static/img/daohang.png" mode=""></image>
			<view class="repairRightTitle">导航</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:uni.getStorageSync('type')
			}
		},
		props:{
			address:Object
		},
		methods:{
			openMap(){
				let that = this;
				uni.getLocation({
					success(res) {
						uni.openLocation({
							latitude: that.address.latitude-0, // 纬度，范围为-90~90，负数表示南纬
							longitude: that.address.longitude-0, // 经度，范围为-180~180，负数表示西经
							scale: 28, // 缩放比例
							address: that.address.address+that.address.addressDetail
						});
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
.repairCon {
	width: 750upx;
	height: 200upx;
	background: #ffffff;
	box-shadow: 0px 16upx 49upx 0px rgba(167, 167, 167, 0.13);
	padding: 20upx;
}
.repairLeft {
	.leftTitle {
		font-weight: bold;
		color: #333333;
		line-height: 80upx;
	}
	.leftInfo {
		text {
			font-size: 24upx;
			color: #666666;
			line-height: 42upx;
		}
	}
}
.repairRight {
	width: 80upx;
	image {
		width: 38upx;
		height: 38upx;
	}
	.repairRightTitle {
		font-size: 22upx;
		color: #000000;
		line-height: 41upx;
	}
}
</style>
