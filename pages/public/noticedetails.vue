<template>
	<view class="">
		<view class="mainCon">
			<jyf-parser :html="content"></jyf-parser>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue"
	import {fromContent} from"@/common/js/util.js"
	export default{
		data(){
			return{
				type:0,
				content:''
			}
		},
		onLoad(options) {
			this.type=options.type;
			this.id=options.id;
			this.setnavTitle(options.title);
			this.loadData();
		},
		methods:{
			async loadData(){
			    const url=this.type==0?'platformNotifyInfo':'userNotifyInfo';
				const data={
					uid: uni.getStorageSync("uid"),
					notifyId:this.id
				}
				const res=await this.$request(url,data,{showLoading:true});
				if(res.code==0){
					
					this.content=fromContent(res.data.content);
				}
			}
		}
	}
</script>

<style scoped>
	.mainCon{
		padding: 20upx;
	}
</style>
