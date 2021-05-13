<template>
	<view class="">
		<pages-header title="之铂售后服务"></pages-header>
		<view class="pageTopCon row">
			<view class="fill row center" @click="tabsChange(0)" hover-class="hover-gray" :hover-stay-time="50">
				<view class="" style="position: relative;">
					<image src="/static/img/pingtaigonggao@2x.png" class="order_list_icon"></image>
					<text class="number" v-if="platformNotifyCount != 0">{{ platformNotifyCount }}</text>
				</view>
				<text>平台公告</text>
			</view>
			<view class="fill row center" @click="tabsChange(1)" hover-class="hover-gray" :hover-stay-time="50">
				<view class="" style="position: relative;">
					<image src="/static/img/xiaoxitongzhi@2x.png" class="order_list_icon"></image>
					<text class="number" v-if="userNotifyCount != 0">{{ userNotifyCount }}</text>
				</view>
				<text>消息通知</text>
			</view>
		</view>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :headerHeight="headerHeight" :back-top="true" 
		top="150">
			<view class="min-con">
				<view class="row b-b" v-for="(item, index) in dataList" :key="index" hover-class="hover-gray" @click="userSeeMessage(item)">
					<view class="rowItem fill">
						<view class="item-title">{{ item.title }}</view>
						<view class="price">{{ item.createDate }}</view>
					</view>
					<view class="isRead" v-if="item.readStatus == 0"></view>
				</view>
			</view>
		</s-pull-scroll>
		<mix-loading v-if="isLoading"></mix-loading>
	</view>
</template>

<script>
import pagesHeader from "@/components/pages-header/index.vue";

export default {
	components: {
		pagesHeader
	},
	data() {
		return {
			headerHeight: uni.getSystemInfoSync()["statusBarHeight"] + 70,
			tabsIndex: 0,
			balance: 0,
			dataList: [],
			platformNotifyCount: 0,
			userNotifyCount: 0,
			tabs: [
				{
					name: "平台公告"
				},
				{
					name: "通知消息"
				}
			]
		};
	},
	onShow() {
		this.refresh();
	},
	methods: {
		userSeeMessage(item) {
			if (item.readStatus == 0) item.readStatus = 1;
			this.navTo(`/pages/public/noticedetails?id=${item.id}&type=${this.tabsIndex}&title=${item.title}`);
		},
		tabsChange(index) {
			if (!uni.getStorageSync("uid")) this.navTo("/pages/public/author");
			if (this.tabsIndex == index) return;
			console.log(this.tabsIndex);
			this.tabsIndex = index;
			this.refresh();
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
			if (!uni.getStorageSync("uid")) {
				pullScroll.empty();
				return;
			}
			const url = this.tabsIndex == 0 ? "platformNotify" : "userNotify";
			let parmas = {
				uid: uni.getStorageSync("uid"),
				pageNo: pullScroll.page,
				pageSize: "10"
			};
			const res = await this.$request(url, parmas, {
				showLoading: true
			});
			if (pullScroll.page == 1) {
				this.dataList = [];
			}
			if (res.code != 0 || res.data.length == 0) {
				pullScroll.empty();
				return;
			}
			if (this.tabsIndex == 0) {
				this.platformNotifyCount = res.count;
			} else {
				this.userNotifyCount = res.count;
			}
			this.dataList = this.dataList.concat(res.data);
			pullScroll.page >= res.total ? pullScroll.finish() : pullScroll.success();
		}
	}
};
</script>
<style scoped>
.tradTop {
	font-size: 28upx;
	color: #000000;
	height: 80upx;
	line-height: 80upx;
	background: #f6f6f6;
	padding: 0 20upx;
}

.rowItem {
	padding: 30upx 0;
	position: relative;
}

.min-con {
	padding: 20upx;
}

.right {
	text-align: right;
	color: #d51a2a;
}

.price {
	font-size: 24upx;
	color: #999999;
	line-height: 36upx;
}

.pageTopCon {
	width: 710upx;
	height: 173upx;
	background: #ffffff;
	box-shadow: 0px 5upx 16upx 0px rgba(217, 217, 217, 0.25);
	border-radius: 15upx;
	padding: 0 20upx;
	position: fixed;
	left: 20upx;
	top: calc(140upx + var(--status-bar-height));
}

.pageTitle {
	font-size: 32upx;
	font-weight: bold;
	color: #333333;
}

.order_list_icon {
	width: 80upx;
	height: 80upx;
}

.item-title {
	color: #000000;
	line-height: 36upx;
}
.number {
	position: absolute;
	right: 0;
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
.isRead {
	position: absolute;
	right: 20upx;
	top: 20upx;
	width: 20upx;
	height: 20upx;
	background-color: red;
	border-radius: 50%;
}
</style>
