<template>
	<view class="">
		<view class="item_column" v-for="(v,k) in list" :key="k" @click="userOptions(v.id)">
			<view class="column_img_con">
				<image :src="v.logo" mode="scaleToFill" lazy-load="true"></image>
			</view>
			<view class="fill" style="position: relative;height:160upx;">
				<view class="uni-second-title">
					{{v.name}}
				</view>
					<view class="scale_num">{{v.scope}}</view>
					<view class="scale_address">{{v.province}}{{v.city}}{{v.area}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			userOptions(id){
				this.$emit('click',id)
			}
		}
		
	}
</script>
<style scoped lang="scss">
	.scale_num{
		padding:20upx 0;
		color: #666666;
		font-size: 24rpx;
	}
	.scale_address {
		font-size: 20rpx;
		color: #999999;
	}

	.column_img_con {
		width: 160rpx;
		height: 160rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;

		image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 6rpx;
		}
	}

	.item_column {
		position: relative;
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #FFFFFF;
		border-bottom: 1px solid #F6F6F6;

		&:last-child {
			border: none;
		}
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		color: #000000;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:1;
		font-size: 26rpx;
	}
</style>
