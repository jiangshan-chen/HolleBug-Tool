<template>
	<view>
    <u-navbar :is-back="false"  title="天气预报" :background="background"></u-navbar>
		<h2 class="weather-city">
      {{result.citynm}}
    </h2>
    <view v-for="(c,index) in result.data" :key="index" class="weather-card">
      <view class="weather-card-item">
        <view>{{c.days}}</view>
        <view>{{c.temperature}}</view>
        <view>{{c.week}}</view>
      </view>
      <view class="weather-card-item">
        <image style="width: 16px;height: 16px;" :src="c.weather_icon"></image>
        <view>{{c.weather}}</view>
        <view>{{c.wind}}</view>
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
				result:{}
			}
		},
    onLoad() {
      this.getWeatherInfo()
    },
		methods: {
			getWeatherInfo(){
        this.$u.get('https://api.66mz8.com/api/weather.php',{
          location:'长沙'
        }).then(res=>{
          console.log(res)
          this.result = res
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
.weather-city{
  margin: 20px;
}
.weather-card{
  padding: 20px;
  margin: 20px;
  line-height: 2;
  background-image: linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);
  border-radius: 5px;
}
.weather-card-item{
  display: flex;justify-content: space-around;align-items: center;
  margin: 10px 0;
}
</style>
