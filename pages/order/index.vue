<template>
	<view class="">
		<me-tabs :tabs="navs" :fixed="true" :value="navCurrent" @change="onNavBarChange"></me-tabs>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" top="80">
			<view class="item_con">
				<view class="item b-b" v-for="(item, index) in dataList" :key="index" 
				@click.stop="navTo(`./details?orderId=${item.id}`)">
					<view class="row between">
						<view class="item-title" style="color:#FE7578;" v-if="item.orderStatus==3">售后服务维修单(驳回单）</view>
						<view class="item-title" v-else>售后服务维修单</view>
						<view class="item-btn" v-if="type==0 && item.orderStatus==0">退单</view>
						<view class="item-btn" v-if="type==1 && item.orderStatus==4">评价</view>
						<view class="item-state" v-if="item.orderStatus==4">已完成</view>
					</view>
					<view class="item-num">编号：{{item.id}}</view>
					<view class="row between">
						<view class="item-time">提交时间：{{item.createDate}}</view>
						<view class="item-state" v-if="item.orderStatus==2">进行中</view>
					</view>
					<view class="row between" v-if="item.finishDate">
						<view class="item-time">上传时间：{{item.finishDate}}</view>
						<view class="item-state"></view>
					</view>
				</view>
			</view>
		</s-pull-scroll>
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
		<mix-modal ref="mixModal" title="订单提示" :text="modalText" @onConfirm="onModalConfirm"></mix-modal>
	</view>
</template>

<script>
import OrderMixin from "./mixin/order.js";
const orderTabs = require("./components/maintenance.js");
export default {
	mixins: [OrderMixin],
	data() {
		return {
			navCounts: [], //订单数量
			navs: [],
			tyep:1,
			navCurrent: "0", //当前tab
			dataList: [] //订单列表
		};
	},
	onLoad(options) {
		this.type=uni.getStorageSync("type");
		if (this.type == 0) {
			this.navs = orderTabs.orderMasterTabs;
		} else {
			this.navs = orderTabs.orderUserTabs;
		}
		if (options.current) {
			this.navCurrent = +options.current;
		}
	},
	onShow() {
		this.refresh();
	},
	methods: {
		refresh() {
			this.$nextTick(() => {
				this.$refs.pullScroll.refresh();
			});
		},
		pullDown(pullScroll) {
			setTimeout(() => {
				this.loadData(pullScroll);
			}, 200);
		},
		async loadData(pullScroll) {
			this.loaded = false;
			const orderStatus = this.navs[this.navCurrent].state;
			// orderStatus->0.待接单1.待分配2.已接单3.已退单4.已完成
			const data = {
				uid: uni.getStorageSync("uid"),
				pageNo: pullScroll.page,
				pageSize: "10",
				orderStatus
			};
			const res = await this.$request("orderList", data, {
				showLoading: true
			});
			console.log(res)
			if (pullScroll.page == 1) {
				this.dataList = [];
			}
			if (res.code != 0 || res.data.length == 0) {
				this.$util.msg(res.resultNote);
				pullScroll.empty();
				return;
			}
			
			this.dataList = this.dataList.concat(res.data);
			pullScroll.finish();
			// pullScroll.page >= res.totalPage ? pullScroll.finish() :pullScroll.success();
			this.loaded = true;
		},
		//tab切换
		onNavBarChange(current) {
			this.navCurrent = current;
			if (!this.loaded) {
				return;
			}
			this.$util.throttle(() => {
				this.refresh();
			}, 500);
		},

		//获取当前tab对应订单状态
		getCurrentStatus() {
			if (this.navCurrent === 0) {
				return [];
			} else {
				return [this.navCurrent - 1];
			}
		}
	}
};
</script>
<style scoped lang="less">
.nav-wrap {
	position: fixed;
}

.item_con {
	padding: 20upx;
}

.item {
	padding: 30upx 0;
}

.item-btn {
	width: 110upx;
	height: 46upx;
	line-height: 46upx;
	text-align: center;
	border: 1px solid #72bffa;
	border-radius: 23upx;
	font-size: 26upx;
	color: #72bffa;
}

.item-title {
	font-size: 30upx;
	color: #000000;
}

.item-num {
	font-size: 24upx;
	color: #666666;
	padding: 10upx 0;
}

.item-time {
	font-size: 22upx;
	color: #999999;
}

.item-state {
	font-size: 26upx;
	color: #FE7578;
}
</style>
