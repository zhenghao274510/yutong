<template>
	<uni-popup type="bottom" class="popup" ref="popup">
		<scroll-view scroll-y="true" class="attr-content">
			<view class="sku-content layer">
				<view class="a-t">
					<image :src="currentObj.image" class="img" v-if="currentObj.image"></image>
					<view class="right">
						<view class="sku-title">
							{{dataobject.name}}
						</view>
						<mix-price-view :price="currentObj.price" :size="30" color="#EE6C56"></mix-price-view>
						<view class="row">
							<view style="color:#E9463D;font-size: 26rpx;">赠送：{{ dataobject.integral}}积分</view>
							<view style="color:#E9463D;font-size: 26rpx;margin-left:20upx ;">库存：{{ currentObj.stock }}</view>
						</view>
						<view class="has_con" v-if="current.length!=0">
							已选:<text v-for="(v,k) in current" :key="k" class="has_item">{{v.value}}</text>
						</view>
					</view>
					<view class="mix-icon icon-close" style="color: #999999;" @click.stop="close"></view>
				</view>
				<view class="details_con">
					<view class="sku-info-con" v-for="(item,index) in skuNameList" :key="index">
						<view class="sku-name">
							{{item.shuName}}
						</view>
						<view class="sku-con row">
							<view class="sku-item clamp" :class="[subIndex[index] == k?'selected':'noSelected']"
								v-for="(v,k) in item.dataList" :key="k" @click="testGet(item, index, k)">
								{{v.value}}
							</view>
						</view>
					</view>
				</view>
				<view class="choseNum row between">
					<view style="color:#666666;">数量</view>
					<uni-number-box class="step" :min="1" @change="numberChange" :max='currentObj.stock' :value="num">
					</uni-number-box>
				</view>
			</view>
			<view class="updataGoods y-bg" hover-class="btn-hover" @tap.stop="addcart">
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
			dataobject: {}
		},
		data() {
			return {
				active: 0,
				activeTopClass: 0,
				subIndex: [0, 0],
				current: [],
				skuNameList: [],
				currentObj: {},
				num: 1
			}
		},
		watch: {
			dataobject: {
				handler(n) {
					console.log(n)
					this.current = [], this.subIndex = [], this.active = this.activeTopClass = 0;
					if(n.skuList.length!=0){
						this.FormData(n.skuList, n.shunameList);
					}
				},
				deep: true
			},
			currentObj:{
				handler(n) {
					this.$emit('setSku', this.currentObj);
				},
				deep: true
			}
		},
		methods: {
			testGet(item, n, i) {
				console.log(this.dataobject.shunameList[n].shuName, n, i);
				if (this.dataobject.shunameList[n].shuName == item.shuName) {
					this.current[n] = this.skuNameList[n].dataList[i];
					this.$set(this.subIndex, n, i);
				} else {
					this.$set(this.subIndex, n, -1); //去掉选中颜色
				}
				this.chochItem(this.current);
			},
			chochItem(arry) {
				this.dataobject.skuList.forEach((item, index) => {
					if (JSON.stringify(item.specification) == JSON.stringify(arry)) {
						this.active = index;
						this.currentObj = this.dataobject.skuList[index];
						// console.log(this.currentObj)
					}
				});
			},
			FormData(skuList, shunameList) {
				console.log(skuList, shunameList);
				for (let i = 0; i < shunameList.length; i++) {
					shunameList[i].dataList = [];
					this.subIndex.push(0);
					for (let j = 0; j < skuList.length; j++) {
						if (JSON.stringify(shunameList[i].dataList).indexOf(JSON.stringify(skuList[j].specification[i])) ==
							-1) {
							shunameList[i].dataList.push(skuList[j].specification[i]);
						}
					}
					this.current.push(shunameList[i].dataList[0])
				}
				this.skuNameList = shunameList;
				this.currentObj = skuList[0];
			},
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			choseSku(e, k) {
				this.active = k;
				this.currentObj = e;
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
		padding: 0 20upx 40upx 20upx;
		z-index: 999;
	}
	.popup {
		z-index: 999;
	}
	.sku-title {
		font-size: 28upx;
		color: #333333;
		line-height: 38upx;
	}
	.attr-content {
		padding: 10upx 0;
		background-color: #FFFFFF;
		border-radius: 20upx 20upx 0px 0px;
		width: 100%;
		box-sizing: border-box;
		position: relative;
		max-height: 60vh;

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

		.details_con {
			padding:0 20upx;
			.sku-con {
				flex-wrap: wrap;
				padding: 20upx 0;
				.sku-name {
					font-size: 24upx;
					color: rgba(153, 153, 153, 1);
				}

				.sku-item {
					width: 100upx;
					line-height:50upx;
					box-sizing: border-box;
					margin-right:20upx;
					text-align: center;
					border-radius: 6upx;
					font-size: 24upx;

				}

				.noSelected {
					border: 1px solid #0673EC;
				}

				.selected {
					border: 1upx solid #0673EC;
					background: #0673EC;
					color:#FFFFFF;
				}

				.sku_pad {
					margin-right: 20upx;
				}
			}
		}
	}

	.has_con {
		// background: #0673EC;
		height: 80upx;
		line-height: 80upx;
		.has_item {
			color: #0673EC;
			margin-right: 20upx;
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
