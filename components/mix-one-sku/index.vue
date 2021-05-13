<template>
	<uni-popup type="bottom" class="popup" ref="popup">
		<scroll-view scroll-y="true" class="attr-content">
			<view class="sku-content layer">
				<view class="a-t">
					<image :src="currentObj.thumbnail" class="img"></image>
					<view class="right">
						<view class="" v-if="currentObj.qitaPrice">
							<mix-price-view :price="currentObj.qitaPrice"></mix-price-view>
						</view>
						<view class="" v-else>
							<mix-price-view :price="currentObj.goodsPrice"></mix-price-view>
						</view>

						<text style="color: #333333;font-size: 26rpx;">库存：{{ currentObj.stock }}</text>
						<text style="color: #666666;font-size: 24rpx;">赠送：{{ currentObj.integralNum }}积分</text>
						<view class="selected">
							已选：
							<text class="selected-text">{{ currentObj.title }}</text>
						</view>
					</view>
					<view class="mix-icon icon-close" style="color: #999999;" @click.stop="close"></view>
				</view>
				<view class="attr-list">
					<view class="item-list">
						<text v-for="(v, k) in dataobject.dataList" :key="k" class="tit" :class="{selected:active==k}"
							@click.stop="choseSku(v,k)">
							{{ v.title }}</text>
					</view>
				</view>
				<view class="choseNum row between">
					<view style="color:#666666;">数量</view>
					<uni-number-box class="step" :min="1" @change="numberChange" :max='currentObj.stock' :value="num">
					</uni-number-box>
				</view>
			</view>
			<view class="updataGoods y-bg" hover-class="btn-hover" @tap.stop="addcart" v-if="options=='list'">
				确认
			</view>
		</scroll-view>
	</uni-popup>
</template>

<script>
	import uniNumberBox from "@/components/mix-number-box/mix-number-box.vue"
	export default {
		components: {
			uniNumberBox
		},
		props: {
			dataobject: {
				type: Object,
				default: {
					thumbnail: '',
					dataList: []
				}
			},
			options: {
				type: String,
				default: 'list'
			}
		},
		data() {
			return {
				active: 0,
				num: 1,
				currentObj: {}
			}
		},
		watch: {
			dataobject: {
				handler(n) {
					this.currentObj = n.dataList[0];
					this.$emit('setSku', this.currentObj)
				},
				deep: true
			}
		},
		methods: {
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.hidden();
			},
			choseSku(e, k) {
				this.active = k;
				this.currentObj = e;
				this.$emit('setSku', this.currentObj)
			},
			numberChange(e) {
				this.num = e.number;
			},
			addcart() {
				this.$emit('userConfirm')
			}
		}
	}
</script>

<style scoped lang="scss">
	/* 规格选择弹窗 */
	.choseNum {
		padding:40upx 20upx;
		z-index: 999999;
	}
	.popup{
		z-index: 99999999;
	}
	.attr-content {
		padding: 10upx 0;
		background-color: #FFFFFF;
		border-radius: 20upx 20upx 0px 0px;
		width: 100%;
		box-sizing: border-box;
		position: relative;
		max-height:60vh;
		.a-t {
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			position: relative;
			padding-top: 40upx;
			.img {
				width: 200upx;
				height: 200upx;
				border-radius: 8upx;
			}

			.right {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 30upx;

				.price {
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			margin-top: 50upx;
		}
		.item-list {
			padding: 0 30upx;
			display: flex;
			flex-wrap: wrap;

			.tit {
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 50upx;
				width: 210upx;
				height: 60upx;
				padding: 0 20upx;
				background: #F6F5F5;
				font-size: 24upx;
			}

			.selected {
				border: none;
				color: #0673EC;
				background: #0673EC;
				border: 1px solid #0673EC;
			}
		}
	}
	.updataGoods {
		width: 750rpx;
		line-height: 80rpx;
		background: #0673EC;
		text-align: center;
		font-size: 32upx;
		color: rgba(255, 255, 255, 1);
	}
</style>
