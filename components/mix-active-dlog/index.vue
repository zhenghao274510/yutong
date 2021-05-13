<template>
	<uni-popup ref="popup" class="popup">
		<view class="pop-content" v-if="type==1">
			<view class="pop-main column center" >
				<text class="title">提示</text>
				<view class="con center">
					<text class="text">激活成功！</text>
				</view>
				<view class="btn-group row b-t center">
					<view class="btn" @click="confirm">
						<text>确定</text>
					</view>
				</view>
				<view class="topCon">
					<image src="/static/img/tishi@2x.png" mode="" class="topIcon"></image>
				</view>
			</view>
		</view>
		<view class="pop-content " v-if="type==2">
			<image src="/static/img/tanchuang.png" mode="" class="pic"></image>
			<view class="popMain column center">
				<text class="title">温馨提示</text>
				<view class="center" style="padding: 30upx;">
					<text class="text">请先激活！</text>
				</view>
				<view class="btn-group row center">
					<view class="btn" @click="confirm">
						<text>确定</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pop-content" v-if="type==3">
			<view class=" column center" style="background: #FFFFFF;">
				<view class="con center">
					<text class="text">认购成功！</text>
				</view>
				<view class="btn-group row center">
					<view class="btn" @click="close">
						<text style="color: #333;">确定</text>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		props:{
			type:String,
			default:'1'
		},
		data() {
			return {

			};
		},
		methods: {
			confirm() {
				this.$emit('onConfirm');
				this.close();
			},
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			}
		}
	}
</script>

<style scoped lang='less'>
	.popup{
		z-index: 99999;
	}
	.pop-main {
		border-radius: 24upx;
		padding-top: 140upx;
		background-color: #fff;
		position: relative;
	}
	.popMain{
		position: absolute;
		width: 100%;
		bottom: 0;
	}

	.pop-content {
		width: 520upx;
		position: relative;
		z-index: 999;
		.pic{
			width: 520upx;
			height: 588upx;
		}
		.title {
			font-size: 32upx;
			color: #333;
			line-height: 48upx;
			font-weight: 700;
		}

		.con {
			padding: 36upx 40upx 54upx;
		}

		.text {
			width: 460upx;
			font-size: 26upx;
			color: #333;
			line-height: 40upx;
			text-align: center;
		}

		.btn-group {
			width: 100%;
			padding-bottom:40upx;
		}

		.btn {
			width: 392upx;
			height: 78upx;
			line-height: 78upx;
			background: linear-gradient(90deg, #0C75FF 0%, #179DFE 100%);
			border-radius: 39upx;
			text-align: center;
			color: #FFFFFF;
		}
	}

	.topCon {
		position: absolute;
		top: -140upx;
		z-index: 9999999;
	}

	.topIcon {
		width: 320upx;
		height: 284upx;
		/* background: #FFFFFF; */
	}
</style>
