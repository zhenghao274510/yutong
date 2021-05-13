<template>
	<view class="">
		<view class="list-con">
			<view class="evaConTitle">二、维修信息</view>
			<view class="row b-b timeCon">
				<view class="itemLabel">维修开始时间：</view>
				<input type="text" disabled="true" class="reg-input fill" placeholder="选择（年月日）、（小时分钟）" placeholder-class="placeholder" v-model="orderInfo.startDate" @click="userOnClickPicker(0)" />
			</view>
			<view class="row b-b timeCon">
				<view class="itemLabel">维修结束时间：</view>
				<input type="text" disabled="true" class="reg-input fill" placeholder="选择（年月日）、（小时分钟）" placeholder-class="placeholder" v-model="orderInfo.endDate" @click="userOnClickPicker(1)" />
			</view>
			<view class="timeCon">
				<view class="itemLabel">维修前照片/视频：</view>
				<view class="row between" style="width:50%;">
					<mix-upload-image :count="1" :length="1" ref="mixUploadImageBefore"></mix-upload-image>
					<mix-upload-image :count="1" :length="1" ref="mixUploadvideoBefore" type="1" @onClick="onClick"></mix-upload-image>
				</view>
			</view>
			<view class="timeCon">
				<view class="itemLabel">维修后照片/视频：</view>
				<view class="row between" style="width:50%;">
					<mix-upload-image :count="1" :length="1" ref="mixUploadImageAfter"></mix-upload-image>
					<mix-upload-image :count="1" :length="1" ref="mixUploadvideoAfter" type="1" @onClick="onClick"></mix-upload-image>
				</view>
			</view>
			<view class="evaConTitle">故障原因描述：</view>
			<textarea value="" placeholder="请输入故障描述文字内容~" maxlength="180" v-model="orderInfo.reason" placeholder-class="placeholder" class="textarea" />
			<view class="evaConTitle">解决方案描述：</view>
			<textarea value="" placeholder="请输入解决方案描述文字内容~" maxlength="180" v-model="orderInfo.solution" placeholder-class="placeholder" class="textarea" />
		</view>

		<view class="evaCon">
			<view class="list-con">
				<view class="evaConTitle">其他检查：</view>
				<block v-for="(item, index) in dataList" :key="index">
					<view class="">{{ item.title }}</view>
					<view class="row">
						<view class="row itemCon" v-for="(v, k) in item.answer" :key="k">
							<view class="row" @click="userClick(item, k, index)">
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

		<view class="btnCon row center"><view class="btn" hover-class="hover-opacity" @click="createOrder">下一步（2/3）</view></view>

		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
		<w-picker :visible.sync="visible" mode="date" fields="minute" startYear="2000" value="2020-04-07 10:25" :current="true" @confirm="onConfirm($event, 'date')" @cancel="visible = false" :disabled-after="true" ref="date"></w-picker>
	</view>
</template>

<script>
const maintenanceList = require("./components/maintenance.js");
import mixUploadImage from "@/components/mix-upload-image/mix-upload-image.vue";
import wPicker from "@/components/w-picker/w-picker.vue";
export default {
	components: {
		mixUploadImage,
		wPicker
	},
	data() {
		return {
			video: "",
			visible: false,
			setSomeDate: 0,
			dataList: [],
			orderId: "",
			orderInfo: {
				startDate: "",
				endDate: "", //结束时间
				beforePhoto: "", //开始前照片
				beforeVideo: "", //开始前视频
				afterPhoto: "", //开始前照片
				afterVideo: "", //开始前视频
				reason: "", //故障原因
				solution: "", //解决方案
				filter: 0, //滤网是否清晰0.脏1.轻微2.正常
				pipeline: 0, //	管路是否正常0.是1.否
				machine: 0 // 机器否正常0.是1.否
			}
		};
	},
	onLoad(options) {
		this.dataList = maintenanceList.maintenance;
		if (options.orderId) {
			this.orderId = options.orderId;
		}
	},
	methods: {
		onClick(item) {
			this.video = item.filePath;
		},
		userOnClickPicker(type) {
			this.setSomeDate = type;
			this.showPopup("date");
		},
		onConfirm(e) {
			this.setSomeDate == 0 ? (this.orderInfo.startDate = e.result) : (this.orderInfo.endDate = e.result);
		},
		userClick(item, index, line) {
			item.brand = index;
			const data = this.orderInfo;
			line == 0 ? (data.filter = index) : line == 1 ? (data.pipeline = index) : (data.machine = index);
		},
		//创建订单
		createOrder() {
			const beforePhotoList = this.$refs.mixUploadImageBefore.imageList[0];
			const beforeVideoList = this.$refs.mixUploadvideoBefore.imageList[0];
			const afterPhotoList = this.$refs.mixUploadImageAfter.imageList[0];
			const afterVideoList = this.$refs.mixUploadvideoAfter.imageList[0];
			this.$util.throttle(async () => {
				const data = this.orderInfo;
				
				if (data.startDate == "") {
					this.$util.msg("请选择开始时间!");
					return;
				}
				if (data.endDate == "") {
					this.$util.msg("请选择开始时间!");
					return;
				}
				if (!beforePhotoList) {
					this.$util.msg("请上传维修前照片!");
					return;
				}
				if (!beforeVideoList) {
					this.$util.msg("请上传维修前视频!");
					return;
				}
				if (!afterPhotoList) {
					this.$util.msg("请上传维修后照片!");
					return;
				}
				if (!afterVideoList) {
					this.$util.msg("请上传维修后视频!");
					return;
				}
				if (data.reason == "") {
					this.$util.msg("请填写故障原因!");
					return;
				}
				if (data.solution == "") {
					this.$util.msg("请填写解决方案!");
					return;
				}
				data.maintainerId = uni.getStorageSync("uid");
				data.orderId = this.orderId;
				data.beforePhoto = beforePhotoList.url; //开始前照片
				data.beforeVideo = beforeVideoList.url; //开始前照片
				data.afterPhoto = afterPhotoList.url; //开始前照片
				data.afterVideo = afterVideoList.url; //开始前照片
				
				const res = await this.$request("addMaintenanceInfo", data, {showLoading: true});
				if (res.code == 0) {
					this.$util.msg("提交成功!");
					setTimeout(() => {
						uni.redirectTo({
							url: `./maintenanceEnd?orderId=${this.orderId}`
						});
					}, 500);
				} else {
					this.$util.msg(res.msg);
				}
			});
		}
	}
};
</script>
<style scoped lang="less">
.video {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
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
