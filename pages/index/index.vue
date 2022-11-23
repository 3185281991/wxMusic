<template>
	<view class="content">
		<view class="search">
			<search />
		</view>
		<!-- 首页轮播部分 -->
		<view class="banners">
			<swiper :autoplay="true" :interval="3000" :duration="1500" circular="true">
				<swiper-item v-for="(item,index) in banners" :key="item.pic">
					<image :src="item.pic" @click="jumpToInfo(item)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 推荐歌单 -->
		<view class="menu">
			<view class="title">
				<text>歌单推荐</text>
			</view>
			<swiper circular="true">
				<swiper-item v-for="(item,index) in recommendSongMenu" :key="index">
					<view class="List">
						<view class="item" v-for="item1 in item" :key="item1.id">
							<image :src="item1.picUrl" @click="conreteInfo(item1.id)"></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 推荐新音乐 -->
		<view class="new">
			<view class="title">
				<text>新歌速递</text>
			</view>
			<swiper>
				<swiper-item v-for="(item,index) in recommendNewMusic" :key="index">
					<view class="item" v-for="item1 in item " :key="item1.id" @click="bofang(item1)">
						<image :src="item1.picUrl"></image>
						<view class="info">
							<view> {{item1.name}}</view>
							<view> {{item1.song.artists[0].name}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="personalizedMv">
			<view class="title">
				<text>视频推荐</text>
			</view>
			<view class="con">
				<view class="item" v-for="(item,index) in personalizedMv" :key="index" @click="jumptoMv(item.id)">
					<image :src="item.picUrl"></image>
					<view class="text">
						<text>{{item.name}}</text>
					</view>
					<view class="count">
						<text class="iconfont icon-bofangqi-bofangshu"></text>
						<text>{{item.playCount}}</text>
					</view>
				</view>
			</view>

		</view>
		<view class="personalizedMv last">
			<view class="title">
				<text>网易出品</text>
			</view>
			<view class="con">
				<view class="item" v-for="(item,index) in wangyiMv" :key="index" @click="jumptowangyiMv(item.id)">
					<image :src="item.cover"></image>
					<view class="text">
						<text>{{item.name}}</text>
					</view>
					<view class="count">
						<text class="iconfont icon-bofangqi-bofangshu"></text>
						<text>{{item.playCount}}</text>
					</view>
				</view>
			</view>

		</view>
		<play></play>
	</view>

</template>

<script>
	import {
		getLogin,
		getBanner,
		ball,
		recommendNewMusic,
		recommendSongMenu,
		newSong,
	} from '../../network/home.js';
	import {
		getMusicUrl,
		editorInfo,
	} from '../../network/public.js';
	import {
		personalizedMv,
		wangyiMv
	} from '../../network/mv.js'
	import {
		slice
	} from '../../utils/index.js';
	import play from '../../components/play.vue';
	import search from '../../components/search.vue'
	export default {
		data() {
			return {
				banners: [],
				recommendNewMusic: [],
				recommendSongMenu: [],
				newSong: [],
				privatecontent: [],
				playInfo: {},
				personalizedMv: [],
				activeindex: 0,
				wangyiMv: [],
				mvoffset: 0
			}
		},
		components: {
			play,
			search
		},
		onLoad() {
			// this.getLogin();
			this.getBanner();
			this.getrecommendNewMusic();
			this.getrecommendSongMenu();
			this.getnewSong(0);
			this.getpersonalizedMv();
			this.getwangyiMv();
		},
		methods: {
			//登录
			// getLogin(){
			// },
			//轮播图
			getBanner() {
				getBanner().then(res => {
					this.banners = res.data.banners;
				})
			},
			//推荐新音乐
			getrecommendNewMusic() {
				recommendNewMusic().then(res => {
					let rs = res.data.result;
					this.recommendNewMusic = slice(rs, 2)
				})
			},
			//推荐歌单
			getrecommendSongMenu() {
				recommendSongMenu().then(res => {
					let rs = res.data.result;
					this.recommendSongMenu = slice(rs, 8)
				})
			},
			//新歌速递
			getnewSong(type) {
				newSong(type).then(res => {
					this.newSong = res.data.data;
				})
			},
			//推荐mv
			getpersonalizedMv() {
				personalizedMv().then(res => {
					this.personalizedMv = res.data.result;
				})
			},
			//网易出品mv
			getwangyiMv() {
				wangyiMv().then(res => {
					this.wangyiMv = res.data.data;
				})
			},
			//推荐视频
			jumptoMv(id) {
				uni.$emit('pause');
				uni.navigateTo({
					url: '../bofang/bofang?id=' + id + '&type=video'
				})
			},
			//网易出品
			jumptowangyiMv(id) {
				uni.$emit('pause');
				uni.navigateTo({
					url: '../bofang/bofang?id=' + id + '&type=网易MV'
				})
			},
			//点击新歌播放
			bofang(item) {
				let url = null;
				let id = item.id;
				let author = "";
				let name = "";
				let poster = "";
				// if (item.song) {
				author = item.song.album.artists[0].name;
				name = item.song.name;
				poster = item.picUrl;
				// } else {
				// 	author = item.album.artists[0].name;
				// 	name = item.name;
				// 	poster = item.album.picUrl;
				// }
				getMusicUrl(id).then(res => {
					url = res.data.data[0].url;
					if (url === null) {
						uni.showToast({
							title: "未找到播放路径。"
						})
					} else {
						this.playInfo = {
							id,
							url,
							name,
							author,
							poster
						};
						uni.$emit("playinfo", this.playInfo)
					}
				})

			},
			//轮播图跳转
			jumpToInfo(item) {
				//如果存在url，跳转外部链接，若为null,就判断类型，为新歌首发就拿到id跳转
				if (item.url) {
					let url = encodeURIComponent(item.url)
					uni.navigateTo({
						url: '../webView/webView?url=' + url
					})
				} else {
					if (item.typeTitle === '新歌首发') {
						uni.navigateTo({
							url: '../player/player?id=' + item.targetId
						})
					} else {
						uni.showToast({
							title: '暂不支持原声带。'
						})
					}
				}
			},
			//跳转进入歌单详情
			conreteInfo(id) {
				uni.navigateTo({
					url: '../gedan/gedan?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		height: 100vh;
		margin-top: 110rpx;

		.search {
			width: 100%;
			position: fixed;
			top: 0;
			z-index: 99;
		}

		.banners {
			width: 100vw;
			height: 380rpx;
			margin-top: 2px;

			swiper {
				width: 100vw;
				height: 380rpx;

				swiper-item {
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}


		.menu {
			margin-top: 10rpx;
			width: 100%;
			height: 460rpx;
			overflow: hidden;

			.title {
				width: 100%;
				height: 12%;

				text {
					display: inline-block;
					font-size: 35rpx;
					margin-left: 30rpx;
					line-height: 54rpx;
				}
			}

			swiper {
				margin-top: 15rpx;
				width: 100%;
				height: 85%;

				swiper-item {
					width: 100%;
					height: 100%;
					margin: 0 auto;

					.List {
						width: 100%;
						height: 100%;
						display: flex;
						flex-wrap: wrap;

						.item {
							margin-left: 5rpx;
							width: 24%;
							height: 186rpx;

							image {
								width: 100%;
								height: 100%;
								border-radius: 20rpx;
							}
						}
					}
				}
			}
		}

		.new {
			width: 100%;

			.title {
				width: 100%;
				height: 12%;

				text {
					display: inline-block;
					font-size: 35rpx;
					margin-left: 30rpx;
					line-height: 70rpx;
				}

			}

			swiper {
				margin-top: 10rpx;
				width: 100%;
				height: 200rpx;

				swiper-item {
					display: flex;
					width: 98%;
					margin-left: 10rpx;
					height: 280rpx;
					display: flex;
					flex-wrap: wrap;


					.item {
						width: 50%;
						height: 100%;
						display: flex;

						image {
							width: 50%;
							height: 100%;
							border-radius: 20rpx;
						}

						.info {
							width: 50%;

							view {
								width: 100%;
								text-align: center;
								margin-top: 40rpx;
								overflow: hidden;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								font-size: 30rpx;
							}

						}
					}
				}
			}

		}



		.personalizedMv {
			width: 100%;
			margin-top: 10rpx;

			.title {
				width: 100%;
				height: 12%;

				text {
					display: inline-block;
					font-size: 35rpx;
					margin-left: 30rpx;
					line-height: 70rpx;
				}

			}

			.con {
				width: 100%;

				.item {
					margin: 10rpx auto;
					width: 95%;
					height: 160rpx;
					display: flex;
					position: relative;

					image {
						width: 40%;
						height: 100%;
					}

					.text {
						width: 58%;
						height: 160rpx;
						line-height: 80rpx;
						margin-left: 1%;
						overflow: hidden;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						text-overflow: ellipsis;
					}

					.count {
						position: absolute;
						left: 110rpx;
						top: 55rpx;

						text {
							color: white;
							font-size: 25rpx;
						}

						.icon-bofangqi-bofangshu {
							font-size: 35rpx;
						}

					}
				}
			}
		}

		.last {
			margin-bottom: 130rpx;
		}
	}
</style>
