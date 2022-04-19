<template>
	<view class="play">
		<view class="img" @click="jumpToPlayer(getInfo.id)">
			<image :src="getInfo.poster" mode="aspectFit"></image>
		</view>
		<view class="info">
			{{getInfo.name}}-{{getInfo.author}}
		</view>
		<view class="btn">
			<text class="iconfont" :class="altitutde" @click="play"></text>
			<text class="iconfont icon-xiayishou" @click="throttle(next)"></text>
		</view>
	</view>
</template>

<script>
	import {
		similarMusic,
		musicDetialInfo,
		getMusicUrl
	} from '../network/public.js';
	import {
		throttle
	} from '../utils/index.js';
	export default {
		name: "play",
		data() {
			return {
				info: {
					id: '',
					url: '',
					author: '暂无',
					name: '暂无',
					poster: '',
				},
				playList: [],
				index: 0,
				altitutde: 'icon-bofang',
				currentTime: 0
			};
		},
		computed: {
			//动态获取
			getInfo() {
				return this.info
			}
		},
		mounted() {
			//首页点击歌曲播放保存
			uni.$on('playinfo', info => {
				uni.setStorage({
					key: "info",
					data: info,
				})
				this.info = info;
				this.$store.commit('setinnerAudioContextSrc', this.info.url);
				this.$store.commit('setPlay');
				this.altitutde = "icon-zanting";
				this.getsimilarMusic(info.id);
			})
			//跳转视频页面时暂停
			uni.$on('audioChnage', () => {
				this.altitutde = "icon-bofang";
				this.$store.commit('setPause');
			})
			//播放器页面中没有相似歌曲时触发暂停
			uni.$on('pause', () => {
				this.altitutde = "icon-bofang";
				this.$store.commit('setPause');
			})
			//从播放器回到页面重新获取对应的数据,以及传过来的数据
			uni.$on('audioPlay', (obj) => {
				this.info.id = obj.id;
				this.getmusicDetialInfo(obj.id)
				if (obj.isPlay) {
					this.altitutde = "icon-zanting";
					this.$store.commit('setPlay');
				} else {
					this.altitutde = "icon-bofang";
					this.$store.commit('setPause');
				}

				this.playList = this.$store.getters.getPlayList;
			})
			//每次刷新的时候从vue中取出保存数据
			const value = uni.getStorageSync("info")
			if (value) {
				this.info = value;
				this.$store.commit('setinnerAudioContextSrc', this.info.url);
				this.$store.commit('setPause');
				this.getsimilarMusic(this.info.id);
			}

			this.$store.getters.getinnerAudioContext.onEnded(() => {
				this.next();
			})
		},
		methods: {
			//节流
			throttle(fun, delay = 1000) {
				throttle(fun, delay)();
			},
			//相似音乐
			getsimilarMusic(id) {
				similarMusic(id).then(res => {
					this.playList = res.data.songs;
				})
			},
			//歌曲url
			getMusicUrl(id) {
				return getMusicUrl(id).then(res => {
					this.info.url = res.data.data[0].url;
					this.$store.commit('setinnerAudioContextSrc', this.info.url);
				})
			},
			play() {
				if (this.altitutde === 'icon-bofang') {
					this.altitutde = "icon-zanting";
					this.$store.commit('setPlay');
				} else {
					this.altitutde = "icon-bofang";
					this.$store.commit('setPause');
				}
			},
			//歌曲信息
			getmusicDetialInfo(id) {
				return musicDetialInfo(id).then(res => {
					this.info.author = res.data.songs[0].ar[0].name
					this.info.name = res.data.songs[0].al.name;
					this.info.poster = res.data.songs[0].al.picUrl;
				})
			},
			getMusic(item) {
				this.info.id = item.id;
				if (item.album) {
					this.info.author = item.album.name;
					this.info.poster = item.album.picUrl;
				} else {
					this.info.author = item.ar[0].name;
					this.info.poster = item.al.picUrl;
				}
				this.info.name = item.name;
				Promise.all([this.getmusicDetialInfo(item.id), this.getMusicUrl(item.id)]).then(() => {
					uni.setStorage({
						key: "info",
						data: this.info,
					})
				})
				this.getsimilarMusic(this.info.id);
			},

			next() {
				//点击下一首，自动播放
				let length = this.playList.length;
				if (length !== 0) {
					if (this.index === length - 1) {
						let item = this.playList[0];
						this.getMusic(item);
						this.index = 0;
					} else {
						let item = this.playList[this.index + 1];
						this.getMusic(item);
						this.index++;
					}
					this.altitutde = "icon-zanting";
				} else {
					uni.showToast({
						title: "暂无曲目"
					})
				}
			},
			jumpToPlayer(id) {
				//这里跳转需要拿到跳转时播放的时间,并且暂停
				if (id !== '') {
					uni.navigateTo({
						url: '../player/player?id=' + id + '&from=play'
					})
				} else {
					uni.showToast({
						title: "暂无曲目"
					})
				}

			}
		},

	}
</script>

<style lang="scss" scoped>
	.play {
		width: 100%;
		height: 120rpx;
		background-color: $uni-bg-color-grey;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-around;

		.img {
			width: 25%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			width: 35%;
			font-size: 35rpx;
			text-align: center;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			line-height: 120rpx;
		}

		.btn {
			width: 40%;
			display: flex;
			justify-content: space-around;

			.iconfont {
				color: $uni-text-color-placeholder;
			}

			.iconfont:nth-child(1) {
				padding-left: 35rpx;
				padding-top: 20rpx;
				font-size: 80rpx;
			}

			.iconfont:nth-child(2) {
				padding-top: 18rpx;
				padding-right: 10rpx;
				font-size: 88rpx;
			}
		}
	}
</style>
