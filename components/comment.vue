<template>
	<view>
		<view class="item" v-for="(item,index) in comment" :key="index">
			<view class="top">
				<image :src="item.user.avatarUrl" ></image><view class="xz">
			    	<text>{{item.user.nickname}}</text>
				<text>{{item.timeStr}}</text>
			    </view>
				
			</view>
			<view class="btn">				
			    <text>{{item.content}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment",
		data() {
			return {

			};
		},
		props: {
			comment: {
				type: Array,
				default () {
					return []
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
view{
	width: 100%;
    .item{
		width: 100%;
		margin-top: 20rpx;
		.top{
			width: 100%;
			height: 160rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 15%;
				height: 70%;
				border-radius: 50%;
			}
			.xz{
				width: 60%;
				display: flex;
				justify-content: space-around;
				margin-left: 20rpx;
				text{
					display: block;
					width: 40%;
					overflow: hidden;
					text-align: center;
					height: 60rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.btn{
			width: 95%;
			margin: 20rpx auto;
			text{
				width: 100%;
				font-size: 30rpx;
			}
		}
	}
}
</style>
