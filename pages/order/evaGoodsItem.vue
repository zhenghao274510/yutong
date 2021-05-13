<template>
	<view class="">
		<repair-header :address="dataobject.address"></repair-header>
		<view class="evaCon">
			<view class="list-con">
				<view class="evaConTitle">评价</view>
				<block v-for="(item, index) in dataList" :key="index">
					<view class="">{{ item.title }}</view>
					<view class="row">
						<view class="row itemCon" v-for="(v, k) in item.answer" :key="k">
							<view class="row" @click="userClick(item, k)">
								<view class="labelIcon">
									<image src="/static/img/active.png" mode="" v-if="item.brand == k"></image>
									<image src="/static/img/xuanz.png" mode="" v-else></image>
								</view>
								<view class="bindTitle">{{ v.label }}</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>

		<view class="btnCon row center"><view class="btn" hover-class="hover-opacity" @click="createOrder">提交</view></view>

		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
	</view>
</template>

<script>
import repairHeader from './components/repair-header.vue';
const evaList = require('./components/maintenance.js');
export default {
	components: {
		repairHeader
	},
	data() {
		return {
			dataList: [],
			dataobject:{},
			orderId:''
		};
	},
	onLoad(options) {
		this.orderId=options.orderId;
		this.dataList = evaList.ordermaintenance;
		this.loadOrderData();
	},
	methods: {
		userClick(item, index) {
			item.brand = index;
		},
		//创建订单
		createOrder() {
			this.$util.throttle(async () => {
				let bePresent,onceSolve,solve,score,satisfaction;
				this.dataList.forEach((item,index)=>{
					index==0?bePresent=item.brand:index==1?onceSolve=item.brand:index==2?solve=item.brand:index==3?score=Number(item.brand)+1:satisfaction=item.brand 
				})
				let  data={
					orderId:this.orderId,
					uid:uni.getStorageSync('uid'),
					bePresent,
					onceSolve,
					solve,
					score,
					satisfaction
				}
				console.log(data)
				const res = await this.$request('evaluateOrder',data,{showLoading:true});
				if(res.code==0){
					this.$util.msg('提交成功!');
					this.back();
				}else{
					this.$util.msg(res.msg)
				}
			});
		},
		async loadOrderData() {
			const res = await this.$request("orderInfo", {orderId: this.orderId}, {showLoading: true});
			if (res.code == 0) {
				res.data.address = JSON.parse(res.data.address);
				this.dataobject = res.data;
			} else {
				this.$util.msg(res.msg);
			}
		},
	}
};
</script>
<style scoped lang="less">
.btnCon {
	position: fixed;
	bottom: 60upx;
	width: 100%;

	.btn {
		width: 706upx;
		height: 88upx;
		background: #fe7578;
		font-size: 30upx;
		color: #ffffff;
		line-height: 80upx;
		text-align: center;
		border-radius: 40upx;
	}
}

.bindTitle {
	font-size: 24upx;
	color: #999999;
	margin-left: 20upx;
}

.evaConTitle {
	padding: 30upx 0;
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

.itemCon {
	width: 20%;
	padding: 30upx 0;
}
</style>
