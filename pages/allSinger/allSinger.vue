<template>
	<view class="allsing">
		<view class="nav">
			<view class="area">
				<text v-for="(item,indexa) in area" :key='indexa' :class="{active:indexa===aIndex}"
					@click="search1(item,indexa)">{{item.type}}</text>
			</view>
			<view class="type">
				<text v-for="(item,index) in type" :key="index" :class="{active:index===tIndex}"
					@click="search2(item,index)">{{item.type}}</text>
			</view>
		</view>
		<view class="sing">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
				@scrolltolower="lower" @scroll="scroll">
				<view class="item" v-for="(item,indexs) in singList" :key="indexs" @click="jumpTosingInfo(item.id)">
					<view class="img">
						<easy-loadimage 
					    :scroll-top="scrollTop"
					    :image-src="item.picUrl"
						loadingMode="spin-circle"></easy-loadimage>
					</view>
					
					<text>{{item.name}}</text>
				</view>
			</scroll-view>

		</view>
	</view>
	</view>
</template>

<script>
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	import {
		singlist
	} from '../../network/singer.js';
	export default {
		data() {
			return {
				scrollTop:0,
				area: [{
					type: '全部',
					index: -1
				}, {
					type: '华语',
					index: 7
				}, {
					type: '欧美',
					index: 96
				}, {
					type: '日本',
					index: 8
				}, {
					type: '韩国',
					index: 16
				}, {
					type: '其他',
					index: 0
				}],
				type: [{
					type: '全部',
					index: -1
				}, {
					type: '男',
					index: 1
				}, {
					type: '女',
					index: 2
				}, {
					type: '乐队',
					index: 3
				}],
				//下标
				aIndex: 0,
				tIndex: 0,
				//类型
				areaF: -1,
				typeF: -1,
				singList: [],
				name: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
					'u', 'v', 'w', 'x', 'y', 'z'
				],
				nameIndex: 0
			}
		},
		components:{easyLoadimage},
		onReachBottom() {
			this.moreSinger(this.areaF, this.typeF)
		},
		onLoad() {
			this.gethotsinglist();
		},
		onPageScroll({scrollTop}) {
		    // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
		    this.scrollTop = scrollTop;
		},
		methods: {
			//歌手分类,默认热门20
			gethotsinglist() {
				singlist(-1, -1, -1, 0, 20).then(res => {
					let data = res.data.artists;
					this.singList = this.singList.concat(data);
				})
			},
			//每一种字母开头只拿20个
			moreSinger(area, type) {
				let initial = this.name[this.nameIndex];
				singlist(type, area, initial, 0, 10).then(res => {
					let data = res.data.artists;
					this.nameIndex++;
					this.singList = this.singList.concat(data);
				})
			},
			getsingList(type, area) {
				//需要先清空之前的歌手信息
				this.singList = [];
				if (type === -1 && area === -1) {
					this.gethotsinglist();
				}
				let initial = this.name[this.nameIndex];
				singlist(type, area, initial, 0, 10).then(res => {
					let data = res.data.artists;
					this.nameIndex++;
					this.singList = this.singList.concat(data);
				})
			},
			search1(item, index) {
				this.aIndex = index;
				this.areaF = item.index;
				this.nameIndex = 0;
				this.getsingList(this.typeF, this.areaF)
			},
			search2(item, index) {
				this.tIndex = index;
				this.typeF = item.index;
				this.nameIndex = 0;
				this.getsingList(this.typeF, this.areaF)
			},
			//跳转到歌手详情页
			jumpTosingInfo(id) {
				uni.navigateTo({
					url: '../singInfo/singInfo?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.allsing {
		background-color: #d9d9d9;
		overflow: hidden;
	}

	.nav {
		width: 100%;
		height: 240rpx;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #d9d9d9;

		view {
			width: 100%;
			height: 100rpx;

			text {
				text-align: center;
				display: block;
				float: left;
				width: 96rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 30rpx;
				border-radius: 20rpx;
				margin-top: 20rpx;
				margin-left: 25rpx;
				background-color: white;
			}

			.active {
				background-color: #BBFFFF;
				color: white;
			}
		}

		.area {
			margin-top: 20rpx;
		}
	}

	.sing {
		width: 100vw;
		position: relative;
		top: 240rpx;

		.item {
			width: 100%;
			height: 150rpx;

			.img {
				width: 117rpx;
				height: 125rpx;
				float: left;
				margin-left: 32rpx;
			}

			text {
				float: left;
				margin-top: 45rpx;
				height: 60rpx;
				line-height: 60rpx;
				display: block;
				margin-left: 50rpx;
				font-size: 35rpx;
			}
		}
	}
</style>
