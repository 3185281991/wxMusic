<template>
	<view class="content">
		<!-- 搜索 -->
		<view class="search">
			<search />
		</view>
		<!-- 独家列表轮播-->
		<view class="ban">
			<view class="banners">
				<swiper :autoplay="true" :interval="3000" :duration="1500" circular="true">
					<swiper-item v-for="(item,index) in privateList" :key="item.name" @click="jumptoMv(item.id)">
						<image :src="item.picUrl"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 导航部分 -->
		<view class="navicon">
			<view class="iconList" @click="jumpToAllsinger">
				<text class="iconfont icon-yonghufill"></text>
				<text>歌手</text>
			</view>
			<view class="iconList" @click="jumpToTrack">
				<text class="iconfont icon-paixing"></text>
				<text>榜单</text>
			</view>
			<view class="iconList" @click="jumpToAllGD">
				<text class="iconfont icon-fenlei"></text>
				<text>精选歌单</text>
			</view>
		</view>
		<view class="new">
			<view class="top">
				<text @click="changeIndex(1)" :class="{isActive:index===1}">新歌</text>
				<text @click="changeIndex(2)" :class="{isActive:index===2}">新碟</text>
				<text @click="jumToSe">更多歌曲 ></text>
			</view>
			<!-- 新歌 -->
			<swiper v-if="isShow">
				<swiper-item v-for="(item,index) in newSong" :key="index">
					<view class="swiper-item" v-for="item1 in item" :key="item1.name" @click="bofang(item1)">
						<view class="left">
							<image :src="item1.album.picUrl" mode=""></image>
						</view>
						<view class="right">
							<text>{{item1.album.name}}</text>
							<text>{{item1.album.artists[0].name}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- 新碟 -->
			<swiper v-if="!isShow">
				<swiper-item v-for="(item,index) in newAblum" :key="index">
					<view class="swiper-item" v-for="item1 in item" :key="item1.name" @click="getEditor(item1)">
						<view class="left">
							<image :src="item1.picUrl" mode=""></image>
						</view>
						<view class="right">
							<text>{{item1.artist.name}}</text>
							<text>{{item1.name}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="paihang">
			<view class="top">
				<text>排行榜</text>
				<text @click="jumpToTrack">更多榜单 ></text>
			</view>
			<view class="info">
				<swiper>
					<swiper-item v-for="item in trackList" :key="item.name" @click="conreteInfo(item.id)">
						<view class="left">
							<image :src="item.coverImgUrl" mode=""></image>
						</view>
						<view class="right">
							<view><text>{{item.name}}</text><text> {{item.updateFrequency}}</text></view>
							<view class="list" v-for="(item1,index) in item.tracks" :key="index">
								<text>{{index+1}} {{item1.first}}--{{item1.second}}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>

			</view>
		</view>
		<view class="menuw">
			<view class="top">
				<text>网友精选</text>
				<text @click="jumpToAllGD">所有精选 ></text>
			</view>
			<view class="item" v-for="item in menuW" :key="item.name" @click="conreteInfo(item.id)">
				<view class="left">
					<image :src="item.coverImgUrl" mode=""></image>
				</view>
				<view class="right">
					<view class="ti">
						{{item.name}}
					</view>
					<view class="tags">
						<text v-for="item1 in item.tags">{{item1}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		menuW,
		privatecontent,
		allnewAlbum,
		toplistDetail
	} from '../../network/music.js';
	import {
		getMusicUrl,
		editorInfo,
	} from '../../network/public.js';
	import {
		newSong
	} from '../../network/home.js';
	import {
		slice
	} from '../../utils/index.js'
	import search from '../../components/search.vue';

	export default {
		data() {
			return {
				privateList: [],
				newAblum: [],
				newSong: [],
				trackList: [],
				index: 1,
				isShow: true,
				menuW: []
			}
		},
		components: {
			search
		},
		onLoad() {
			this.getprivatecontent();
			this.getallnewAlbum();
			this.getnewSong();
			this.getmenuW();
			this.gettoplistDetail();
		},
		methods: {
			//网友精选碟
			getmenuW() {
				menuW().then(res => {
					this.menuW = res.data.playlists;
				})
			},

			//独家放送列表
			getprivatecontent() {
				privatecontent().then(res => {
					this.privateList = res.data.result;
				})
			},
			//新碟上架
			getallnewAlbum(offset, area) {
				allnewAlbum(offset, area).then(res => {
					let data = res.data.albums.slice(7, 19);
					this.newAblum = slice(data, 3);
				})
			},
			//新歌速递
			getnewSong() {
				newSong().then(res => {
					let data = res.data.data.slice(12, 24)
					this.newSong = slice(data, 3);
				})
			},
			//榜单内容摘要
			gettoplistDetail() {
				toplistDetail().then(res => {
					this.trackList = res.data.list.slice(0, 4);
				})
			},
			//点击新歌播放
			bofang(item) {
				let url = null;
				let id = item.id;
				let author = "";
				let name = "";
				let poster = "";
				if (item.song) {
					author = item.song.album.artists[0].name;
					name = item.song.name;
					poster = item.picUrl;
				} else {
					author = item.album.artists[0].name;
					name = item.name;
					poster = item.album.picUrl;
				}
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
			getEditor(item) {
				let url = "";
				let author = item.artist.name;
				let name = item.name;
				let poster = item.artist.picUrl;
				editorInfo(item.id).then(res => {
					let id = res.data.songs[0].id;
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
				})

			},
			changeIndex(index) {
				this.index = index
				if (index === 1) {
					this.isShow = true;
				} else {
					this.isShow = false;
				}
			},
			jumptoMv(id) {
				uni.navigateTo({
					url: '../bofang/bofang?id=' + id + '&type=独家'
				})
			},
			jumpTo(index) {
				if (index === 1) {} else if (index === 2) {} else if (index === 3) {}
			},
			//跳转新歌新专辑
			jumToSe() {
				uni.navigateTo({
					url: '../newSE/newSE'
				})
			},
			//跳转进入歌单详情
			conreteInfo(id, type) {
				uni.navigateTo({
					url: '../gedan/gedan?id=' + id
				})
			},
			//跳转排行榜
			jumpToGd() {
				uni.navigateTo({
					url: '../gedan/gedan?'
				})
			},
			jumpToTrack() {
				uni.navigateTo({
					url: '../track/track'
				})
			},
			//跳转所有歌单页面
			jumpToAllGD() {
				uni.navigateTo({
					url: '../allGd/allGd'
				})
			},
			jumpToAllsinger() {
				uni.navigateTo({
					url: '../allSinger/allSinger'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.content {
		position: relative;
		height: 100vh;
		margin-top: 110rpx;
	}

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

	.navicon {
		width: 100%;
		height: 120rpx;
		overflow: hidden;
		margin-top: 15rpx;

		.iconList {
			width: 20%;
			float: left;
			height: 100%;
			margin-left: 10%;
			display: flex;
			align-items: center;
			text-align: center;
			flex-direction: column;

			text:nth-child(1) {
				font-size: 65rpx;
				padding-top: 10rpx;
				color: #aaffff;
			}

			text:nth-child(2) {
				font-size: 30rpx;
				padding-top: 5rpx;
			}

		}
	}

	.new {
		width: 100vw;
		height: 620rpx;
		margin-top: 10rpx;

		.top {
			width: 100%;
			height: 12%;

			text {
				display: inline-block;
				font-size: 35rpx;
				margin-left: 30rpx;
				line-height: 70rpx;
			}

			text:nth-child(3) {
				float: right;
				padding-right: 55rpx;
				font-size: 30rpx;
			}

			.isActive {
				border-bottom: 10rpx solid aqua;
			}
		}

		swiper {
			width: 100vw;
			height: 86%;
			margin-top: 10rpx;

			swiper-item {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;

				.swiper-item {
					width: 98%;
					margin: 0 1%;
					height: 33%;

					.left {
						float: left;
						width: 35%;
						height: 100%;
						display: flex;
						align-items: center;

						image {
							width: 62%;
							height: 88%;
							border-radius: 20rpx;
							margin-left: 20rpx;
						}
					}

					.right {
						float: left;
						width: 60%;
						height: 100%;

						text {
							display: block;
							width: 100%;
							height: 50rpx;
							line-height: 50rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						text:nth-child(1) {
							margin-top: 35rpx;
							font-size: 35rpx;
						}

						text:nth-child(2) {
							margin-top: 15rpx;
							font-size: 30rpx;
						}
					}

				}
			}
		}
	}

	.paihang {
		width: 100vw;
		height: 380rpx;
		margin-top: 10rpx;
		background: linear-gradient(110.13149366494508deg, rgba(226, 235, 239, 1) 5.533854166666667%, rgba(208, 218, 224, 1) 96.67968749999999%);

		.top {
			width: 100%;
			height: 12%;

			text {
				display: inline-block;
				font-size: 35rpx;
				margin-left: 30rpx;
				line-height: 70rpx;
			}

			text:last-child {
				float: right;
				margin-right: 20rpx;
			}
		}

		.info {
			width: 100%;
			height: 86%;

			swiper {
				width: 100vw;
				height: 100%;
				margin-top: 10rpx;

				swiper-item {
					width: 100%;
					height: 100%;

					.left {
						float: left;
						width: 40%;
						height: 100%;
						display: flex;
						align-items: center;

						image {
							width: 77%;
							height: 75%;
							border-radius: 20rpx;
							margin-left: 20rpx;
						}
					}

					.right {
						float: left;
						width: 58%;
						height: 100%;

						view:nth-child(1) {
							width: 100%;
							height: 40rpx;
							line-height: 40rpx;
							font-size: 35rpx;

							text:nth-child(1) {
								font-weight: bold;
							}

							text:nth-child(2) {
								font-size: 30rpx;
								padding-left: 20rpx;
							}
						}

						.list {
							margin-top: 10rpx;
							width: 100%;

							text {
								display: inline-block;
								font-size: 30rpx;
							}
						}
					}
				}
			}
		}
	}

	.menuw {
		width: 100%;
		margin-top: 10rpx;

		.top {
			width: 100%;
			height: 70rpx;

			text {
				display: inline-block;
				font-size: 35rpx;
				margin-left: 30rpx;
				line-height: 70rpx;
			}

			text:last-child {
				float: right;
				margin-right: 20rpx;
			}
		}

		.item {
			margin-top: 10rpx;
			width: 100vw;
			height: 230rpx;

			.left {
				float: left;
				width: 45%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 62%;
					height: 88%;
					border-radius: 20rpx;
					margin-left: 20rpx;
				}
			}

			.right {
				float: left;
				width: 50%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.ti {
					margin-top: 36rpx;
					width: 100%;
					font-size: 35rpx;
					text-align: center;
				}

				.tags {
					margin-top: 10rpx;
					width: 100%;
					height: 20%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					display: flex;
					justify-content: space-around;

					text {
						font-size: 30rpx;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
