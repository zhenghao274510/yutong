<template>
	<view class="uni-goods-nav">
		<!-- 底部占位 -->
		<view class="uni-tab__seat" />
		<view class="uni-tab__cart-box flex">
			<view class="flex uni-tab__cart-sub-box">
				<view v-for="(item,index) in options" :key="index" class="flex uni-tab__cart-button-left"
					@click="onClick(index,item)">
					<view class="uni-tab__icon">
						<image class="image" :src="item.icon" mode="widthFix" />
						
					</view>
					<text class="uni-tab__text">{{ item.text }}</text>
					<view class="tipsnum" v-if="index==0">
						{{num}}
					</view>
				</view>
			</view>
			<view class="row between fill">
				<view class="uni-nav-one" v-for="(v,k) in buttonGroup" :key="k" :style="{background:v.background,color:v.color}"
					@click="buttonClick(k,v)">
					{{v.text}}
				</view>
			</view>
		</view>

	<!-- 	<view class="uni-tab__cart-box flex center" v-else style="align-items: center;">
			<view class="uni-nav-three">
				已售罄
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'UniGoodsNav',
		data() {
			return {
				options: [{
						icon: '/static/img/gouwuche.png',
						text: '购物车'
					},
					{
						icon: '/static/img/shoucang.png',
						text: '收藏'
					}
				],
				buttonGroup: [{
						text: '加入购物车',
						color: '#333333',
						background: '#D9D9D9'
					},
					{
						text: '立即购买',
						color: '#FFFFFF',
						background: '#333333'
					}
				]
			}
		},
		props: {
			collect: {
				type: [String, Number],
				default: 0
			},
			fill: {
				type: Boolean,
				default: false
			},
			num: {
				type: [String, Number],
				default: 0
			},
		},
		watch: {
			collect(n) {
				console.log(n)
				n == 1 ? this.options[1].icon='/static/img/yishoucang@2x.png' : this.options[1].icon =
					'/static/img/shoucang.png';
			}
		},
		methods: {
			onClick(index, item) {
				console.log(this.collect)
				this.$emit('click', {
					index,
					content: item
				})
			},
			buttonClick(index, item) {
				if (uni.report) {
					uni.report(item.text, item.text)
				}
				this.$emit('buttonClick', {
					index,
					content: item
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.uni-flex {
		flex: 1;
	}
	.uni-nav-three {
		background: #C0C0C0;
		width: 420upx;
		height: 68upx;
		line-height: 68upx;
		text-align: center;
		border-radius: 38upx;
		color: #FFFFFF;
	}

	.flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-goods-nav {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
		z-index: 99;
	}

	.uni-tab__cart-box {
		flex: 1;
		height: 100rpx;
		background-color: #fff;
		z-index: 99;
	}

	.uni-tab__cart-sub-box {
		width: 40%;
	}

	.uni-tab__right {
		overflow: hidden;
	}

	.uni-tab__cart-button-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		position: relative;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
	}

	.uni-tab__icon {
		width: 48upx;
		height: 48upx;
		position: relative;
	}
	.tipsnum{
		position: absolute;
		top:10upx;
		right:30upx;
		width: 30upx;
		height: 30upx;
		text-align: center;
		line-height: 30upx;
		font-size: 20upx;
		border: 1px solid #FC7150;
		border-radius: 50%;
		color: #FC7150;
	}

	.image {
		width: 48upx;
		height: 48upx;
	}

	.uni-tab__text {
		margin-top: 3px;
		font-size: $uni-font-size-sm;
		color: #666;
	}

	.uni-tab__cart-button-right {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.uni-tab__cart-button-right-text {
		font-size: $uni-font-size-base;
		color: #fff;
		width: 221upx;
		line-height: 100upx;
		border-radius: 38upx;
	}

	.uni-tab__cart-button-right:active {
		opacity: 0.7;
	}

	.uni-tab__dot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		position: absolute;
		right: 12px;
		top: 4px;
		justify-content: center;
		align-items: center;
	}

	.uni-tab__dot {
		padding: 0 4px;
		line-height: 15px;
		color: #ffffff;
		text-align: center;
		font-size: 12px;
		background-color: #ff0000;
		border-radius: 15px;
	}

	.uni-tab__dots {
		padding: 0 4px;
		border-radius: 15px;
	}

	.uni-nav-one {
		width: 50%;
		line-height: 100upx;
		text-align: center;
	}
</style>
