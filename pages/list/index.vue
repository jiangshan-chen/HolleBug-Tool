<!--
 * @Description: 
 * @Version: 
 * @Autor: chenhongbin
 * @Date: 2020-06-20 14:44:06
 * @LastEditors: chenhongbin
 * @LastEditTime: 2020-06-20 14:54:30
--> 
<template>
	<view>
    <u-navbar :is-back="false"  ref="navbar" title="HolleBug" :background="background"></u-navbar>
    <view class="wrap">
      <u-swiper :height="300" :list="list" :effect3d="true" :title="true"></u-swiper>
    </view>
		<u-cell-group>
      <u-cell-item style="border-top: 1rpx solid #e4e7ed;"  title="文本" :arrow="false">
        <view slot="right-icon" style="color: #007AFF;">more</view>
      </u-cell-item>
      <!-- <u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item> -->
    </u-cell-group>
    <view class="text-nav">
      <view class="text-nav-item u-border">
        <image src="https://uviewui.com/common/logo.png"></image>
		<a href="https://v1.alapi.cn/api/mingyan"></a>
        <text>one two</text>
      </view>
      <view class="text-nav-item u-border">
        <image src="https://uviewui.com/common/logo.png"></image>
		<a href="https://v1.alapi.cn/api/new/hanfu?num=10&page&rand&word"></a>
        <text>three four</text>
      </view>
      <view class="text-nav-item u-border">
        <image src="https://uviewui.com/common/logo.png"></image>
		<a href="https://v1.alapi.cn/api/video/jh?url=https://h5.pipix.com/s/uW4KXh/"></a>
        <text>five six</text>
      </view>
      <view class="text-nav-item u-border">
        <image src="https://uviewui.com/common/logo.png"></image>
		<a href="https://v1.alapi.cn/api/bdpwd?url=https://pan.baidu.com/share/init?surl=vlny0C5moLIu97GvBzVw7Q"></a>
        <text>seven eight</text>
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
            image:'https://hollebug.obs.cn-south-1.myhuaweicloud.com/image/resume/avatar-other01.jpg',
            title:'何当共剪西窗烛，却话巴山夜雨时'
          },
          {
            image:'https://hollebug.obs.cn-south-1.myhuaweicloud.com/image/resume/bg_banner02.jpg',
            title:'此情可待成追忆，只是当时已惘然',
          },
          {
            image:'https://hollebug.obs.cn-south-1.myhuaweicloud.com/image/resume/keagan-henman-81up3kkBYgE-unsplash.jpg',
            title:'锦瑟无端五十弦，一弦一柱思华年'
          }
        ]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}
  .text-nav{
    display: flex;
    width: 120%;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    overflow-x: visible;
  }
  .text-nav-item{
    height: 90px;
    width: 90px;
    border-radius: 10px;
    box-shadow: 1 0 0 0 #ccc;
    image{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
