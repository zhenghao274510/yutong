<template>
	<view class="">
		<view class="main-wrap" :class="{show:loaded}">
			<view class="list-con">
				<view class="evaConTitle">三、费用信息</view>
				<!-- 工时信息 -->
				<view class="evaConTitle tag">1、工时信息</view>
				<view class="">
					<block v-for="(item, index) in orderInfo.maintenanceList" :key="index">
						<view class="row b-b timeCon">
							<view class="itemLabel">维修代码：</view>
							<input type="text" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="item.maintenanceCode" />
							<!-- <view class="close-btn row center" @click="onClick(index, 0)" v-if="index != 0">
								<view class="mix-icon icon-close"></view></view> -->
						</view>
						<view class="itemLabel">作业内容：</view>
						<textarea value="" disabled="true" placeholder="多行输入~" v-model="item.content" placeholder-class="placeholder" class="textarea" />
						<view class="row b-b timeCon">
							<view class="itemLabel">工时：</view>
							<input type="text" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="item.manHour" />
						</view>
						<view class="itemLabel">备注：</view>
						<textarea value="" disabled="true" placeholder="多行输入~" v-model="item.remark" placeholder-class="placeholder" class="textarea" />
					</block>
				</view>
				<!-- <view class="addbtn" @click="masterAddSome(0)">追加信息 +</view> -->
				<!-- 工时信息 -->
			
				<!-- 更换配件 -->
				<view class="evaConTitle tag">2、更换配件</view>
				<view class="">
					<block v-for="(parment, parmentIndex) in orderInfo.partsList" :key="parmentIndex">
						<view class="row b-b timeCon">
							<view class="itemLabel">配件（材料）名称：</view>
							<input type="text" class="reg-input fill" disabled="true" placeholder-class="placeholder" v-model="parment.parts" />
							<!-- <view class="close-btn row center" @click="onClick(parmentIndex, 1)" v-if="parmentIndex != 0">
								<view class="mix-icon icon-close"></view></view> -->
						</view>
						<view class="row b-b timeCon">
							<view class="itemLabel">型号：</view>
							<input type="text" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="parment.model" />
						</view>
						<view class="row b-b timeCon">
							<view class="itemLabel">数量：</view>
							<input type="text" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="parment.quantity" />
						</view>
						<view class="row" v-for="(item, index) in parment.souceList" :key="index">
							<view class="" style="width: 100upx;">{{ item.title }}</view>
							<view class="row fill">
								<view class="row itemCon" v-for="(v, k) in item.answer" :key="k">
									<view class="row">
										<view class="labelIcon">
											<image src="/static/img/active.png" mode="" v-if="parment.source == k"></image>
											<image src="/static/img/xuanz.png" mode="" v-else></image>
										</view>
										<view class="bindTitle">{{ v.label }}</view>
									</view>
								</view>
							</view>
						</view>
					</block>
					<!-- <view class="addbtn" @click="masterAddSome(1)">追加信息 +</view> -->
				</view>
				<!-- 更换配件 -->
			
				<view class="evaConTitle">3、外出信息</view>
				<view class="">
					<view class="row b-b timeCon">
						<view class="itemLabel">外出路线：</view>
						<input type="text" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="orderInfo.path" />
					</view>
					<view class="row b-b timeCon">
						<view class="itemLabel">乘车费用：</view>
						<input type="number" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="orderInfo.fare" />
					</view>
					<view class="row b-b timeCon">
						<view class="itemLabel">路程距离（自驾）：</view>
						<input type="text" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="orderInfo.distance" />
					</view>
					<view class="row b-b timeCon">
						<view class="itemLabel">出车费（自驾）：</view>
						<input type="text" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="orderInfo.outFare" />
					</view>
					<view class="row b-b timeCon">
						<view class="itemLabel">差旅费（食宿）：</view>
						<input type="number" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="orderInfo.travelExpense" />
					</view>
					<view class="row b-b timeCon">
						<view class="row b-b timeCon">
							<view class="itemLabel">工时费：</view>
							<input type="number" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="orderInfo.manHourCost" />
						</view>
						<view class="row b-b timeCon">
							<view class="itemLabel">材料费：</view>
							<input type="number" disabled="true" class="reg-input fill" placeholder-class="placeholder" v-model="orderInfo.materialsExpenses" />
						</view>
					</view>
				</view>
				<view class="evaConTitle">其他</view>
				<view class="">
					<view class="row b-b timeCon">
						<view class="row b-b timeCon">
							<view class="itemLabel">高处作业费：</view>
							<input type="number" disabled="true" class="reg-input fill" placeholder-class="placeholder" 
							v-model="orderInfo.heightHoney" />
						</view>
						<view class="row b-b timeCon">
							<view class="itemLabel">运输费：</view>
							<input type="number" disabled="true" class="reg-input fill" placeholder-class="placeholder" 
							v-model="orderInfo.trafficExpense" />
						</view>
					</view>
					<view class="row b-b timeCon">
						<view class="itemLabel">费用总计：</view>
						<input type="number" disabled="true" class="reg-input fill" placeholder-class="placeholder" 
						v-model="orderInfo.totalCost" />
					</view>
				</view>
			</view>
			
			<view class="evaCon">
				<view class="list-con">
					<view class="evaConTitle">工单类型：</view>
					<view class="row" v-for="(item, index) in orderList" :key="index">
						<view class="row itemCon" v-for="(v, k) in item.answer" :key="k">
							<view class="row">
								<view class="labelIcon">
									<image src="/static/img/active.png" mode="" v-if="orderInfo.orderType == k"></image>
									<image src="/static/img/xuanz.png" mode="" v-else></image>
								</view>
								<view class="bindTitle">{{ v.label }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="btnCon row center"><view class="btn" hover-class="hover-opacity" @click="back">完成（3/3）</view></view>
		</view>
		

		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
	</view>
</template>

<script>
const maintenanceList = require("./components/maintenance.js");
import mixUploadImage from "@/components/mix-upload-image/mix-upload-image.vue";
import mixModal from "@/components/mix-modal/mix-modal.vue";
export default {
	components: {
		mixModal,
		mixUploadImage
	},
	data() {
		return {
			orderList: [],
			souceList: [],
			activeIndex: 0,
			type: 0,
			orderInfo: {
				maintenanceList: [{maintenanceCode: "", content: "", manHour: "", remark: ""}],
				partsList: [{parts: "", model: "", quantity: "", source: "0"}],
				path: "", //路线
				fare: "", //乘车费用
				distance: "", //距离
				outFare: "", //	出车费
				travelExpense: "", //	差旅费
				manHourCost: "", //	工时费
				materialsExpenses: "", //	材料费
				heightHoney: "", //	高空作业费
				trafficExpense: "", //运输费
				totalCost: "", //总费用
				orderType: "0" //工单类型0.报修1.有偿
			}
		};
	},
	onLoad(options) {
		this.orderList = maintenanceList.orderList;
		if (options.orderId) {
			this.orderId = options.orderId;
			this.getOrderInfo();
		}
	},
	methods: {
		async getOrderInfo() {
			const res = await this.$request("returnCostInfo", {orderId: this.orderId}, {showLoading: true});
			if (res.code == 0) {
				console.log(JSON.parse(res.data.maintenanceList))
				// JSON.parse(res.data.maintenanceList)
				res.data.maintenanceList= JSON.parse(res.data.maintenanceList);
				res.data.partsList= JSON.parse(res.data.partsList);
					console.log(res.data)
				res.data.partsList.forEach(item => {
					let souceList = maintenanceList.souceList;
					souceList[0].source = item.source;
					item.souceList = souceList;
				});
			console.log(res.data)
				this.orderInfo = res.data;
			} else {
				this.$util.msg(res.msg);
			}
		}
	}
};
</script>
<style scoped lang="less">
.tag {
	padding-left: 20upx;
}
.tag::before {
	content: "*";
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	color: red;
}
.addbtn {
	font-size: 26upx;
	font-weight: bold;
	color: #fe7578;
	line-height: 100upx;
}
.itemLabel {
	font-size: 24upx;
	color: #666666;
	line-height: 80upx;
}

.textarea {
	width: 706upx;
	height: 241upx;
	background: #fafafa;
	border: 1px solid rgba(228, 228, 228, 0.45);
	border-radius: 10upx;
	padding: 20upx;
	margin-bottom: 20upx;
}

.placeholder {
	font-size: 24upx;
	color: #999999;
}

.reg-input {
	font-size: 24upx;
	color: #999999;
	padding-left: 10upx;
}

.timeCon {
	font-size: 26upx;
	color: #333333;
	line-height: 80upx;
	position: relative;
}
.close-btn {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 100upx;
	height: 100upx;
	z-index: 99;
}

.btnCon {
	width: 100%;
	margin: 30upx 0;

	.btn {
		width: 706upx;
		height: 88upx;
		background: #fe7578;
		font-size: 30upx;
		color: #ffffff;
		line-height: 88upx;
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
	line-height: 80upx;
	font-weight: bold;
	position: relative;
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
	padding: 20upx 0;
}
</style>
