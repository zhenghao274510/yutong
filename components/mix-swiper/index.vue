<template>
	<view class="swiper-content">
		<view class="search-wrapper">
			<view class="swiper-wrapper">
				<swiper class="swiper" circular="true" autoplay="true" indicator-dots="true" duration="500"
					indicator-active-color="#ff0000" indicator-color="#FFEAAD">
					<swiper-item class="swiper-item" v-for="(item,index) of list" :key="index">
						<image :src="item.image" />
					</swiper-item>
				</swiper>
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
		}
	}
</script>

<style scoped>
	.swiper-content {
		position: relative;
	}

	.uni-icon-location-filled {
		color: #FFFFFF;
		font-size: 28upx;
	}
	.swiper {
		width: 706upx;
		height: 271upx;
		margin: 0 auto;
		
	}

	.swiper-item {
		width: 100%;
		display: block;
	}

	.swiper-item image {
		width: 100%;
		display: block;
		height: 271upx;
		border-radius: 15upx;
	}
</style>
