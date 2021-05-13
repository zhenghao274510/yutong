export default{
	data(){
		return{
			curData:{},
		}
	},
	methods: {
		//确认对话框点击确定触发
		onModalConfirm(){
			//根据弹出对话框时定义的modalConfirmFn决定执行事件
			this.$util.throttle(async ()=>{
				this[this.modalConfirmFn]();
			})
		},
		//   再来一单
		repetOrder(data){
			this.modalText = '您是否确定要再来一单?';
			this.modalConfirmFn = 'repetOrderConfirm';
			this.curData = data;
			this.$refs.mixModal.open();
			
		},
		repetOrderConfirm(){
			let goods=this.curData.goods,num=0;
			goods.forEach(item=>{
				if(item.goodsState==1){
					num++
					this.$util.msg(`商品${item.goodsName}已下架`);
					return
				}
				item.goodsPrice=item.xianjia
			})
			if(num>0){
				return
			}
			uni.redirectTo({
				url:'/pages/order/createOrder?type=repet&goods=' +encodeURIComponent(JSON.stringify(goods))+'&id='+this.curData.orderNumber
			})
		},
		paymoney(data) {
			uni.requestPayment({
				provider: data.provider,
				orderInfo:data.provider=='wxpay'?JSON.stringify(data.config):data.config, //微信、支付宝订单数据
				success(res) {
					console.log('success:' + JSON.stringify(res))
					uni.navigateBack();
				},
				fail(err) {
					console.log(data)
					console.log('fail:' + JSON.stringify(err))
				},
				complete(err) {
					console.log('fail:' + JSON.stringify(err))
				}
			})
		},
		//支付订单
		async pay(data){
			const res=await this.$request('wxpay',data,{showLoading:true});
			if(res.result==0){
				data.type==1?uni.redirectTo({
					url:"/pages/order/waiteing"
				}):
				uni.redirectTo({
					url:"/pages/order/paysuccess"
				})
			}else{
				this.$util.msg(res.resultNote)
			}
		},
		//取消订单弹窗确认
		cancelOrder(data){
			console.log(data)
			data.uid=uni.getStorageSync('uid');
			this.modalText = '您是否确定要取消订单';
			this.modalConfirmFn = 'cancelOrderConfirm';
			this.curData = data;
			this.$refs.mixModal.open();
		},
		//取消订单提交
		async cancelOrderConfirm(){
			const res = await this.$request('cancelOrder',this.curData, {showLoading: true})
			if(res.result ==0){
				this.userComPage()
			}
		},
		//申请退款提交
		 refund(data){
			this.$util.throttle(async ()=>{
				const res = await this.$request('order/orderRefundApply', {
					reason:data.reason,
					reasonId:data.reasonId,
					uid:uni.getStorageSync('uid'),
					itemId: data.itemId
				}, {showLoading: true})
				this.log(res);
				if(res.result==0){
					this.$util.msg('提交成功!');
					uni.navigateBack()
				}
			})
		},
		//确认收货 弹窗确认
		confirmReceipt(data){
			this.modalText = '请确保您已收到商品，并检查无损后再确认收货';
			this.modalConfirmFn = 'confirmReceiptConfirm';
			this.curData = data;
			console.log(this.curData)
			this.$refs.mixModal.open();
		},
		//取消退款 弹窗确认
		confirmReplay(data){
			this.modalText = '确认取消吗?';
			this.modalConfirmFn = 'confirmReplayConfirm';
			this.curData = data;
			this.$refs.mixModal.open();
		},
		confirmaddCart(data){
			this.modalText = '确认加入购物车吗?';
			this.modalConfirmFn = 'confirmaddCartConfirm';
			this.curData = data;
			this.$refs.mixModal.open();
		},
		async confirmaddCartConfirm(){
			const data={
				uid:uni.getStorageSync('uid'),
				orderNumber:this.curData.id
			}
			const res=await this.$request('order/orderAddShopcar',data);
			this.$util.msg(res.resultNote);
			if(res.result==0){
				this.$util.msg('添加成功')
			}
		},
		async confirmReplayConfirm(){
			const data={
				uid:uni.getStorageSync('uid'),
				orderNumber:this.curData.id
			}
			const res=await this.$request('order/cancelOrderRefund',data);
			this.$util.msg(res.resultNote);
			if(res.result==0){
				this.userComPage()
			}
		},
		userComPage(){
			if(this.curData.type=='list'){
				this.refresh();
			}else{
				uni.navigateBack()
			}
		},
		//  确认收货
		async confirmReceiptConfirm(){
				const data={
					uid:uni.getStorageSync('uid'),
					orderNumber:this.curData.id
				}
				const res=await this.$request('order/querenShouhuo',data);
				this.$util.msg(res.resultNote);
				if(res.result==0){
					this.userComPage()
				}
		}
	}
}









