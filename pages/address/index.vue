<template>
	<view class="app">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData"  :back-top="true">
			<!-- <view class="main-wrap" :class="{show:loaded}"> -->
				<view class="item row between" v-for="(item, index) in dataList" :key="index"
					@tap.stop="chooseAddress(item)">
					<view class="fill">
						<view class="row">
							<view class="name">{{ item.linkman }}</view>
							<view class="mobile">{{ item.mobile }}</view>
						</view>
						<view class="row" style="padding:20upx 0;">
							<view class="reg-con" v-if="item.state==1">
								默认
							</view>
							<view class="mobile">{{ item.address }}{{ item.addressDetail}}
							</view>
						</view>
					</view>
					<view class="bot row" @tap.stop.prevent="stopPrevent">
						<view class="btn center" style="margin-right: 16rpx;" @tap="editAddr(item)">
							<image src="/static/img/bianji.png" class="bian_icon"></image>
						</view>
						<view class="btn center" @tap="showDelModal(item.id)">
							<text class="mix-icon icon-lajitong" style="color: #333333;"></text>
						</view>
					</view>
				</view>
			<!-- </view> -->
		</s-pull-scroll>
		<view class="bot-btn-wrap fix-bot" v-if="loaded">
			<mix-button text="添加新地址" icon="icon-jia2" background="#72BFFA" :iconSize="36" :isConfirm="false" @onConfirm="onConfirm">
			</mix-button>
		</view>
		<mix-loading v-if="isLoading" :mask='true'></mix-loading>

		<mix-modal ref="mixModal" title="提示" text="确定要删除该地址吗" @onConfirm="deleteAddr"></mix-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isChoose: '',
				id: '',
				choosedId: '',
				dataList: []
			}
		},
		onLoad(options) {
			this.isChoose = options.choose;
			this.choosedId = options.id;
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
			onConfirm() {
				uni.navigateTo({
					url: './addaddress'
				})
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200)
			},
			async updateDefaultAddress(id) {
				const res = await this.$request('setDefaultAddr', {
					id
				});
				this.$util.msg(res.resultNote);
				if (res.result == 0) {
					this.refresh()
				}
			},
			async loadData(pullScroll) {
				let parmas = {
					uid: uni.getStorageSync('uid')
				}
				const res = await this.$request('getMyAddress', parmas,{showLoading:true});
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				if (res.code != 0 || res.data.length == 0) {
					pullScroll.empty()
					return
				}
				this.dataList =res.data;
				 pullScroll.finish();
			},
			//选择地址
			chooseAddress(item) {
				if (!this.isChoose) {
					return;
				}
				this.$util.prePage().setAddress(item);
				uni.navigateBack();
			},
			/**
			 * 删除地址
			 * 注意 删除成功已选择的地址需要清空
			 */
			async deleteAddr() {
				const parmas = {
					uid: uni.getStorageSync('uid'),
					id: this.id
				}
				const res = await this.$request('delAddr', parmas, {
					showLoading: true
				});

				if (res.result == 0) {
					this.refresh();
					if (this.choosedId == this.id) {
						this.$util.prePage().setAddress({});
					}
				} else {
					this.$util.msg(res.resultNote);
				}
			},
			//编辑地址
			editAddr(item) {
				uni.navigateTo({
					url: `./change?item=${JSON.stringify(item)}`
				})
			},
			showDelModal(id) {
				this.id = id;
				this.$refs.mixModal.open();
			}
		}
	}
</script>
<style>
	page {
		background: #F6F6F6;
	}
</style>
<style scoped lang="scss">
	.reg-con {
		width:80upx;
		line-height: 36upx;
		background:#72BFFA;
		text-align: center;
		border-radius: 4upx;
		font-size: 22upx;
		color: #FFFFFF;
	}

	.bian_icon {
		width: 36upx;
		height: 36upx;
	}

	.app {
		padding-top: 20upx;
	}

	.item {
		padding: 20upx;
		margin-bottom: 20upx;
		background-color: #fff;
		border-radius: 12upx;
		box-shadow: 0px 0px 20upx rgba(0, 0, 0, .03);
		height: 169upx;

		.name {
			font-size: 26upx;
			color: #333;
		}

		.mobile {
			font-size: 24upx;
			color: #999;
			padding:0 20upx;
		}

		.content {
			font-size: 30upx;
			color: #333333;
			padding-bottom: 10upx;
		}

		.bot {
			justify-content: flex-end;
			height: 79upx;

			&:before {
				left: -26upx;
				right: -26upx;
				border-color: #f0f0f0;
			}
		}

		.btn {
			font-size: 26upx;
			color: #444;

			.mix-icon {
				margin-right: 16upx;
				font-size: 34upx;
			}
		}
	}

	.bot-btn-wrap {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 30upx;
		z-index: 99;
		width: 100%;
	}
</style>
