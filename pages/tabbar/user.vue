<template>
	<view class="">
		<view class="user-top row">
			<view class="userCon" @click="navTo('/pages/user/userInfo', {login: true})"><image :src="userInfo.photo" mode="" class="user-icon"></image></view>
			<view class="fill" style="padding-left: 30upx;" @click="navTo('/pages/user/userInfo', {login: true})">
				<view class="active-btn">{{ userInfo.nickname || "点击登录" }}</view>
				<view class="active-title" v-if="type == 0 && userInfo.nickname">
					等级：{{ userInfo.level }} I {{ userInfo.serviceStationName }}</view>
			</view>
			<view class="top_bg"></view>
		</view>
		<!-- 订单 -->

		<view class="order-wrap">
			<view class="o-header">
				<text class="tit">{{ type == 0 ? "我的接单" : "服务单进度" }}</text>
			</view>
			<view class="o-list" v-if="type == 1">
				<view class="item column center" @click="navTo('/pages/order/index?current=0', {login: true})" hover-class="hover-gray" :hover-stay-time="50">
					<image src="/static/img/fenpei.png" class="order_list_icon"></image>
					<text>待分配</text>
					<!-- <text v-if="orderCount.c0 > 0" class="number">{{ orderCount.c0 }}</text> -->
				</view>
				<view class="item column center" @click="navTo('/pages/order/index?current=1', {login: true})" hover-class="hover-gray" :hover-stay-time="50">
					<image src="/static/img/jingxingzhong.png" class="order_list_icon"></image>
					<text>进行中</text>
					<!-- <text v-if="orderCount.c0 > 0" class="number">{{ orderCount.c0 }}</text> -->
				</view>
				<view class="item column center" @click="navTo('/pages/order/index?current=2', {login: true})" hover-class="hover-gray" :hover-stay-time="50">
					<image src="/static/img/yiwancheng@2x.png" class="order_list_icon"></image>
					<text>已完成</text>
					<!-- <text v-if="orderCount.c1 > 0" class="number">{{ orderCount.c1 }}</text> -->
				</view>
			</view>
			<view class="o-list" v-else>
				<view class="item column center" @click="navTo('/pages/order/index?current=0', {login: true})" hover-class="hover-gray" :hover-stay-time="50">
					<image src="/static/img/jingxingzhong.png" class="order_list_icon"></image>
					<text>进行中</text>
					<!-- <text v-if="orderCount.c0 > 0" class="number">{{ orderCount.c0 }}</text> -->
				</view>
				<view class="item column center" @click="navTo('/pages/order/index?current=1', {login: true})" hover-class="hover-gray" :hover-stay-time="50">
					<image src="/static/img/yiwancheng@2x.png" class="order_list_icon"></image>
					<text>已完成</text>
					<!-- <text v-if="orderCount.c0 > 0" class="number">{{ orderCount.c0 }}</text> -->
				</view>
				<view class="item column center" @click="navTo('/pages/order/index?current=2', {login: true})" hover-class="hover-gray" :hover-stay-time="50">
					<image src="/static/img/tuikuan.png" class="order_list_icon"></image>
					<text>已退单</text>
					<!-- <text v-if="orderCount.c1 > 0" class="number">{{ orderCount.c1 }}</text> -->
				</view>
				<view class="item column center" @click="navTo('/pages/order/index?current=3', {login: true})" hover-class="hover-gray" :hover-stay-time="50">
					<image src="/static/img/fenpei.png" class="order_list_icon"></image>
					<text>审核</text>
					<!-- <text v-if="orderCount.c1 > 0" class="number">{{ orderCount.c1 }}</text> -->
				</view>
			</view>
		</view>

		<view class="user-bottom">
			<view class="o-header-title">其他服务</view>
			<view class="order-list">
				<mix-list-cell image="/static/img/dizhi.png" title="我的地址" bgClor="#F3F5F9" :showRight="true" @onClick="navTo('/pages/address/index', {login: true})"></mix-list-cell>
				<mix-list-cell image="/static/img/kefu.png" title="平台客服" bgClor="#F3F5F9" :showRight="true" @onClick="navTo('/pages/public/servce')"></mix-list-cell>
				<mix-list-cell image="/static/img/wu.png" title="关于我们" bgClor="#F3F5F9" :showRight="true" @onClick="navTo('/pages/public/aboutwe')"></mix-list-cell>
				<mix-list-cell image="/static/img/yijianfankui.png" title="意见反馈" bgClor="#F3F5F9" :showRight="true" @onClick="navTo('/pages/user/finker', {login: true})"></mix-list-cell>
			</view>
		</view>
	</view>
</template>

<script>
import mixListCell from "@/components/mix-list-cell/mix-list-cell.vue";
export default {
	components: {
		mixListCell
	},
	data() {
		return {
			userInfo: {},
			type: 1
		};
	},
	onShow() {
		if (uni.getStorageSync("type")) {
			this.type = uni.getStorageSync("type");
		}
		this.loadUserInfo();
	},
	methods: {
		async loadUserInfo() {
			if (!uni.getStorageSync("uid")) {
				return;
			}
			const data = {
				uid: uni.getStorageSync("uid")
			};
			const res = await this.$request("userInfo", data);
			if (res.code == 0) {
				this.userInfo = res.data;
				uni.setStorageSync('type',res.data.userType)
			} else {
				this.$util.msg(res.msg);
			}
		}
	}
};
</script>
<style scoped lang="less">
.userCon {
	position: relative;
}

.top_bg {
	background: linear-gradient(141deg, #c3edab 0%, #006fff 99%);
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	opacity: 0.05;
	z-index: -1;
}

.user-top {
	width: 750upx;
	height: 339upx;
	position: relative;
	padding-left: 20upx;
	padding-top: calc(var(--status-bar-height) + 30px);
}

.user-icon {
	width: 160upx;
	height: 160upx;
	border-radius: 50%;
}

.active-btn {
	font-size: 36upx;
	font-weight: bold;
	color: #000000;
}

.active-title {
	font-size: 26upx;
	color: #666666;
	margin-top: 20upx;
}

.order-list {
	width: 700upx;
	margin: 0 auto;
	background: #f3f5f9;
	border-radius: 20upx;
}

.user-bottom {
}

.o-header-title {
	padding: 40upx 20upx;
	font-size: 36upx;
	font-weight: bold;
	color: #333333;
}

.order-wrap {
	padding: 30upx 0;
	// background: #fff;

	.o-header {
		width: 174upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		background: #6fbefa;
		border-radius: 0px 30px 30px 0px;

		.tit {
			flex: 1;
			font-size: 26upx;
			color: #ffffff;
		}

		.more {
			font-size: 24upx;
			color: #999;
		}

		.icon-you {
			margin-left: 4upx;
			font-size: 20upx;
			color: #999;
		}
	}

	.o-list {
		display: flex;
		justify-content: space-around;
		// padding: 20rpx 0;
	}

	.item {
		flex-direction: column;
		width: 130upx;
		height: 130upx;
		border-radius: 8upx;
		font-size: 24upx;
		color: #606266;
		position: relative;

		.order_list_icon {
			width: 46upx;
			height: 46upx;
			margin-bottom: 20upx;
			color: #fa436a;
		}

		text {
			font-size: 24upx;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.number {
		position: absolute;
		right: 22upx;
		top: 6upx;
		min-width: 34upx;
		height: 34upx;
		line-height: 30upx;
		text-align: center;
		padding: 0 8upx;
		font-size: 18upx;
		color: #fff;
		border: 2upx solid #fff;
		background-color: red;
		border-radius: 100upx;
	}
}
</style>
