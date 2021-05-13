<template>
	<view class="">
		<view class="main-wrap" :class="{show: loaded}">
			<view class="list-con">
				<view class="evaConTitle">二、维修信息</view>
				<view class="row b-b timeCon">
					<view class="itemLabel">维修开始时间：</view>
					<input type="text" disabled="true" class="reg-input fill" placeholder="选择（年月日）、（小时分钟）" placeholder-class="placeholder" v-model="orderInfo.startDate" />
				</view>
				<view class="row b-b timeCon">
					<view class="itemLabel">维修结束时间：</view>
					<input type="text" disabled="true" class="reg-input fill" placeholder="选择（年月日）、（小时分钟）" placeholder-class="placeholder" v-model="orderInfo.endDate" />
				</view>
				<view class="timeCon">
					<view class="itemLabel">维修前照片/视频：</view>
					<view class="row between" style="width:50%;">
						<image :src="orderInfo.beforePhoto" mode="" class="upload-item" @click="previewImage(0, 0)"></image>
						<view class="upload-item" @click="previewImage(1, 1)">
							<image :src="orderInfo.afterPhoto" mode="" class="upload-item"></image>
							<image src="/static/img/play.png" mode="" class="playIcon"></image>
						</view>
						<!-- <video :src="orderInfo.beforeVideo" controls class="upload-item"></video> -->
						<!-- <mix-upload-image :count="1" :length="1" ref="mixUploadImageBefore"></mix-upload-image>
						<mix-upload-image :count="1" :length="1" ref="mixUploadvideoBefore" type="1"></mix-upload-image> -->
					</view>
				</view>
				<view class="timeCon">
					<view class="itemLabel">维修后照片/视频：</view>
					<view class="row between" style="width:50%;">
						<image :src="orderInfo.afterPhoto" mode="" class="upload-item" @click="previewImage(1, 0)"></image>
						<view class="upload-item" @click="previewImage(1, 1)">
							<image :src="orderInfo.afterPhoto" mode="" class="upload-item"></image>
							<image src="/static/img/play.png" mode="" class="playIcon"></image>
						</view>

						<!-- <video :src="orderInfo.afterVideo" controls class="upload-item"></video> -->
						<!-- 	<mix-upload-image :count="1" :length="1" ref="mixUploadImageAfter"></mix-upload-image>
						<mix-upload-image :count="1" :length="1" ref="mixUploadvideoAfter" type="1"></mix-upload-image> -->
					</view>
				</view>
				<view class="evaConTitle">故障原因描述：</view>
				<textarea value="" disabled="true" placeholder="请输入故障描述文字内容~" maxlength="180" v-model="orderInfo.reason" placeholder-class="placeholder" class="textarea" />
				<view class="evaConTitle">解决方案描述：</view>
				<textarea value="" disabled="true" placeholder="请输入解决方案描述文字内容~" maxlength="180" v-model="orderInfo.solution" placeholder-class="placeholder" class="textarea" />
			</view>

			<view class="evaCon">
				<view class="list-con">
					<view class="evaConTitle">其他检查：</view>
					<block v-for="(item, index) in dataList" :key="index">
						<view class="">{{ item.title }}</view>
						<view class="row">
							<view class="row itemCon" v-for="(v, k) in item.answer" :key="k">
								<view class="row">
									<view class="labelIcon">
										<image src="/static/img/active.png" mode="" v-if="item.brand == k"></image>
										<image src="/static/img/xuanz.png" mode="" v-else></image>
									</view>
									<view class="bindTitle">{{ v.label }}</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>

			<view class="btnCon row center"><view class="btn" hover-class="hover-opacity" @click="navTo(`/pages/order/maintenanceEndBack?orderId=${orderId}`)">下一步（2/3）</view></view>
		</view>

		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
		<video class="video" :direction="0" :controls="true" :show-center-play-btn="false" id="video" :src="video" v-if="showVideo" @ended="showVideo = false" @click="showVideo = false"></video>
	</view>
</template>

<script>
const maintenanceList = require("./components/maintenance.js");
import mixUploadImage from "@/components/mix-upload-image/mix-upload-image.vue";
export default {
	components: {
		mixUploadImage
	},
	data() {
		return {
			showVideo: false,
			video: "",
			visible: false,
			setSomeDate: 0,
			dataList: [],
			orderId: "",
			orderInfo: {}
		};
	},
	onLoad(options) {
		if (options.orderId) {
			this.orderId = options.orderId;
			this.getOrderInfo();
		}
	},
	methods: {
		async getOrderInfo() {
			const res = await this.$request("returnMaintainInfo", {orderId: this.orderId}, {showLoading: true});
			if (res.code == 0) {
				this.orderInfo = res.data;
				maintenanceList.maintenance.forEach((item, index) => {
					if (index == 0) {
						item.brand = res.data.filter;
					}
					if (index == 1) {
						item.brand = res.data.machine;
					}
					if (index == 2) {
						item.brand = res.data.pipeline;
					}
				});
				this.dataList = maintenanceList.maintenance;
			} else {
				this.$util.msg(res.msg);
			}
		},
		//预览图片
		previewImage(index, type) {
			console.log(this.imageList);
			if (type == 0) {
				let array = [];
				array[0] = this.orderInfo.beforePhoto;
				array[1] = this.orderInfo.afterPhoto;
				uni.previewImage({
					current: array[index],
					urls: array
				});
			} else {
				index == 0 ? (this.video = this.orderInfo.beforeVideo) : this.orderInfo.afterVideo;
				this.showVideo = true;
				// 获取 video 上下文 videoContext 对象
				const videoContext = uni.createVideoContext("video", this);
				// 进入全屏状态
				videoContext.play();
				// videoContext.requestFullScreen();
			}
		}
	}
};
</script>
<style scoped lang="less">
.video {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
}
.upload-item {
	position: relative;
	width: 148rpx;
	height: 148rpx;
	// margin-right: 28rpx;
	// margin-bottom: 24rpx;
}
.playIcon {
	width: 32upx;
	height: 32upx;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.textarea {
	width: 706upx;
	height: 241upx;
	background: #fafafa;
	border: 1px solid rgba(228, 228, 228, 0.45);
	border-radius: 10upx;
	padding: 20upx;
}
.placeholder,
.reg-input {
	font-size: 24upx;
	color: #999999;
}
.timeCon {
	font-size: 26upx;
	color: #333333;
	line-height: 69upx;
}

.btnCon {
	width: 100%;
	margin: 30upx 0;
	.btn {
		width: 706upx;
		height: 88upx;
		background: #fe7578;
		font-size: 30upx;
		color: #ffffff;
		line-height: 88upx;
		text-align: center;
		border-radius: 40upx;
	}
}

.bindTitle {
	font-size: 24upx;
	color: #999999;
	margin-left: 20upx;
}

.evaConTitle {
	padding: 30upx 0;
}

.labelIcon {
	position: relative;

	image {
		width: 32upx;
		height: 32upx;
	}
}

.list-con {
	padding: 0 20upx;
}

.itemCon {
	width: 20%;
	padding: 30upx 0;
}
</style>
