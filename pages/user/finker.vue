<template>
	<view class="content">
		<view class="mian-con"><textarea v-model="content" placeholder="请描述您遇到的问题~" class="textarea" /></view>

		<view class="footer-btn" hover-class="btn-hover" :class="content != '' ? 'hasbg' : 'isBg'" @click="subfilker">提 交</view>
		<mix-modal ref="mixModal" text="提交成功" @onConfirm="onConfirm"></mix-modal>
	</view>
</template>

<script>
import mixModal from "@/components/mix-modal/mix-modal.vue";
export default {
	components: {
		mixModal
	},
	data() {
		return {
			content: ""
		};
	},
	methods: {
		onConfirm() {
			this.back();
		},
		async subfilker() {
			if (this.content == "") {
				this.$util.msg("请输入反馈内容!");
				return;
			}
			this.$util.throttle(async () => {
				const data={
					uid:uni.getStorageSync('uid'),
					content:this.content
				}
				const res = await this.$request("feedback", data, {showLoading: true});
				if (res.code == 0) {
					this.$refs.mixModal.open();
				} else {
					this.$util.msg(res.msg);
				}
			});
		}
	}
};
</script>

<style scoped>
page {
	background-color: #fafafa;
	height: 100%;
}

.info {
	color: #999999;
	font-size: 24upx;
}

.img {
	width: 67upx;
	height: 67upx;
}

.mian-con {
	background-color: #ffffff;
	height: 368upx;
	margin-top: 20upx;
}

.footer-btn {
	width: 80%;
	height: 88upx;
	margin: 100upx auto;
	font-size: 34upx;
	border-radius: 44upx;
	font-weight: bold;
	color: #ffffff;
	text-align: center;
	line-height: 88upx;
}

.isBg {
	background: #bec3cf;
}
.hasbg {
	background: #00aaff;
}

.textarea {
	padding: 40upx 20upx;
	width: 100%;
	height: 500upx;
	box-sizing: border-box;
	border-radius: 4px;
	font-size: 26upx;
	border-radius: 20upx;
	color: #a4a4a5;
}
</style>
