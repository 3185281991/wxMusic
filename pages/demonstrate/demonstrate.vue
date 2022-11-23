<template>
	<view>
		<view class="top">
			<text>此小程序所需数据皆来自github项目地址：https://github.com/Binaryify/NeteaseCloudMusicApi</text>
			<text>此小程序不可用于商用用途！</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.top {
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translate(-50%, -50%);
		width: 90%;
		background-color: #F8F8F8;

		text {
			word-break: break-all;
			display: block;
			line-height: 80rpx;
			font-size: 35rpx;
		}
		text:nth-child(2){
			text-align: center;
			color: red;
			font-size: 45rpx;
		}
	}
</style>
