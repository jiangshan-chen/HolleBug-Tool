<template>
	<view>
		<u-navbar ref="navbar" :is-back="false" title="热榜新闻" :background="background"></u-navbar>
		<view class="tabbar" ref="tabbar">
			<!-- <u-tabs :list="list" ref="tabs" :is-scroll="false" :current="current" @change="onTabClick"></u-tabs> -->
			<u-tabs-swiper :gutter="50" ref="tabs" :list="list"  :current="current" @change="onTabClick"></u-tabs-swiper>
			<swiper
				ref="swiper"
				:current="swiperCurrent"
				:style="{ height: swiperHeight + 'px' }"
				@change="onSwiperChange"
				@transition="transition"
				@animationfinish="animationfinish"
				id="swiper"
			>
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y :style="{ height: swiperHeight + 'px', width: '100%' }" @scrolltolower="onreachBottom">
						<!-- <view v-if="current != 0">{{ item.name }}</view> -->
						<view >
							<view v-for="(data, i) in dataList[item.type] || result.list" :key="i"><zhihu :item="data" :index="index + 1"></zhihu></view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import zhihu from '../../pages/news/zhihu.vue';
export default {
	components: { zhihu },
	data() {
		return {
			background: {
				backgroundImage: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)'
			},
			list: [
				{ name: '知乎', type: 'zhihu' },
				{ name: '哔哩哔哩', type: 'bilibili' },
				{ name: 'CSDN', type: 'csdn' },
				{ name: '抖音', type: 'douyin' },
				{ name: '掘金', type: 'juejin ' },
				{ name: '吾爱', type: '52pojie' },
				{ name: '今日历史', type: 'history' },
				{ name: '少数派', type: 'sspai' },
				{ name: '微博', type: 'weibo' },
				{ name: '微信', type: 'weixin' },
				{ name: '百度', type: 'baidu' },
				{ name: '今日头条', type: 'toutiao' }
			],
			dataList:{},
			result: {},
			current: 0,
			swiperHeight: '300rpx'
		};
	},
	onLoad() {
		this.getNewsInfo();
	},
	mounted() {
		var windowHeight = 0
		var top = 0
		uni.getSystemInfo({
			success: (res) => { windowHeight = res.screenHeight }
		});
		const query = uni.createSelectorQuery().in(this);
		query.select('#swiper').boundingClientRect(data => {
		  top = data.top
		}).exec();
		this.swiperHeight = windowHeight - top;
	},
	computed: {
		swiperCurrent() {
			return this.current;
		}
	},
	methods: {
		getNewsInfo() {
			this.$u
				.get('https://v1.alapi.cn/api/tophub/get', {
					type: this.list[this.current].type
				})
				.then(res => {
					console.log(res);
					this.result = res.data;
					this.dataList[this.list[this.current].type] = res.data.list
				});
		},
		onTabClick(index) {
			//选项卡点击
			console.log('当前选中位置', index);
			this.$refs.tabs.setFinishCurrent(index);
			this.current = index;
			this.getNewsInfo();
		},
		onSwiperChange(e) {
			//标签滚动
			console.log(e, '内容滚动');
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.tabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.tabs.setFinishCurrent(current);
			this.current = current;
			this.getNewsInfo();
		},
		onreachBottom() {}
	}
};
</script>

<style lang="scss" scoped>
.tabbar {
	border-bottom: 1rpx solid #ccc;
}
</style>
