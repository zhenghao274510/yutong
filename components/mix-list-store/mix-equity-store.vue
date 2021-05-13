<template>
	<view class="row" style="background: #FFFFFF;">
		<view class="top-nav-item" @click="changeTab(v, k)" v-for="(v, k) in navList" :key="k">
			<view class="row center item_con">
				<view class="top-nav-item-title" :class="{ iconColor: k == current }">{{ v.title }}</view>
				<view class="top-nav-item-icon" v-if="k!=0">
					<view class="iconfont icon-shangjiantou" :class="{ iconColor: v.flag==1 }"></view>
					<view class="iconfont icon-xiajiantou" :class="{ iconColor: v.flag==0 }"></view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				sortType: 0,
				navList: [{
						title: '全部',
						flag: ''
					},
					{
						title: '数量',
						flag: 1
					},
					{
						title: '时间',
						flag: 1
					}
				],
			}
		},
		methods: {
			changeTab(v, k) {
				if (this.current == 0 && k == 0) {
					return
				} else {
					if (this.current == k) {
						v.flag == 1 ? (v.flag = 0, this.sortType = 0) : (v.flag = 1, this.sortType = 1);
					} else {
						this.current = k;
						this.sortType = this.navList[k].flag;
					}
					const {current,sortType}=this;
					this.$emit('changeStore',{current,sortType});
				}
			}
		}
	}
</script>

<style scoped>
	.iconfont{
		color:#888888;
	}
	.icon-shangjiantou,.icon-xiajiantou{
		font-size:14upx !important;
		line-height: .8;
	}
	.iconColor{
		color:#232323;
	}
	.top-nav {
		height: 160upx;
		background: #ffffff;
		z-index: 999;
	}

	.top-nav-item {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.item_con{
		width: 165rpx;
		height:60rpx;
		background: #FFFFFF;
		border-radius: 27rpx;
	}

	.top-nav-item-title {
		font-weight: bold;
		font-size: 26rpx;
	}

	.top-nav-item-icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
