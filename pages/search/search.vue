<template>
	<view>
		<view class="se">
			<search @searchStart="searchStart" />
		</view>
		<view class="hotKeyword">
			<view class="title">
				热搜列表
			</view>
			<text class="item" v-for="item in hotdetailSearch" :key="item.searchWord"
				@click="searchHot(item.searchWord)">
				{{item.searchWord}}
			</text>
		</view>
		<view class="result">
			<view class="ritem" v-for="item in searchList" @click="jumpToPlayer(item.id)">
				<text>{{item.name}}</text>
				<text>{{item.al.name}}</text>
				<text>{{item.ar[0].name}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		keySearch,
		hotSearch,
		hotDetailSearch,
		multiSearch
	} from '../../network/serch.js';

	import search from '../../components/search.vue';
	export default {
		data() {
			return {
				keywod: '',
				searchList: [],
				hotdetailSearch: [],
				multisearchList: [],
				page: 1,
				searchLength: null,
			}
		},
		components: {
			search,
		},
		onLoad(options) {
			this.keywod = options.search;
			this.gethotDetailSearch();
			this.getkeySearch(this.keywod, this.page);
		},
		methods: {
			//关键字搜索,默认30条
			getkeySearch(con, page) {
				keySearch(con, page).then(res => {
					this.searchList = res.data.result.songs;
					this.searchLength = res.data.result.songCount;
				})
			},
			//综合搜索
			getmultiSearch(con) {
				multiSearch(con).then(res => {
					console.log(res.data);
				})
			},
			//热门搜索
			gethotDetailSearch() {
				hotDetailSearch().then(res => {
					this.hotdetailSearch = res.data.data;
				})
			},
			//位于搜索页搜索调用
			searchStart(value) {
				this.keywod = value;
				this.page = 1;
				this.getkeySearch(this.keywod, this.page);
			},
			//上拉加载
			moreSongs(con, page) {
				if (page * 30 < this.searchLength) {
					let offset = page + 1;
					this.page = offset;
					keySearch(con, offset).then(res => {
						let newData = res.data.result.songs;
						this.searchList = this.searchList.concat(newData);
					})
				}else{
						uni.showToast({
							title:'暂无更多数据。'
						})
					}
			},
			//热门点击搜索
			searchHot(keyword) {
				this.page=1;
				this.getkeySearch(keyword,this.page);
			},
			//跳转到播放页
			jumpToPlayer(id) {
				uni.navigateTo({
					url: '../player/player?id=' + id+'&from=search&keyword='+this.keywod
				})

			}
		},
		onReachBottom() {
			this.moreSongs(this.keywod, this.page);
		},
		onHide() {
			this.page = 1;
		}
	}
</script>

<style scoped lang="scss">
	view {
		width: 100%;

		.title {
			width: 100%;
			font-size: 35rpx;
			padding-left: 15rpx;
			font-weight: bold;
		}

		.hotKeyword {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;

			.item {
				display: inline-block;
				height: 60rpx;
				line-height: 60rpx;
				margin-left: 15rpx;
				font-size: 30rpx;
				background-color: #EBEBEB;
				border-radius: 20rpx;
				margin-top: 10rpx;
			}
		}

		.result {
			margin-top: 15rpx;
			width: 100%;
			background-color: #FFFFFF;

			.ritem {
				margin-top: 5rpx;
				width: 100%;
				height: 60rpx;
				overflow: hidden;
				display: flex;
				justify-content: space-around;

				text {
					display: inline-block;
					height: 60rpx;
					line-height: 60rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					margin-left: 10rpx;
				}

				text:nth-child(1) {
					width: 30%;
				}

				text:nth-child(2) {
					width: 40%;
				}

				text:nth-child(3) {
					width: 25%;
				}
			}
		}
	}
</style>
