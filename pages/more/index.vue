<template>
	<view>
    <u-navbar :is-back="false"  title="更多" :background="background"></u-navbar>
    <view class="more-item" v-for="(m,index) in list" :key="index" @click="onSkip(m.path)">
      <view>
        {{m.name}}
      </view>
      <view>
        <u-icon name="more-dot-fill" :size="35"></u-icon>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        background: {
          backgroundImage: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)'
        },
				list:[
          {
            name:'查询天气',
            path:'weather'
          },
          {
            name:'每日壁纸',
            url:'https://api.asilu.com/bg/',
            path:'wallpaper'
          },
          {
            name:'热榜新闻',
            path:'news'
          }
        ]
			}
		},
		methods: {
			onSkip(url){
        uni.navigateTo({
            url: '/pages/' + url +'/index'
        });
      }
		}
	}
</script>

<style lang="scss" scoped>
.more-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 20px;
  border-radius: 5px;
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}
</style>
