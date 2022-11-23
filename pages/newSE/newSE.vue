<template>
	<view>
		<view class="top">
			<view class="x">
				<text @click="change(0)" :class="{active:index===0}">新歌曲</text>
				<text @click="change(1)" :class="{active:index===1}">新专辑</text>
			</view>
		</view>
		<view class="list">
			<view class="newSong" v-if="isShow">
				<view class="index">
					<text v-for="(item,indexn) in kindSing" :key="indexn" :class="{isactive:indexn===activeindexN}"
						@click="changeIndexN(item,indexn)">{{item.name}}</text>
				</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll">
					<view class="item" v-for="(item,indexNS) in newSong" :key="indexNS" @click="bofang(item)">
						<text>{{item.album.name}}</text>
						<text>{{item.artists[0].name}}</text>
						<text>{{item.album.company}}</text>
					</view>
				</scroll-view>

			</view>
			<view class="newAlbum" v-if="!isShow">
				<view class="index">
					<text v-for="(item,indexA) in kindAlbum" :key="indexA" :class="{isactive:indexA===activeindexA}"
						@click="changeIndexA(item,indexA)">{{item.name}}</text>
				</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll">
					<view class="item" v-for="(item,index) in newAblum" :key="index" @click="getEditor(item)">
						<text>{{item.name}}</text>
						<text>{{item.artists[0].name}}</text>
						<text>{{item.company}}</text>
					</view>
				</scroll-view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		allnewAlbum,
	} from '../../network/music.js';
	import {
		newSong
	} from '../../network/home.js';
	import {
		getMusicUrl,
		editorInfo,
	} from '../../network/public.js';
	export default {
		data() {
			return {
				newAblum: [],
				albumTotal: 0,
				aoffset: 0,
				aType: 'ALL',
				newSong: [],
				index: 0,
				isShow: true,
				activeindexN: 0,
				activeindexA: 0,
				kindSing: [{
					name: '全部',
					type: 0
				}, {
					name: '华语',
					type: 7
				}, {
					name: '欧美',
					type: 96
				}, {
					name: '日本',
					type: 8
				}, {
					name: '韩国',
					type: 16
				}],
				kindAlbum: [{
					name: '全部',
					type: 'ALL'
				}, {
					name: '华语',
					type: 'ZH'
				}, {
					name: '欧美',
					type: 'EA'
				}, {
					name: '日本',
					type: 'JP'
				}, {
					name: '韩国',
					type: 'KP'
				}],
			}
		},

		onLoad() {
			this.getnewSong(0);
			this.getallnewAlbum(this.aoffset, 'ALL')
		},
		onReachBottom() {
			//是专辑才会有下拉数据
			if (this.index === 1) {
				this.moreAlbum();
			}
		},
		methods: {
			//新碟上架
			getallnewAlbum(offset, area) {
				allnewAlbum(offset, area).then(res => {
					this.newAblum = res.data.albums;
					this.albumTotal = res.data.total;
				})
			},
			//新歌速递
			getnewSong(type) {
				newSong(type).then(res => {
					this.newSong = res.data.data;
				})
			},
			change(index) {
				this.index = index;
				if (index === 0) {
					this.isShow = true;
				} else {
					this.isShow = false;
				}
			},
			//改变新歌速递下标
			changeIndexN(item, index) {
				this.activeindexN = index;
				this.getnewSong(item.type);
			},
			//改变专辑下标
			changeIndexA(item, index) {
				this.activeindexA = index;
				this.aType = item.type;
				this.aoffset = 0;
				this.getallnewAlbum(0, item.type);
			},
			//点击新歌播放
			bofang(item) {
				let url = null;
				let id = item.id;
				let author = item.album.artists[0].name;
				let name = item.name;
				let poster = item.album.picUrl;
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
			//点击专辑播放
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

			//上拉加载
			moreAlbum() {
				this.aoffset++;
				allnewAlbum(this.aoffset, this.aType).then(res => {
					let data = res.data.albums;
					this.newAblum = this.newAblum.concat(data);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.top {
		width: 100vw;
		height: 80rpx;
		overflow: hidden;
		position: fixed;
		background-color: #F1F1F1;
		top: 0;
		z-index: 10;

		.x {
			width: 40%;
			height: 60rpx;
			margin: 10rpx auto;

			text {
				display: block;
				float: left;
				width: 50%;
				text-align: center;
				font-size: 35rpx;
			}

			.active {
				border-bottom: 7rpx solid aqua;
			}
		}
	}

	.list {
		width: 100vw;
		position: relative;
		top: 80rpx;

		.index {
			width: 100%;
			height: 80rpx;
			background-color: coral;
			position: sticky;
			top: 80rpx;
			z-index: 10;

			text {
				display: block;
				float: left;
				width: 19%;
				margin-left: 1%;
				font-size: 30rpx;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
			}

			.isactive {
				color: white;
			}
		}

		.newSong,
		.newAlbum {
			width: 100%;

			.item {
				width: 98%;
				margin: 5rpx auto;
				height: 60rpx;
				font-size: 30rpx;

				text {
					display: block;
					float: left;
					height: 60rpx;
					line-height: 60rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				text:nth-child(1) {
					width: 40%;
				}

				text:nth-child(2) {
					width: 30%;
				}

				text:nth-child(3) {
					float: right;
					width: 25%;
				}
			}
		}
	}
</style>
