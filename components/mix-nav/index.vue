<template>
	<view class="">
		<view class="nav-banner">
			<view class="cate-section">
				<view class="item" v-for="(v,k) in list" :key="k" @click="userOptions(v.type)">
					<image class="icon" :src="v.icon"></image>
					<text>{{ v.name }}</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {}
		},
		methods: {
			userOptions(type) {
               type==0?this.navTo('/pages/shop/quzi'):type==1?this.navTo('/pages/shop/consumption'):type==2?this.navTo('/pages/shop/index'):this.navTo('/pages/shop/outline')
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav-banner {
		position: relative;
		margin: 20rpx 0;
		// background-color: #fff;
	}

	/* 分类 */
	.cate-section {
		display: flex;
		flex-wrap: wrap;
		background: #fff;
		padding: 16rpx 10rpx;
		box-sizing: border-box;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 25%;
			padding: 10rpx 0;

			.icon {
				width: 94rpx;
				height: 94rpx;

				border-radius: 50%;
			}

			text {
				font-size: 24rpx;
				color: #666666;
				margin-top: 14rpx;
			}
		}
	}

	.dots {
		position: absolute;
		left: 0;
		bottom: 12rpx;
		width: 100%;
	}

	.dot {
		width: 32rpx;
		height: 8rpx;
		margin: 0 6rpx;
		background-color: #333;
		border-radius: 10px;

		&.current {
			background-color: #FFFFFF;
		}
	}
</style>
