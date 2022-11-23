<template>
	<view class="pla">
		<view class="img">
			<image :src="poster" mode=""></image>
			<view class="info">
				<text>{{author}}</text><text>{{name}}</text>
			</view>
		</view>
		<view class="geci">
			<view class="ax">
				<view class="gundong" :style="{top:scrollTop+'px'}">
					<text v-for="item in lyric">{{item}}</text>
					<text v-show="isShow">暂无歌词</text>
				</view>
			</view>

		</view>

		<view class="player">
			<text class="iconfont icon-shangyishou" @click="throttle(prev)"></text>
			<text class="iconfont sec" :class="altitutde" @click="play"></text>
			<text class="iconfont icon-xiayishou" @click="throttle(next)"></text>
		</view>
	</view>
</template>

<script>
	import {
		getMusicUrl,
		musicDetialInfo,
		similarMusic,
		getlyric
	} from '../../network/public.js';
	import {
		keySearch,
	} from '../../network/serch.js';
	import {
		lyric
	} from '../../utils/index.js'
	import {
		throttle
	} from '../../utils/index.js';
	export default {
		data() {
			return {
				id: '',
				from: '',
				keyword: '',
				author: '',
				name: '',
				url: '',
				poster: '',
				lyric: [],
				time: [],
				playList: [],
				index: 0,
				altitutde: 'icon-zanting',
				isShow: false,
				scrollTop: 0,
				isPlay: true
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.from = options.from;
			if (this.from === 'search') {
				this.keyword = options.keyword;
			}
			this.getInfo(this.id);
		},
		onUnload() {
			//返回其他页面,需要保存当前歌曲信息
			let id = this.id;
			let isPlay = this.isPlay;
			let obj = {
				id,
				isPlay
			}
			uni.$emit('audioPlay', obj);
		},
		mounted() {
			this.$store.getters.getinnerAudioContext.onEnded(() => {
				if (this.playList.length === 0) {
					this.$store.commit('setPause');
					uni.$emit('pause');
				} else {
					this.next();
				}
			});
		},
		methods: {
			//节流
			throttle(fun, delay = 1000) {
				throttle(fun, delay)();
			},
			//歌曲url
			getMusicUrl(id) {
				return getMusicUrl(id).then(res => {
					this.url = res.data.data[0].url;
					this.$store.commit('setinnerAudioContextSrc', this.url);
				})
			},
			//歌曲信息
			getmusicDetialInfo(id) {
				return musicDetialInfo(id).then(res => {
					this.author = res.data.songs[0].ar[0].name
					this.name = res.data.songs[0].al.name;
					this.poster = res.data.songs[0].al.picUrl;
				})
			},
			//歌词
			getlyric(id) {
				this.lyric = [];
				this.time = [];
				return getlyric(id).then(res => {
					let str = res.data.lrc.lyric;
					if (str === "") {
						this.isShow = true;
					} else {
						lyric(this.time, this.lyric, str);
					}

				})
			},
			//搜索页的默认30条
			getkeySearch(con) {
				keySearch(con).then(res => {
					this.playList = res.data.result.songs;
					this.$store.commit('setPlayList', this.playList);
				})
			},
			//相似音乐
			getsimilarMusic(id) {
				similarMusic(id).then(res => {
					this.playList = res.data.songs;
					this.$store.commit('setPlayList', this.playList);
				})
			},
			//重新获取数据
			getInfo(id) {
				this.scrollTop = 0;
				if (this.from === 'search') {
					this.getkeySearch(this.keyword);
				} else {
					this.getsimilarMusic(id);
				}
				//等加载完成后再保存，promise.all
				Promise.all([this.getmusicDetialInfo(id), this.getlyric(id), this.getMusicUrl(id)]).then(() => {
					let author = this.author;
					let name = this.name;
					let url = this.url;
					let poster = this.poster;
					let info = {
						id,
						name,
						author,
						poster,
						url
					};
					uni.setStorage({
						key: "info",
						data: info,
					})
					this.$store.commit('setPlay');
					//这里要实现多次监听，必须先调用一次paused属性，bug
					setTimeout(() => {
						console.log(this.$store.state.innerAudioContext.paused)
					}, 300)
					this.$store.getters.getinnerAudioContext.onTimeUpdate(() => {
						this.timeupdate();
					});
				})

			},

			play() {
				if (this.altitutde === 'icon-bofang') {
					this.altitutde = "icon-zanting";
					this.$store.commit('setPlay');
					this.isPlay = true;
				} else {
					this.altitutde = "icon-bofang";
					this.$store.commit('setPause');
					this.isPlay = false;
				}

			},
			prev() {
				//点击上一首，自动播放,需要
				//这里需要从拿到的相似首歌做切换即可playlist
				let id = null;
				if (this.playList.length !== 0) {
					if (this.index == 0) {
						id = this.playList[this.playList.length - 1].id;
						this.index = this.playList.length - 1;
					} else {
						id = this.playList[this.index - 1].id;
						this.index--;
					}
					this.id = id;
					this.getInfo(this.id);
					this.altitutde = "icon-zanting";
				} else {
					uni.showToast({
						title: '暂无该歌相似歌曲。'
					})
				}
			},
			next() {
				//点击下一首，自动播放
				let id = null;
				if (this.playList.length !== 0) {
					if (this.index == this.playList.length - 1) {
						id = this.playList[0].id;
						this.index = 0;
					} else {
						id = this.playList[this.index + 1].id;
						this.index++;
					}
					this.id = id;
					this.getInfo(this.id);
					this.altitutde = "icon-zanting";
				} else {
					uni.showToast({
						title: '暂无该歌相似歌曲。'
					})
				}
			},
			timeupdate() {
				//判断当前播放的时间，匹配对应的时间戳来滚动数据
				let minites = parseInt(this.$store.getters.getinnerAudioContext.currentTime / 60);
				let seconds = parseInt(this.$store.getters.getinnerAudioContext.currentTime % 60);
				let timeStr = (minites < 10 ? "0" + minites : minites) + ":" + (seconds < 10 ? "0" + seconds : seconds)
				let index = this.time.findIndex(item => {
					//这里并不会每一次都相等，设置一个范围
					return item === timeStr;
				})
				if (index != -1) {
					//这里是需要滚动的距离
					let distance = -25 * index;
					this.scrollTop = distance;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.pla {
		width: 100%;
		height: 100vh;

		.img {
			width: 100%;
			height: 40%;
			display: flex;
			flex-direction: column;

			image {
				display: inline-block;
				margin: 10rpx auto;
				width: 53%;
				height: 85%;
				border-radius: 50%;
			}

			.info {
				width: 100%;
				height: 15%;
				display: flex;
				align-items: center;
				justify-content: space-around;

				text {
					width: 50%;
					text-align: center;
				}
			}
		}

		.geci {
			width: 100%;
			height: 45%;
			overflow: hidden;

			.ax {
				width: 98%;
				position: relative;
				margin: 5rpx auto;

				.gundong {
					margin-top: 140rpx;
					position: absolute;
					left: 0;
					right: 0;
					width: 100%;
					display: flex;
					flex-direction: column;
					overflow: hidden;

					text {
						display: inline-block;
						width: 100%;
						margin: 5rpx auto;
						line-height: 40rpx;
						text-align: center;
					}
				}
			}

		}

		.player {
			width: 100%;
			height: 15%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.iconfont {
				color: $uni-text-color-placeholder;
				font-size: 100rpx;
			}

		}
	}
</style>
