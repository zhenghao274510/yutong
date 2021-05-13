<template>
	<view class="">
		<view class="pageContent">
			<jyf-parser :html="content"></jyf-parser>
		</view>
		<mix-loading v-if="isLoading"></mix-loading>
	</view>
</template>

<script>
	import JyfParser from "@/components/jyf-parser/jyf-parser.vue"
	export default{
		components:{
			JyfParser
		},
		data(){
			return{
				content:''
			}
		},
		onLoad() {
			this.loadData();
		},
		methods:{
			async loadData(){
				const res=await this.$request('getAgreement',{type:0},{showLoading:true});
				if(res.code==0){
					this.content=res.data;
				}
			}
		}
	}
</script>
