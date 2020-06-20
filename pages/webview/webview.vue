<template>
	<view>
		<u-navbar ref="navbar" title="热榜新闻" :background="background"></u-navbar>
		<web-view :webview-styles="{marginTop:marginTop+'px'}" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)'
				},
				url:'',
				marginTop:0
			}
		},
		onLoad(e){
			this.url = e.url
		},
		mounted(){
			console.log(this.$refs.navbar)
			this.marginTop = this.$refs.navbar.navbarHeight
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
