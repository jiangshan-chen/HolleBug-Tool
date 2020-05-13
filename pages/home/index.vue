<template>
  <view class="home-page">
    <u-navbar :is-back="false" ref="navbar" title="HolleBug" :background="background">
      <view class="slot-wrap">
        <view class="navbar-title" @click="onUserMenu"><u-icon name="list" color="#2979ff" size="35" ></u-icon></view>
      </view>
    </u-navbar>
    <view class="content">
      <!-- 正文内容 -->
      <view class="everyday-card">
        <view class="music-img" @click="onPlay"><image :src="pic_url"></image></view>
        <view class="music-text"> 
          <text>{{ music_name || '暂无歌曲' }}{{ '——' +( music_anthor || '无名') }}</text>
        </view>
        <view class="music-player" >
          <view class="music-progress">
            <text>{{ music.startTime || '00:00'}}</text>
            <view style="flex: 1;">
              <u-slider style="width: 100%;" :block-width="15" v-model="progress" max="100" ref="progress" @start="onStartSider" @moving="onMovingSider" @end="onEndSider"></u-slider>
            </view>
            <!-- <u-line-progress :show-percent="false" inactive-color="#ccc" :height="6" :percent="progress" :striped-active="true"></u-line-progress> -->
            <text>{{ music.endTime || '00:00' }}</text>
          </view>
          <!-- <audio controls :src="music_url"></audio> -->
        </view>
        <view class="music-action">
          <u-icon name="skip-back-left" :size="45" @click="getMusicInfo"></u-icon>
          <u-icon v-show="player" name="pause-circle-fill" @click="onPause" :size="90"></u-icon>
          <u-icon v-show="!player" name="play-circle-fill" @click="onPlay" :size="90"></u-icon>
          <u-icon name="skip-forward-right" :size="45" @click="getMusicInfo"></u-icon>
        </view>
        <view class="music-action-more">
          <u-icon name="reload" :size="45" @click="getMusicInfo"></u-icon>
          <u-icon name="list" :size="45" @click="getMusicInfo"></u-icon>
        </view>
      </view>
    </view>
    <!-- 抽屉 -->
    <u-popup v-model="show" length="50%">
      <u-navbar :is-back="false">
      </u-navbar>
      <u-cell-group>
        <u-cell-item :use-label-slot="true" :arrow="false">
          <view slot="label"><u-avatar :src="src" size="large"></u-avatar></view>
        </u-cell-item>
        <u-cell-item icon="setting-fill" title="个人设置" @click="onPause"></u-cell-item>
        <u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
        <u-cell-item icon="setting-fill" title="个人设置"></u-cell-item>
        <u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
      </u-cell-group>
    </u-popup>
  </view>
</template>

<script>
const innerAudioContext = uni.createInnerAudioContext();
export default {
  data() {
    return {
      show: false,
      src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
      background: {
        backgroundImage: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)'
      },
      pic_url: '',
      music_url: '',
      music_name: '',
      music_anthor: '',
      music_run:false,
      music: {
        startTime: '',
        endTime: ''
      },
      progress:0,
      player:false,
      NAVBAR_HEIGHT:44,
      sider_run:true
    };
  },
  computed:{
    duration () {
      return innerAudioContext.duration
    }
  },
  onLoad() {
    innerAudioContext.autoplay = true;
    this.getMusicInfo()
    innerAudioContext.onTimeUpdate((e)=>{//监听播放中
      this.music_run = true
      this.music.startTime = this.formatTime(innerAudioContext.currentTime)
      this.music.endTime = this.formatTime(innerAudioContext.duration || 0);
      this.sider_run ? this.progress = parseInt(innerAudioContext.currentTime/innerAudioContext.duration * 100) :''
      // this.$refs.progress.start()
    })
    innerAudioContext.onCanplay((e)=>{//音频准备就绪
      this.music_run ? this.player = true :''
      this.music.startTime = this.formatTime(innerAudioContext.currentTime)
      this.music.endTime = this.formatTime(innerAudioContext.duration || 0);
    })
    innerAudioContext.onError((e)=>{//播放异常
      this.player = false
    })
    innerAudioContext.onEnded((e)=>{//自然播放结束
      this.getMusicInfo()
    })
    // this.onPlay()
  },
  mounted() {
    // console.log(this.$refs.navbar)
  },
  methods: {
    getMusicInfo(){//获取音乐
      this.$u.get('https://api.uomg.com/api/rand.music', {
        format: 'json',
        sort: '热歌榜'
      })
      .then(res => {
        console.log(res);
        this.pic_url = res.data.picurl;
        this.music_url = res.data.url;
        this.music_name = res.data.name;
        this.music_anthor = res.data.artistsname;
        innerAudioContext.src = res.data.url;
        this.$nextTick(() =>{
          this.music.startTime = this.formatTime(innerAudioContext.currentTime)
          this.music.endTime = this.formatTime(innerAudioContext.duration || 0);
        })
        // setTimeout(() => {
          
        // }, 500);
      });
    },
    onStartSider(){//开始滑动
      console.log('开始滑动')
      this.sider_run = false
      this.onStop()
      this.$nextTick(() =>{
        innerAudioContext.seek(parseInt(this.duration * this.progress/100))
        this.onPlay()
      })
      console.log(innerAudioContext)
    },
    onMovingSider(){//滑动中
      console.log("滑动中")
      innerAudioContext.startTime = innerAudioContext.duration * this.progress/100
    },
    onEndSider(){//停止滑动
      console.log("停止滑动")
      innerAudioContext.startTime = innerAudioContext.duration * this.progress/100
      this.sider_run = true
    },
    onUserMenu() {
      this.show = true;
    },
    onPlay() {//播放音乐
      console.log('播放');
      // innerAudioContext.src = this.music_url;
      innerAudioContext.play()
      this.player = true
    },
    onPause(){//暂停播放音乐
      console.log('暂停')
      innerAudioContext.pause();
      this.player = false
    },
    onStop(){//停止播放音乐
      console.log('stop')
      innerAudioContext.stop()
    },
    formatTime(timer) {//格式化音乐时间
      if (timer === 0 || typeof timer !== 'number') {
        return '00:00';
      }
      let mm = Math.floor(timer / 60);
      let ss = Math.floor(timer % 60);
      if (mm < 10) {
        mm = '0' + mm;
      }
      if (ss < 10) {
        ss = '0' + ss;
      }
      return mm + ':' + ss;
    }
  },
  beforeRouteLeave() {
    innerAudioContext.destroy()
  }
};
</script>

<style lang="scss">
.navbar-title {
  display: flex;
  align-items: center;
  padding: 0 15px;
  position: relative;
}
.content {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #323232 0%, #3f3f3f 40%, #1c1c1c 150%), linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.25) 200%);
  background-blend-mode: multiply;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.everyday-card {
  object-fit: cover;
  margin: 20px;
  background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
  border-radius: 10px;
  padding: 20px 55px;
  text-align: center;
}
.music-img{
  margin: 20px 35px;
}
.music-img image {
  width: 160px;
  height: 160px;
  border-radius: 50%;
}
.music-text {
  text-align: center;
  margin: 20px;
}
.music-player {
  .music-progress{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text{
      margin: auto 5px;
    }
  }
}
.music-action{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
}
.music-action-more{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}
</style>
