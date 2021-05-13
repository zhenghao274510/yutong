<template>
	<view class="">
		<pages-header title="个人信息"></pages-header>
		<view class="">
			<view class="row between b-b itemCon">
				<view class="itemTitle">头像</view>
				<image :src="userInfo.photo" mode="" class="userIcon" @click="chooseImage"></image>
			</view>
			<view class="row between b-b itemCon">
				<view class="itemTitle">昵称</view>

				<input type="text" value="" v-model="userInfo.nickname" class="input" />
			</view>
			<!-- <view class="row between b-b itemCon">
				<view class="itemTitle">
					手机号
				</view>
				<view class="input">
					{{userInfo.phone}}
				</view>
				
			</view> -->
		</view>
		<view class="tapBot"><mix-button text="保 存" ref="confirmBtn" fontColor="#fff" background="#72BFFA" @onConfirm="onConfirm"></mix-button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			show: false
		};
	},
	onLoad() {
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
			} else {
				this.$util.msg(res.msg);
			}
		},
		//   提交
		onConfirm() {
			this.$util.throttle(async () => {
				const data = this.userInfo;
				data.uid = uni.getStorageSync("uid");
				const res = await this.$request("save", data, {showLoading: true});
				if (res.code == 0) {
					this.$util.msg("修改成功!");
					this.back();
				} else {
					this.$util.msg(res.msg);
				}
			});
		},
		//选择图片
		chooseImage() {
			uni.chooseImage({
				count: 1, //最多可以选择的图片张数，默认9
				sizeType: ["original", "compressed"], //original 原图，compressed 压缩图，默认二者都有
				sourceType: ["album", "camera"], //album 从相册选图，camera 使用相机，默认二者都有
				success: res => {
					console.log(res);
					this.uploadFiles(res.tempFiles);
				}
			});
		},
		//上传图片
		async uploadFiles(files) {
			console.log(files);
			const item = {
				filePath: files[0],
				progress: 0,
				type: 0
			};
			const result = await this.$uploadFile("uploadImage", item);
			console.log(result);
			const res = JSON.parse(result);
			if (res.result == 0) {
				this.$util.msg("上传成功!");
				this.userInfo.photo = res.dataList[0];
			}
		}
	}
};
</script>

<style scoped>
.itemCon {
	padding: 20upx;
}

.itemTitle {
	color: #000000;
}

.userIcon {
	width: 90upx;
	height: 90upx;
}

.input {
	height: 60upx;
	line-height: 60upx;
	text-align: right;
}

.icon-you {
	font-size: 24upx;
	margin-left: 20upx;
}
.tapBot {
	position: fixed;
	bottom: 60upx;
	width: 100%;
}
</style>
