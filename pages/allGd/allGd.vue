<template>
	<view>
		<scroll-view  scroll-x="true" scroll-left="120">
			<text v-for="(item,index) in tags" @click="getBestMenu(item.name,index)"
				:class="{active:index===tindex}">{{item.name}}</text>
		</scroll-view>
		<view class="menu">
			<view class="item" v-for="(item,index) in menuList" :key="index" @click="conreteInfo(item.id)">
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
		BestMenuTag,
		BestMenu
	} from '../../network/music.js'
	export default {
		data() {
			return {
				tags: [],
				menuList: [],
				tindex: 0,
				tagTotal: 0,
				tag: '',
				//当前最后一个歌单的updatatime,用于分页
				lastUpdateTime: ''
			}
		},
		onLoad() {
			this.getBestMenuTag();
			this.getBestMenu('全部', 0);
		},
		onReachBottom() {
			this.moreMenu(this.tag, this.lastUpdateTime);
		},
		methods: {
			//精品歌单标签
			getBestMenuTag() {
				BestMenuTag().then(res => {
					this.tags = res.data.tags;
					this.tags.unshift({
						name: '全部'
					});
				})
			},
			getBestMenu(tag, index) {
				this.tag = tag;
				this.tindex = index;
				BestMenu(tag).then(res => {
					this.menuList = res.data.playlists;
					this.tagTotal = res.data.total;
					this.lastUpdateTime = this.menuList[this.menuList.length - 1].updateTime;
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					})
				})

			},
			//上拉加载
			moreMenu(tag, lastUpdateTime) {
				if (this.menuList.length <= this.tagTotal) {
					BestMenu(tag, lastUpdateTime).then(res => {
						let data = res.data.playlists;
						this.menuList = this.menuList.concat(data);
						this.lastUpdateTime = this.menuList[this.menuList.length - 1].updateTime;
					})
				} else {
					uni.showToast({
						title: '暂无更多'
					})
				}
			},
			//跳转进入歌单详情
			conreteInfo(id, type) {
				uni.navigateTo({
					url: '../gedan/gedan?id=' + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	scroll-view {
		position: fixed;
		white-space: nowrap;
		top: 0;
		z-index: 10;
		height: 130rpx;
		width: 100vw;
		background: linear-gradient(110.13149366494508deg, rgba(226, 235, 239, 1) 5.533854166666667%, rgba(208, 218, 224, 1) 96.67968749999999%);

		text {
			display: inline-block;
			height: 40rpx;
			line-height: 40rpx;
			border-radius: 10rpx;
			margin: 43rpx 22rpx;
		}

		.active {
			color: #fff;
		}
	}

	.menu {
		width: 100%;
		margin-top: 140rpx;

		.item {
			margin-top: 10rpx;
			width: 100vw;
			height: 230rpx;

			.left {
				float: left;
				width: 45%;
				height: 100%;

				image {
					width: 62%;
					height: 88%;
					border-radius: 20rpx;
					margin-left: 40rpx;
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
