<template>
	<view class="">
		<view class="min-con main-wrap" :class="{show: loaded}">
			<view class="row center" style="height: 300upx;"><image :src="dataobject.logo" mode="" class="logo"></image></view>
			<view class="orderInfoCon">
				<view class="row between itemCon">
					<view class="row">
						<image src="/static/img/kefudianhua@2x.png" mode="" class="image"></image>
						<view class="itemTitle">客服电话</view>
					</view>
					<view class="">
						<text class="itemNumber">{{dataobject.telephone}}</text>
						<text class="itemCopy" @tap="copy(dataobject.telephone)">复制</text>
					</view>
				</view>
				<view class="row between itemCon">
					<view class="row">
						<image src="/static/img/kefuweixin@2x.png" mode="" class="image"></image>
						<view class="itemTitle">客服微信</view>
					</view>
					<view class="">
						<text class="itemNumber">{{dataobject.wechat}}</text>
						<text class="itemCopy" @tap="copy(dataobject.wechat)">复制</text>
					</view>
				</view>
			</view>
		</view>
		<mix-loading v-if="isLoading"></mix-loading>
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
			dataobject: {}
		};
	},
	onLoad() {
		this.loadData();
	},
	methods: {
		copy(number){
			uni.setClipboardData({
			    data: number,
			    success: function () {
			        console.log('success');
			    }
			});
		},
		async loadData() {
			const res = await this.$request('cusService', {}, {
				showLoading: true
			});
			if (res.code == 0) {
				this.dataobject = res.data;
			}
		}
	}
};
</script>
<style>
page {
	background: #ffffff;
}
</style>

<style scoped>
.orderInfoCon {
	width: 709upx;
	background: #f3f5f9;
	border-radius: 20upx;
	padding: 30upx;
	margin: 40upx auto;
}
.image {
	width: 36upx;
	height: 36upx;
	margin-right: 20upx;
}
.itemCon {
	padding: 20upx 0;
}
.itemTitle {
	color: #596d8d;
	font-size: 26upx;
}
.itemNumber {
	color: #596d8d;
	font-size: 24upx;
}
.itemNumber::after {
	content: "I";
	font-size: 24upx;
	color: #596d8d;
	width: 30upx;
	display: inline-block;
	text-align: center;
}
.itemCopy {
	color: #000000;
	font-size: 24upx;
}
.logo {
	width: 165upx;
	height: 165upx;
	border-radius: 50%;
}
</style>
