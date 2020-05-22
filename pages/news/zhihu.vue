<template>
	<view class="zhihu" @click="onSkip(item.link)">
		<view class="zhihu-ranking">{{index}}</view>
		<view class="zhihu-content">
			<view class="zhihu-title">{{item.title}}</view>
			<view class="zhihu-heat">{{item.other}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object
			},
			index:{
				type:Number
			}
		},
		data() {
			return {
				show:false
			}
		},
		methods: {
			onSkip(link){
				uni.navigateTo({
					 url: `/pages/webview/webview?url=${link}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.zhihu{
	display: flex;
	padding: 10px;
	border-bottom: 1rpx solid #ccc;
	.zhihu-ranking{
		font-size: 16px;
		font-weight: bold;
		color: orange;
		margin: 0 10px;
	}
	.zhihu-title{
		font-size: 16px;
		font-weight: bold;
		color: black;
	}
	.zhihu-heat{
		color: #ccc;
	}
}
</style>
