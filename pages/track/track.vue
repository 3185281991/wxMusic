<template>
	<view>
		<view class="item" v-for="(item,indexx) in trackList" :key="indexx" @click="conreteInfo(item.id)">
			<view class="left">
				<image :src="item.coverImgUrl" mode=""></image>
			</view>
			<view class="right">
				<view><text>{{item.name}}</text><text> {{item.updateFrequency}}</text></view>
				<view class="list" v-for="(item1,index) in item.tracks">
					<text>{{index+1}} {{item1.first}}--{{item1.second}}</text>
				</view>
			</view>
		</view>
		<view class="item" v-for="(item,index) in allTop" :key="index" @click="conreteInfo(item.id)">
			<view class="left">
				<image :src="item.coverImgUrl" mode=""></image>
			</view>
			<view class="rightx">
				<view><text>{{item.name}}</text><text> {{item.updateFrequency}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		toplistDetail
	} from '../../network/music.js'
	export default {
		data() {
			return {
				allTop: [],
				trackList: []
			}
		},
		onLoad() {
			this.gettoplistDetail();
		},
		methods: {
			//所有榜单
			gettoplistDetail() {
				toplistDetail().then(res => {
					this.trackList = res.data.list.slice(0, 4);
					this.allTop = res.data.list.slice(4, );
				})
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
	.item {
		margin-top: 10rpx;
		width: 100vw;
		height: 300rpx;



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

	.rightx {
		float: left;
		width: 58%;
		height: 100%;
		display: flex;
		align-items: center;

		view {
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
	}
</style>
