<template>
	<view class="">
		<nyn-city-list @getCity="getCity"></nyn-city-list>
	</view>
</template>

<script>
	import nynCityList from "@/components/bazaar-city_list/index.vue"
	export default {
		components: {
			nynCityList
		},
		data() {
			return {

			}
		},
		methods: {
			getCity(city) {
               this.$util.prePage().city=city;
			   this.back();
			}
		}
	}
</script>

<style>
</style>
