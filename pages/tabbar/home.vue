<template>
	<view class="">
		<pages-header title="之铂售后服务"></pages-header>
		<!-- 用户端 -->
		<view class="main-wrap" :class="{show:loaded}">
			<view class="" v-if="type == 1">
				<view class="pageTopCon row between" @click="navTo('/pages/order/creatOrder', {login: true})">
					<view class="pageTitle">之铂售后服务</view>
					<view class="pageBtn row center" hover-class="hover-opacity">
						<text class="">填写入口</text>
						<view class="mix-icon icon-you"></view>
					</view>
				</view>
				<view class="pageServe">服务介绍</view>
				<view class="pageContent"><jyf-parser :html="content"></jyf-parser></view>
			</view>
			<!-- 维修端 -->
			<view class="" v-if="type == 0">
				<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :headerHeight="headerHeight" 
				:back-top="true" top="180">
					<view class="list-con" v-for="(item, index) in dataList" :key="index" 
					@click="navTo(`/pages/order/details?orderId=${item.id}`)">
						<view class="list-top" v-if="index == 0">待结单列表</view>
						<view class="item-con">
							<view class="row between item-top">
								<text>售后服务维修单</text>
								<view class="mix-icon icon-you"></view>
							</view>
							<view class="item-time row">
								请在
								<bbs-countdown :time="item.time" type="4"></bbs-countdown>
								内接单
							</view>
							<view class="item-position">地址：{{item.address.address}}{{item.address.addressDetail}}</view>
						</view>
					</view>
				</s-pull-scroll>
			</view>
		</view>
		<mix-loading v-if="isLoading"></mix-loading>
	</view>
</template>

<script>
import JyfParser from "@/components/jyf-parser/jyf-parser.vue";
import pagesHeader from "@/components/pages-header/index.vue";
import bbsCountdown from "@/components/bbs-countdown/bbs-countdown.vue";
export default {
	components: {
		JyfParser,
		pagesHeader,
		bbsCountdown
	},
	data() {
		return {
			content: "",
			dataList: [],
			type: 1
		};
	},
	onShow() {
		if (uni.getStorageSync("type")) {
			this.type = uni.getStorageSync("type");
		}
		// uni.setStorageSync('uid','aeb9c2c526814c1982367c6af7b3cb73')
		this.initData();
	},
	methods: {
		initData() {
			console.log(this.type);
			if (this.type == 1) {
				this.getServceInfo();
			} else {
				this.$nextTick(() => {
					this.refresh();
				});
			}
		},
		async getServceInfo() {
			const res = await this.$request("getAgreement", {type: 1}, {showLoading: true});
			if (res.code == 0) {
				this.content = res.data;
			} else {
				this.$util.msg(res.msg);
			}
		},
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
			// orderStatus->0.待接单1.待分配2.已接单3.已退单4.已完成
			const data = {
				uid: uni.getStorageSync("uid"),
				pageNo: pullScroll.page,
				pageSize: "10",
				orderStatus: "0"
			};
			const res = await this.$request("orderList", data, {
				showLoading: true
			});
			if (pullScroll.page == 1) {
				this.dataList = [];
			}
			if (res.code != 0 || res.data.length == 0) {
				this.$util.msg(res.resultNote);
				pullScroll.empty();
				return;
			}
			res.data.forEach(item => {
				item.time = new Date(item.createDate).getTime();
				item.address=JSON.parse(item.address);
			});
			console.log(res.data);
			this.dataList = this.dataList.concat(res.data);
			pullScroll.finish();
			// pullScroll.page >= res.totalPage ? pullScroll.finish() :pullScroll.success();
		}
	}
};
</script>

<style scoped>
.pageTopCon {
	width: 706upx;
	height: 173upx;
	background: #ffffff;
	box-shadow: 0px 5upx 16upx 0px rgba(217, 217, 217, 0.25);
	border-radius: 15upx;
	margin: -50upx auto 30upx;
	padding: 0 20upx;
}

.pageTitle {
	font-size: 32upx;
	font-weight: bold;
	color: #333333;
}

.icon-you {
	font-size: 20upx;
	margin-left: 20upx;
}

.pageBtn {
	width: 200upx;
	height: 60upx;
	line-height: 60upx;
	background: #fe7578;
	border-radius: 30upx;
	font-size: 24upx;
	color: #fff4f4;
}

.pageServe {
	height: 66upx;
	line-height: 66upx;
	background: #6fbefa;
	padding: 0 20upx;
	font-size: 26upx;
	color: #ffffff;
}

/* 维修端 */
.list-top {
	font-weight: bold;
	color: #000000;
	line-height: 36upx;
}
.list-con {
	width: 710upx;
	margin: 0 auto 30upx;
	background: #ffffff;
	box-shadow: 0px 16upx 49upx 0px rgba(167, 167, 167, 0.13);
	border-radius: 15upx;
	padding: 30upx;
}
.item-con {
	padding: 30upx 0;
}
.item-top {
	font-size: 26upx;
	color: #333333;
	line-height: 36upx;
}
.item-time {
	font-size: 24upx;
	color: #fe7578;
	line-height: 36upx;
}
.item-position {
	font-size: 22upx;
	color: #999999;
	line-height: 36upx;
}
</style>
