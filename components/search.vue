<template>
	<view class="search">
		<input type="text" :placeholder="text" v-model="search" @confirm="startSearch" />
	</view>
</template>

<script>
	import {
		defaultSearch,
	} from '../network/serch.js';
	export default {
		name: "search",
		data() {
			return {
				search: "",
				text: '',
				real: ''
			};
		},
		mounted() {
			defaultSearch().then(res => {
				this.text = res.data.data.showKeyword;
				this.real = res.data.data.realkeyword;
			})

		},
		methods: {
			//搜索跳转
			startSearch() {
				if (this.search == "") {
					this.search = this.real;
				}
				var pages = getCurrentPages() // 获取栈实例
				let currentRoute = pages[pages.length - 1].route; // 获取当前页面路由,如果是搜索页就不需要跳转
				if (!currentRoute.includes('search')) {
					uni.navigateTo({
						url: '../search/search?search=' + this.search
					})
				}else{
					this.$emit('searchStart',this.search);
				}
				this.search = "";
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		height: 100rpx;
		background-color: #999999;
		overflow: hidden;

		input {
			display: block;
			width: 95%;
			height: 60rpx;
			background-color: #fff;
			margin: 20rpx auto;
			padding-left: 20rpx;
			border-radius: 5px;
		}
	}
</style>
