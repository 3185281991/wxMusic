<template>
	<view>
		<view class="top">
			<image :src="desc.artist.cover" mode=""></image>
			<view class="des">
				<view class="t">
					<text>{{desc.artist.name}}</text>
				</view>
				<view class="sig" v-if="desc.user">
					<text>{{desc.user.signature}}</text>
				</view>
			</view>
		</view>
		<view class="sing">
			<view class="til">
				<text @click="changeIndex(0)" :class="{active:index===0}">全部歌曲</text>
				<text @click="changeIndex(1)" :class="{active:index===1}">百科信息</text>
			</view>
			<view class="sings" v-if="isShow">
				<view class="item" v-for="(item,indexz) in singList" :key="indexz">
					<view class="left">
						<view class="name">
							<text>{{item.name}}</text>
						</view>
						<view class="al">
							<text v-if="item.al.alia">{{item.al.alia[0]}}</text>
							<text v-else>{{item.al.name}}</text>
						</view>
					</view>

					<view class="right">
						<text class="iconfont icon-bofangqi-bofangshu" @click="bofang(item.id,indexz)"></text>
					</view>
				</view>

			</view>
			<view class="info" v-if="!isShow">
				<text>{{desc.artist.briefDesc}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		singerAllSing,
		singerDetailInfo
	}
	from '../../network/singer.js';
	import {
		getMusicUrl,
		musicDetialInfo,
	} from '../../network/public.js';
	export default {
		data() {
			return {
				id: null,
				desc: [],
				singList: [],
				index: 0,
				singLength: 0,
				offset: 1,
				mindex: 0,
				musicId: 0,
				url: '',
				name: '',
				poster: '',
				author: '',
				isShow: true,
				isPlay: false
			}
		},
		computed: {
			getsingList: {
				get() {
					return this.singList;
				}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getsingerAllSing(this.id);
			this.getsingerDetailInfo(this.id);
		},
		onUnload() {
			//返回其他页面,需要保存当前歌曲信息
			if (this.musicId) {
				let id = this.musicId;
				let isPlay = this.isPlay;
				let obj = {
					id,
					isPlay
				}
				uni.$emit('audioPlay', obj);
			}
		},
		onReachBottom() {
			if (this.index === 0) {
				this.moreSing(this.id);
			}
		},
		methods: {
			//歌手热度顺序排序所有歌曲
			getsingerAllSing(id) {
				singerAllSing(id).then(res => {
					this.singList = res.data.songs;
					this.$store.commit('setPlayList', this.songList);
					this.singLength = res.data.total;
				})
			},
			//歌手详细信息
			getsingerDetailInfo(id) {
				singerDetailInfo(id).then(res => {
					this.desc = res.data.data;
				})
			},
			//歌曲url
			getMusicUrl(id) {
				return getMusicUrl(id).then(res => {
					this.url = res.data.data[0].url;
					this.$store.commit('setinnerAudioContextSrc', res.data.data[0].url);
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
			//上拉加载
			moreSing(id) {
				if (this.offset * 20 < this.singLength) {
					this.offset++;
					singerAllSing(id, this.offset).then(res => {
						let data = res.data.songs;
						this.singList = this.singList.concat(data);
						this.$store.commit('setPlayList', this.songList);
					})
				}
			},
			//切歌保存信息
			changeSing(musicId) {
				Promise.all([this.getMusicUrl(musicId), this.getmusicDetialInfo(musicId)]).then(() => {
					let id = musicId;
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
				})
			},
			changeIndex(index) {
				this.index = index;
				if (index === 0) {
					this.isShow = true;
				} else {
					this.isShow = false;
				}
			},
			next() {
				//自动播放歌单中的下一首
				let id = null;
				if (this.index == this.singList.length - 1) {
					id = this.singList[0].id;
					this.mindex = 0;
				} else {
					id = this.singList[this.index + 1].id;
					this.mindex++;
				}
				this.changeSing(id);
			},
			//播放歌曲
			bofang(musicId, index) {
				this.musicId = musicId;
				this.mindex = index;
				this.changeSing(musicId);
				this.isPlay = true;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		width: 100vw;
		position: relative;
		height: 566rpx;

		image {
			width: 100%;
			height: 100%;
			filter: brightness(130%)
		}

		.des {
			width: 80%;
			position: absolute;
			top: 300rpx;
			margin-left: 10%;
			background-color: rgba(255, 255, 255, .8);
			border-radius: 10rpx;


			.t {
				height: 60rpx;
				line-height: 60rpx;
				font-size: 40rpx;
				text-align: center;

				text {
					padding-left: 30rpx;
				}
			}

			.sig {
				width: 98%;
				margin-left: 1%;
				height: 80rpx;
				margin-bottom: 10rpx;
				overflow: hidden;

				text {
					display: block;
					width: 100%;
					padding-left: 30rpx;
					line-height: 40rpx;
					font-size: 30rpx;
					padding-left: 15rpx;

				}
			}
		}
	}

	.sing {
		width: 100vw;

		.til {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: space-around;

			text {
				font-size: 35rpx;
				display: block;
				width: 140rpx;
				height: 70rpx;
				line-height: 80rpx;
				text-align: center;
			}

			.active {
				border-bottom: 10rpx solid aqua;
			}
		}

		.sings {
			marign-top: 10rpx;
			width: 100%;

			.item {
				width: 98%;
				margin: 20rpx auto;
				height: 80rpx;

				.left {
					width: 85%;
					float: left;
					height: 80rpx;

					view {
						float: left;
						height: 80rpx;

						text {
							display: block;
							height: 80rpx;
							line-height: 80rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}

					.name {
						width: 40%;
						font-size: 35rpx;
						margin-left: 2%;
					}

					.al {
						margin-left: 1%;
						width: 57%;
						font-size: 30rpx;
					}
				}

				.right {
					width: 15%;
					float: right;
					text-align: center;
					height: 80rpx;

					text {
						display: block;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 60rpx;
					}
				}
			}
		}

		.info {
			width: 98%;
			margin: 10rpx auto;

			text {
				font-size: 30rpx;
				line-height: 40rp;
			}
		}
	}
</style>
