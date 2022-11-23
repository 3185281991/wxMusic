<template>
	<view>
		<view class="detail">
			<view class="top">
				<view class="img">
					<image :src="detailInfo.coverImgUrl" mode=""></image>
				</view>
				<view class="font">
					<view>{{detailInfo.name}}</view>
					<view>
						<image :src="detailInfo.creator.avatarUrl" mode=""></image>
						<text>{{detailInfo.creator.nickname}}</text>
					</view>
					<view>{{detailInfo.description}}</view>
				</view>
			</view>
			<view class="count">
				<view class="txt">
					<view class="item">
						<text class="iconfont icon-bofangjilu"></text>
						<text>{{count.playCount}}</text>
					</view>
					<view class="item">
						<text class="iconfont icon-dingyue"></text>
						<text>{{count.bookedCount}}</text>
					</view>
					<view class="item" @click="showComment">
						<text class="iconfont icon-pinglun"></text>
						<text>{{count.commentCount}}</text>
					</view>
					<view class="item">
						<text class="iconfont icon-fenxiang"></text>
						<text>{{count.shareCount}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="sing" v-if="!isShow">
			<view class="sitem" v-for="(item,indexz) in songList" :key="indexz">
				<text class="name">{{item.al.name}}</text>
				<view class="auto">
					<text v-for="item1 in item.ar" :key="item1.name">{{item1.name}}</text>
				</view><text class="iconfont icon-bofang" @click="bofang(item.id,indexz)"></text>
			</view>
		</view>
		<view class="comments" v-if="isShow">
			<text class="iconfont icon-guanbi2" @click="closeComment"></text>
			<comment :comment="commentsList" />
		</view>
	</view>
</template>

<script>
	import {
		allSongs,
		detailMenu,
		detaildynamic,
		menuComments
	} from '../../network/gdMenu.js';
	import {
		getMusicUrl,
		musicDetialInfo,
	} from '../../network/public.js';

	import comment from '../../components/comment.vue'
	export default {
		data() {
			return {
				id: '',
				url: '',
				name: '',
				poster: '',
				author: '',
				detailInfo: {},
				count: {},
				songList: [],
				commentsList: [],
				commentTotal: 0,
				allCount: 0,
				page: 1,
				pageComment: 1,
				isShow: false,
				index: 0,
				musicId: '',
			}
		},
		components: {
			comment,
		},
		onUnload() {
			//返回其他页面,要是点击了歌曲就保存
			if (this.musicId) {
				//返回其他页面,需要保存当前歌曲信息
				let id = this.musicId;
				let isPlay = true;
				let obj = {
					id,
					isPlay
				}
				uni.$emit('audioPlay', obj);
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getAllSongs(this.id);
			this.getdetailMenu(this.id);
			this.getdetaildynamic(this.id);
			this.getmenuComments(this.id);
		},
		onReachBottom() {
			//上拉加载
			this.moreSongs(this.id);
		},
		mounted() {
			this.$store.getters.getinnerAudioContext.onEnded(() => {
				this.next();
			});
		},
		methods: {
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
			//所有歌曲
			getAllSongs(id) {
				allSongs(id).then(res => {
					this.songList = res.data.songs;
					this.$store.commit('setPlayList', this.songList);
				})
			},
			//歌单详情
			getdetailMenu(id) {
				detailMenu(id).then(res => {
					this.detailInfo = res.data.playlist;
					this.allCount = res.data.playlist.trackCount;
				})
			},

			//歌单详情动态
			getdetaildynamic(id) {
				detaildynamic(id).then(res => {
					this.count = res.data;
				})
			},
			//歌单评论
			getmenuComments(id) {
				menuComments(id).then(res => {
					this.commentsList = res.data.comments;
					this.commentTotal = res.data.total;
				})
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
			//加载歌单歌曲或评论
			moreSongs(id) {
				//根据现实来判断加载那一部分
				if (this.isShow === false) {
					if (this.page * 15 < this.allCount) {
						this.page += 1;
						allSongs(id, this.page * 15).then(res => {
							let newData = res.data.songs;
							this.songList = this.songList.concat(newData);
							this.$store.commit('setPlayList', this.songList);
						})
					} else {
						uni.showToast({
							title: '暂无更多数据。'
						})
					}
				} else {
					if (this.pageComment * 20 < this.commentTotal) {
						let offset = this.pageComment + 1;
						this.pageComment = offset;
						menuComments(id, offset).then(res => {
							let newData = res.data.comments;
							this.commentsList = this.commentsList.concat(newData);
						})

					} else {
						uni.showToast({
							title: '暂无更多数据。'
						})
					}
				}
			},
			next() {
				//自动播放歌单中的下一首
				let id = null;
				if (this.index == this.songList.length - 1) {
					id = this.commentssongListList[0].id;
					this.index = 0;
				} else {
					id = this.songList[this.index + 1].id;
					this.index++;
				}
				this.changeSing(id);
			},
			//播放歌曲
			bofang(musicId, index) {
				this.musicId = musicId;
				this.index = index;
				this.changeSing(musicId);
			},
			//显示评论
			showComment() {
				this.isShow = true
			},
			//关闭评论
			closeComment() {
				this.isShow = false;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail {
		width: 100%;
		height: 380rpx;


		.top {
			width: 100%;
			height: 75%;
			position: relative;

			.img {
				width: 35%;
				float: left;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 83%;
					height: 71%;
					border-radius: 40rpx;
				}
			}

			.font {
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
				width: 65%;
				height: 80%;
				float: left;
				overflow: hidden;
				display: flex;
				flex-direction: column;

				view:nth-child(1) {
					width: 90%;
					text-indent: 1em;
					margin: 10rpx auto;
					font-size: 30rpx;
					overflow: hidden;
				}

				view:nth-child(2) {
					height: 100rpx;
					display: flex;
					align-items: center;

					image {
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
						margin-left: 30rpx;
					}

					text {
						font-size: 25rpx;
						display: inline-block;
						margin-left: 20rpx;
						width: 180rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				view:nth-child(3) {
					height: 60rpx;
					width: 90%;
					margin: 0 auto;
					white-space: nowrap;
					text-overflow: ellipsis;
					line-height: 60rpx;
					overflow: hidden;
					font-size: 30rpx;
				}
			}
		}

		.count {
			width: 100%;
			height: 20%;
			background-color: #33ffb4;

			.txt {
				width: 96%;
				margin: 0 auto;
				height: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.item {
					width: 25%;
					height: 100%;
					white-space: nowrap;
					position: relative;
		

					text:nth-child(1) {
						width: 27%;
						display: inline-block;
						font-size: 38rpx;
						position: absolute;
						top: 16rpx;
						left: 0;
					}

					text:nth-child(2) {
						position: absolute;
						top: 14rpx;
						left: 45rpx;
						display: inline-block;
						width: 73%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 30rpx;
						text-align: center;
					}
				}
			}
		}

	}

	.sing {
		width: 100%;
		margin-top: 5rpx;

		.sitem {
			width: 97%;
			margin: 5rpx auto;
			height: 80rpx;

			.name {
				display: inline-block;
				float: left;
				width: 38%;
				height: 80rpx;
				line-height: 80rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			.auto {
				float: left;
				width: 30%;
				height: 80rpx;
				margin-left: 2%;
				line-height: 80rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;

				text {
					font-size: 30rpx;
					display: inline-block;
					margin-left: 5rpx;
				}

			}

			.icon-bofang,
			.icon-zanting {
				display: inline-block;
				float: right;
				padding-right: 25rpx;
				width: 10%;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 50rpx;
			}
		}
	}

	.comments {
		width: 98%;
		margin: 5rpx auto;

		.icon-guanbi2 {
			display: inline-block;
			position: fixed;
			right: 40rpx;
			font-size: 40rpx;
			border-radius: 50%;
		}
	}
</style>
