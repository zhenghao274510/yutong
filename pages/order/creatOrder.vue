<template>
	<view class="">
		<view class="pageBg">

		</view>
		<view class="column center" style="padding-top: 20upx;">
			<!-- 地址选择 -->
			<view class="pageTopCon topCon" @click="navTo(`/pages/address/index?id=${adr.id}&choose=1`)">
				<image src="/static/img/bg.png" mode="" class="addressBg"></image>
				<view class="pageTitle">
					地址
				</view>
				<view class="address-con row center between" v-if="addr.id">
					<view class="fill">
						<view class="row">
							<view class="addressLable">报修人：</view>
							<view>
								<text class="addressInfo">{{addr.linkman}}</text> <text class="addressInfo">
									{{addr.mobile | phone}}</text>
							</view>
						</view>
						<view class="" style="display: flex;">
							<view class="addressLable">报修地址：</view>
							<view class="addressInfo">{{addr.address}}{{addr.addressDetail}}</view>
						</view>
					</view>
					<view class="mix-icon icon-you"></view>
				</view>
				<view class="address-con row between center" v-else>
					<view class="" style="font-size: 30upx;">
						请选择地址
					</view>
					<view class="mix-icon icon-you"></view>
				</view>
			</view>
			<evan-form class="center-con" :hide-required-asterisk="true" label-position="left" :label-style="labelStyle"
				ref="form" :model="userInfo">
				<view class="pageTopCon topCon">
					<view class="infoItemTitle" style="padding: 30upx 20upx;">
						客户报修
					</view>

					<view class="list-con">
						<evan-form-item prop="faultDate" label="故障日期：">
							<view class="row b-b fill" @tap='visible=true'>
								<input type="text" disabled="true" class="reg-input" placeholder="请选择"
									placeholder-class="placeClass" v-model="userInfo.faultDate" />
								<view class="mix-icon icon-you"></view>
							</view>
						</evan-form-item>
					</view>
					<!-- <view class="list-con">
						<evan-form-item prop="phone" label="安装地址：">
							<view class=" b-b fill">
								<input type="text"  class="reg-input" placeholder="请输入手机号"
									placeholder-class="placeClass" v-model="userInfo.address" />
							</view>
						</evan-form-item>
					</view> -->
					<view class="list-con">
						<evan-form-item prop="" label="空调品牌：">
							<view class="row center fill">
								<view class="row" @click="brand=0">
									<view class="labelIcon">
										<image src="/static/img/active.png" mode="" v-if="brand==0"></image>
										<image src="/static/img/xuanz.png" mode="" v-else></image>
									</view>
									<view class="bindTitle">
										之铂
									</view>
								</view>
							</view>
							<view class="row center fill">
								<view class="row" @click="brand=1">
									<view class="labelIcon">
										<image src="/static/img/active.png" mode="" v-if="brand==1"></image>
										<image src="/static/img/xuanz.png" mode="" v-else></image>
									</view>
									<view class="bindTitle">
										其他
									</view>
									<view class="fill b-b">
										<input type="text" style="padding-left: 20upx;" placeholder-class="placeClass"
											v-model="otherBrand" />
									</view>
								</view>
							</view>
						</evan-form-item>
					</view>
					<view class="list-con">
						<evan-form-item prop="productNo" label="产品编号：">
							<view class=" b-b fill">
								<input type="text" class="reg-input" placeholder="请输入产品编号"
									placeholder-class="placeClass" v-model="userInfo.productNo" />
							</view>
						</evan-form-item>
					</view>
					<!-- <view class="list-con">
						<evan-form-item prop="phone" label="报修人：">
							<view class="d-items-center b-b fill">
								<input type="number" maxlength="11" class="reg-input" placeholder="请输入手机号"
									placeholder-class="placeClass" v-model="userInfo.address" />
							</view>
						</evan-form-item>
					</view> -->

				</view>
				<evan-form-item prop="description">
					<view class="pageTopCon topCon">
						<view class="infoItemTitle" style="padding: 30upx 20upx;">
							故障描述
						</view>
						<textarea value="" v-model="userInfo.description" placeholder="请输入故障描述内容文字~" class="textarea" />
					</view>
				</evan-form-item>
			</evan-form>
			<view class="btn" hover-class="hover-opacity" @click="createOrder">
				下一步
			</view>
		</view>
		<w-picker :visible.sync="visible" mode="date" fields="minute" startYear="2000" value="2020-04-07 10:25"
			:current="true" @confirm="onConfirm($event,'date')" @cancel="visible=false" :disabled-after="true"
			ref="date">
		</w-picker>
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
	</view>
</template>

<script>
	import OrderMixin from './mixin/order.js'
	import pagesHeader from "@/components/pages-header/index.vue"
	import evanFormItem from "@/components/evan-form-item/evan-form-item.vue";
	import evanFrom from "@/components/evan-form/evan-form.vue";
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			pagesHeader,
			evanFrom,
			evanFormItem,
			wPicker
		},
		data() {
			return {
				visible: false,
				labelStyle: {
					"font-size": "28upx",
					"color": "#333",
					"font-weight": "bold"
				},
				brand: 0,
				otherBrand:'',
				totalNum: 0,
				createType: '',
				remarks: '', //备注
				totalPrice: 0, // 商品 总价
				addr: {}, //地址信息
				userInfo: {
					faultDate: '',
					productNo: '',
					description: ''
				},
				rules: {
					faultDate: {
						required: true,
						message: '请选择故障日期'
					},
					productNo: {
						required: true,
						message: '请输入产品编号'
					},
					description: {
						required: true,
						message: '请输入故障描述'
					}
				}
			}
		},
		watch:{
			brand(newvalue){
				if(newvalue==0){
					this.otherBrand='';
				}
			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.$refs.form.setRules(this.rules);
			})
		},
		methods: {
			onConfirm(e) {
				this.userInfo.faultDate = e.result;
				console.log(e)
			},
			//创建订单
			createOrder() {
				this.$util.throttle(() => {
					this.$refs.form.validate(async (result) => {
						if (result) {
							if (!this.addr.id) {
								this.$util.msg('请选择地址');
								return;
							}
							if(this.brand==1 && this.otherBrand==''){
								this.$util.msg('请输入品牌名称');
								return;
							}
							const data = {
								uid: uni.getStorageSync('uid'),
								address: JSON.stringify(this.addr),
								faultDate: this.userInfo.faultDate,
								brand: this.brand==0?'之铂':'',
								otherBrand:this.otherBrand,
								productNo: this.userInfo.productNo,
								description: this.userInfo.description
							}
							const responce = await this.$request('createOrder', data, {
								showLoading: true
							});
							if (responce.code == 0) {
								this.$util.msg('服务单已提交,请耐心等待!');
								this.back();
							} else {
								this.$util.msg(responce.msg)
							}
						}
					})
				})
			},
			//设置收货地址
			setAddress(addr) {
				this.addr = addr;
			}
		}
	}
</script>
<style>
	page {
		background: #F6F6F6;
	}
</style>
<style scoped lang="less">
	.icon-you {
		font-size: 24upx;
	}

	.bindTitle {
		font-size: 24upx;
		color: #999999;
		margin-left: 20upx;
	}

	.labelIcon {
		position: relative;

		image {
			width: 32upx;
			height: 32upx;
		}
	}

	.list-con {
		padding: 0 20upx;
	}

	.pageBg {
		width: 100%;
		height: 372upx;
		background: linear-gradient(#91D0FF, #FFFFFF);
		position: absolute;
		top: 0;
	}

	.pageTopCon {
		width: 710upx;
		background: #FFFFFF;
		box-shadow: 0px 5upx 16upx 0px rgba(217, 217, 217, 0.25);
		border-radius: 15upx;
		position: relative;
		border-radius: 20upx;
	}

	.topCon {
		margin-top: 20upx;
	}

	.pageTitle {
		font-size: 26upx;
		color: #FFFFFF;
		position: absolute;
		top: 0;
		left: 0;
		width: 170upx;
		height: 58upx;
		line-height: 58upx;
		text-align: center;
	}

	.addressBg {
		width: 100%;
		height: 58upx;
	}

	.address-con {
		padding: 40upx 30upx;
	}

	.addressInfo {
		font-size: 24upx;
		color: #666666;
		line-height: 49upx;
		max-width: 500upx;
	}

	.addressLable {
		font-size: 26upx;
		color: #000000;
		line-height: 49upx;
		width: 150upx;
	}

	.btn {
		width: 706upx;
		line-height: 88upx;
		border-radius: 100upx;
		text-align: center;
		background: #6FBEFA;
		font-size: 30upx;
		color: #fff;
		margin: 30upx 0;
	}

	.textarea {
		height: 180upx;
		width: 100%;
		padding: 0 20upx;
	}

	.reg-input {
		width: 100%;
		text-align: right;
		padding:0 20upx;
	}

	.placeClass {
		font-size: 24upx;
		color: #999999;
	}
</style>
