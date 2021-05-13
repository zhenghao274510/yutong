<template>
	<view class="">
		<repair-header :address="dataobject.address"></repair-header>
		<view class="main-wrap" :class="{show: loaded}">
			<view class="orderInfoCon">
				<view class="row between orderItem b-b">
					<view class="orderItemTitle">故障日期</view>
					<view class="orderItemInfo">{{ dataobject.faultDate }}</view>
				</view>
				<view class="row between orderItem b-b">
					<view class="orderItemTitle">空调品牌</view>
					<view class="orderItemInfo" v-if="dataobject.brand != ''">{{ dataobject.brand }}</view>
					<view class="orderItemInfo" v-if="dataobject.otherBrand != ''">{{ dataobject.otherBrand }}</view>
				</view>
				<view class="row between orderItem b-b">
					<view class="orderItemTitle">产品编号</view>
					<view class="orderItemInfo">{{ dataobject.productNo }}</view>
				</view>
				<view class="row between orderItem b-b" v-if="dataobject.orderStatus == 4">
					<view class="orderItemTitle">维修开始时间</view>
					<view class="orderItemInfo">2012-02-12 15:35</view>
				</view>
				<view class="row between orderItem b-b" v-if="dataobject.orderStatus == 4">
					<view class="orderItemTitle">维修结束时间</view>
					<view class="orderItemInfo">2012-02-12 15:35</view>
				</view>
				<view class="description orderItem">
					<view class="orderItemTitle">故障描述</view>
					<view class="textarea">{{ dataobject.description }}</view>
				</view>
			</view>
			<view class="orderPriceCon" v-if="dataobject.orderStatus == 4">
				维检价格合计：
				<text class="orderPrice">￥{{ dataobject.totalCost }}</text>
			</view>
			<view class="btnCon row center" v-if="type == 1 && dataobject.orderStatus == 4" 
			@click="navTo(`/pages/order/evaGoodsItem?orderId=${orderId}`)">
			<view class="btn" hover-class="hover-opacity">评价</view></view>
			<view class="btnCon row center" v-if="type == 0 && dataobject.orderStatus == 0"><view class="btn" hover-class="hover-opacity" @click="subFinishOrder(0)">提交</view></view>
			<view class="btnCon row center" v-if="type == 0 && (dataobject.orderStatus == 2 || dataobject.orderStatus == 4)"><view class="btn" hover-class="hover-opacity" @click="subFinishOrder(1)">下一步（1/3）</view></view>
		</view>
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
	</view>
</template>

<script>
import repairHeader from "./components/repair-header.vue";
export default {
	components: {
		repairHeader
	},
	data() {
		return {
			orderId: "",
			dataobject: {},
			type: uni.getStorageSync("type")
		};
	},
	onLoad(options) {
		this.orderId = options.orderId;
	},
	onShow() {
		this.loadOrderData();
	},
	methods: {
		async loadOrderData() {
			const res = await this.$request("orderInfo", {orderId: this.orderId}, {showLoading: true});
			if (res.code == 0) {
				res.data.address = JSON.parse(res.data.address);
				this.dataobject = res.data;
			} else {
				this.$util.msg(res.msg);
			}
		},
		async subFinishOrder(type) {
			if (type == 0) {
				const data = {
					orderId: this.orderId,
					uid: uni.getStorageSync("uid")
				};
				const res = await this.$request("takeOrder", data, {showLoading: true});
				if (res.code == 0) {
					this.back();
				} else {
					this.$util.msg(res.msg);
				}
			} else {
				// costStatus ,maintainStatus //  0 填写过 1  未填写
				if (this.dataobject.maintainStatus == 1 && this.dataobject.costStatus == 1) {
					this.navTo(`/pages/order/maintenance?orderId=${this.orderId}`);
				} else if (this.dataobject.maintainStatus == 0 && this.dataobject.costStatus == 1) {
					this.navTo(`/pages/order/maintenanceEnd?orderId=${this.orderId}`);
				} else{
					this.navTo(`/pages/order/maintenanceBack?orderId=${this.orderId}`);
				}
			}
		}
	}
};
</script>
<style scoped lang="less">
.btnCon {
	position: fixed;
	bottom: 60upx;
	width: 100%;

	.btn {
		width: 706upx;
		height: 88upx;
		background: #fe7578;
		font-size: 30upx;
		color: #ffffff;
		line-height: 80upx;
		text-align: center;
		border-radius: 40upx;
	}
}

// 订单信息
.orderInfoCon {
	width: 709upx;
	background: #f3f5f9;
	border-radius: 20upx;
	padding: 30upx 20upx;
	margin: 40upx auto;
}

.orderPriceCon {
	width: 709upx;
	margin: 0 auto;
	color: #596d8d;
}

.orderPrice {
	color: #fe7578;
}

.orderItem {
	padding: 20upx 0;
}

.orderItemTitle {
	font-size: 26upx;
	color: #333333;
}

.orderItemInfo {
	font-size: 24upx;
	color: #999999;
}

.textarea {
	height: 180upx;
	width: 100%;
	padding: 20upx;
	background: #ffffff;
	margin-top: 30upx;
	font-size: 24upx;
	color: #999999;
}

.description {
}
</style>
