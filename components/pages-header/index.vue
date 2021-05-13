<template name="page-head" charset="utf-8">
	<view class="">
		<view class="uni-page-head">
			<view class="topnav" :style="{'background':background,'height':height}">

			</view>
			<view class="uni-page-head-con" :style="{'background':background}">
				<image src="/static/img/slogo.png" class="backImg" v-if="type==1" ></image>
				<view class="mix-icon icon-fanhui" v-else @click.stop="viewBack">
					
				</view>
				<view class="uni-page-head-title" :style="{color:newcolor}">{{title}}</view>
				<view class="uni-page-head-right" v-if="showRightText" >
					<view v-if="rightTxt!=''" class="right-text" :style="{color:newcolor}" @click.stop="onClick(1)">
						{{rightTxt}}
					</view>
					<image src="/static/home/search.png" class="searchImg" v-else @click.stop="onClick(0)"></image>
				</view>
			</view>
		</view>
		<view class="">
			<view class="uni-page-head-top" :style="{'background':background}">
			
			</view>
		</view>
		
	</view>


</template>
<script>
	export default {
		name: "page-head",
		data(){
			return{
				height:uni.getSystemInfoSync()['statusBarHeight']+'px'
			}
		},
		props: {
			background:{
				type: String,
				default: "#6FBEFA"
			},
			title: {
				type: String,
				default: ""
			},
			newcolor: {
				type: String,
				default: '#000'
			},
			rightTxt: {
				type: String,
				default: ""
			},
			showRightText: {
				type: Boolean,
				default: false
			},
			type:{
				type:[Number,String],
				default:1
			}
		},
		methods: {
			onClick(ind) {
				this.$emit("click",ind);
			},
			viewBack(){
				uni.navigateBack();
			}

		}
	}
</script>
<style scoped lang="scss">
	/* 头部占位  状态栏*/
	// .topnav {
	// 	height:var(--status-bar-height);
	// 	// background: #FFFFFF;
	// }

	.backImg {
		width: 157upx;
		height: 66upx;
		position: absolute;
		top:50%;
		transform: translateY(-50%);
		left: 30upx;
		
	}
	.icon-fanhui{
		position: absolute;
		top:50%;
		transform: translateY(-50%);
		left: 30upx;
	}
	.searchImg{
		width:36upx;
		height:36upx;
	}

	/* pagehead 公共头部样式 */
	.uni-page-head {
		// background: #FFFFFF;
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		z-index: 999999 !important;
	}
	.uni-page-head-top{
		height:calc(100px + var(--status-bar-height));
	}

	.uni-page-head-con {
		// background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height:88upx;
		position: relative;
	}

	.uni-page-head-left {
		display: flex;
		align-items: center;
	}

	.uni-page-head-title {
		font-size: 30upx;
		line-height:88upx;
		font-weight: bold;
	}

	.uni-page-head-right {
		font-size: 30upx;
		line-height:100upx;
		color: #ff8300;
		font-weight: bold;
		position: absolute;
		right:30upx;
		top: 50%;
		transform: translateY(-50%);
	}
	.right-text{
		font-size:26upx;
		// color:rgba(102,102,102,1);
	}
</style>
