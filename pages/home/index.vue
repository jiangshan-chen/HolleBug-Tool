<template>
	<view class="home-page">
		<u-navbar :is-back="false" ref="navbar" title="HolleBug" :background="background">
			<view class="slot-wrap">
				<view class="navbar-title" @click="onUserMenu"><u-icon name="list" color="#2979ff" size="35"></u-icon></view>
			</view>
		</u-navbar>
		<view class="content" id="content" :style="{height: content_height + 'px'}">
			<!-- 正文内容 -->
			<view class="everyday-card" >
				<view class="music-img" @click="onPlay"><image :src="music.pic_url"></image></view>
				<view class="music-text">
					<text>{{ music.name || '暂无歌曲' }}{{ '——' + (music.anthor || '无名') }}</text>
				</view>
				<view class="music-player">
					<view class="music-progress">
						<text>{{ music.startTime || '00:00' }}</text>
						<view style="flex: 1;"><u-slider style="width: 100%;" :block-width="15" v-model="progress" max="100" ref="progress" @start="onStartSider"></u-slider></view>
						<!-- <u-line-progress :show-percent="false" inactive-color="#ccc" :height="6" :percent="progress" :striped-active="true"></u-line-progress> -->
						<text>{{ music.endTime || '00:00' }}</text>
					</view>
					<!-- <audio controls :src="music_url"></audio> -->
				</view>
				<view class="music-action">
					<u-icon name="skip-back-left" :size="45" @click="onPrevious"></u-icon>
					<u-icon v-if="player == true" name="pause-circle-fill" @click="onPause" :size="90"></u-icon>
					<u-icon v-if="player == false" name="play-circle-fill" @click="onPlay" :size="90"></u-icon>
					<u-icon name="skip-forward-right" :size="45" @click="getMusicInfo"></u-icon>
				</view>
				<view class="music-action-more">
					<u-icon name="reload" :size="45" @click="getMusicInfo"></u-icon>
					<u-icon name="more-circle" :size="45" @click="getMoreAction"></u-icon>
					<u-icon name="list" :size="45" @click="getMusicInfo"></u-icon>
				</view>
			</view>
		</view>
		<!-- 抽屉 -->
		<u-popup v-model="show" length="50%">
			<u-navbar :is-back="false"></u-navbar>
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
		<!-- 操作菜单 -->
		<u-action-sheet :list="actionList" @click="onAction" v-model="actionShow"></u-action-sheet>
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
			type:'热歌榜',
			music_run: false,
			music:{
				pic_url:'',
				url:'',
				name:'',
				anthor:'',
				startTime: 0,
				endTime: 0
			},
			progress: 0,
			player: false,
			NAVBAR_HEIGHT: 44,
			sider_run: true,
			actionList:[{text:'热歌榜'},
			{text:'新歌榜'},
			{text:'飙升榜'},
			{text:'抖音榜'},
			{text:'电音榜'}],
			actionShow:false,
			content_height:0
		};
	},
	computed: {
		duration() {
			return innerAudioContext.duration;
		}
	},
	onLoad() {
		// innerAudioContext.autoplay = true;
		this.getMusicInfo();
		innerAudioContext.onPlay(e=>{this.player = true})
		innerAudioContext.onPause(e=>{this.player = false})
		innerAudioContext.onStop(e=>{this.player = false})
		innerAudioContext.onTimeUpdate(e => {
			//监听播放中
			this.music.startTime = this.formatTime(innerAudioContext.currentTime);
			this.music.endTime = this.formatTime(innerAudioContext.duration || 0);
			this.sider_run ? (this.progress = parseInt((innerAudioContext.currentTime / innerAudioContext.duration) * 100)) : '';
		});
		innerAudioContext.onCanplay(e => {
			//音频准备就绪
			this.music.startTime = this.formatTime(innerAudioContext.currentTime);
			this.music.endTime = this.formatTime(innerAudioContext.duration || 0);
		});
		innerAudioContext.onError(e => {
			//播放异常
			this.player = false;
			this.getMusicInfo();
		});
		innerAudioContext.onEnded(e => {
			//自然播放结束
			this.getMusicInfo();
		});
		innerAudioContext.onSeeking(e => {
			console.log('seeking');
		});
		innerAudioContext.onSeeked(e => {
			console.log('seeked');
			this.$nextTick(() => {
				this.sider_run = true;
				this.onPlay();
			});
		});
	},
	watch: {
		progress: function(val) {
			!this.sider_run && innerAudioContext.seek(parseInt((this.duration * val) / 100));
		}
	},
	mounted() {
		var window_height = 0 
		uni.getSystemInfo({
			success: (res) => { window_height= res.screenHeight }
		});
		const query = uni.createSelectorQuery().in(this);
		query.select('#content').boundingClientRect(data => {
			 this.content_height = window_height - data.top - 50
		}).exec();
		this.setLastMusic()
	},
	methods: {
		setLastMusic(val){
			let array = this.getLastMusic()
			if(val) array.push(val)	
			uni.setStorage({key: 'music',data: val ? array : []});
		},
		getLastMusic(){
			let data = uni.getStorageSync('music');
			return data
		},
		getMusicInfo() {
			//获取音乐
			this.$u
				.get('https://api.uomg.com/api/rand.music', {
					format: 'json',
					sort: this.type
				})
				.then(res => {
					console.log(res);
					this.music.pic_url = res.data.picurl;
					this.music.url = res.data.url;
					this.music.name = res.data.name;
					this.music.anthor = res.data.artistsname;
					this.setLastMusic(this.music)
					this.onPlan()
				});
		},
		/** 准备音乐 **/
		onPlan(){
			innerAudioContext.src = this.music.url;
			this.$nextTick(() => {
				this.music.startTime = this.formatTime(innerAudioContext.currentTime);
				this.music.endTime = this.formatTime(innerAudioContext.duration || 0);
			});
		},
		/** 上一首 **/
		onPrevious(){
			let music = this.getLastMusic()
			let index = 0;
			music.forEach((item,i) =>  {
				if(item.url == this.music.url) index =  i
			})
			index = index == 0 ? music.length - 1 : index-1
			this.music = music[index]
			this.onPlan()
			this.onPlay()
		},
		/** 开始滑动 **/
		onStartSider() {
			//开始滑动
			console.log('开始滑动');
			this.sider_run = false;
			this.onStop();
		},
		/** 点击顶部列表按钮 **/
		onUserMenu() {
			this.show = true;
		},
		onPlay() {
			//播放音乐
			console.log('播放');
			innerAudioContext.play();
		},
		onPause() {
			//暂停播放音乐
			console.log('暂停');
			innerAudioContext.pause();
		},
		onStop() {
			//停止播放音乐
			console.log('stop');
			innerAudioContext.stop();
		},
		/** 更多操作 **/
		getMoreAction(){
			this.actionShow = true
		},
		/** 选择歌曲类型 **/
		onAction(res){
			this.type = this.actionList[res].text
			this.getMusicInfo()
		},
		formatTime(timer) {
			//格式化音乐时间
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
	// position: absolute;
	// bottom: 0;
	// width: 100%;
	// height: 100%;
	// overflow: hidden;
	background: linear-gradient(to bottom, #323232 0%, #3f3f3f 40%, #1c1c1c 150%), linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.25) 200%);
	background-blend-mode: multiply;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
}
.everyday-card {
	object-fit: cover;
	background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
	padding: 25px;
	border-radius: 10px;
	text-align: center;
}
.music-img {
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
	.music-progress {
		display: flex;
		justify-content: space-around;
		align-items: center;
		text {
			margin: auto 5px;
		}
	}
}
.music-action {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 10px;
}
.music-action-more {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px;
}
</style>
