<template>
	<view>
		<view class="oth">
			<swiper :vertical="true" @change='swiperChange'>
				<swiper-item class="mitem" v-for="(item,index) in mvList" :key="index" v-if="mvList!==[]">
					<video custom-cache="{undefined{false}}" :id="'video'+index" :src="item.mvUrl" controls
						:show-fullscreen-btn="false" :page-gesture="true"
						:class="{changeTop:(isShow && index===swiperIndex.index)}" :enable-play-gesture="true"
						v-if="index==swiperIndex.index && swiperIndex.flag"></video>
					<view v-else>
						<image class="vimg" :src="item.mvInfo.data.cover" mode="aspectFill" @click="start"></image>
					</view>
					<!-- mv信息 -->
					<view class="intro">
						<view class="singer">
							<text v-for="item1 in item.mvInfo.data.artists">{{item1.name}}</text>
						</view>
						<view class="name">
							<text>{{item.mvInfo.data.name}}</text>
						</view>
						<view class="other">
							<text>
								{{item.mvInfo.data.publishTime}} </text>
							<text class="iconfont icon-bofang"></text>
							<text>{{item.mvInfo.data.playCount}}
							</text>
						</view>
					</view>
					<!-- 评论 -->
					<view class="icon" v-if="!isShow">
						<text class="iconfont icon-pinglun" @click="commentsShow(index)"></text>
					</view>
					<scroll-view scroll-y="true" v-if="(isShow && index===swiperIndex.index)" :lower-threshold="150"
						@scrolltolower="getMoreComment(item)">
						<view class="close">
							<text class="iconfont icon-guanbi2" @click="closeComment(index)"></text>
						</view>
						<view class="comm">
							<!-- 热门评论 -->
							<view class="hot" v-if="item.hotComment.length!==0">
								<view class="ti">
									热门评论
								</view>
								<comment :comment="item.hotComment"></comment>
							</view>
							<!-- mv评论 -->
							<view class="all" v-if="item.allComment.length!==0">
								<view class="ti">
									所有评论
								</view>
								<comment :comment="item.allComment"></comment>
							</view>
							<view class="no" v-if="(item.allComment.length===0 && item.hotComment.length==0)">
								暂时没有更多评论
							</view>
						</view>

					</scroll-view>
				</swiper-item>

			</swiper>

		</view>

	</view>
</template>

<script>
	import {
		mvInfo,
		getMvUrl,
		similarMv,
		mvComments,
		hotComment,
		wangyiMv
	} from '../../network/mv.js';
	import {
		debounce
	} from '../../utils/index.js';
	import {
		privatecontent
	} from '../../network/music.js'
	import {
		singerMv
	} from '../../network/singer.js'
	import comment from '../../components/comment.vue';
	export default {
		data() {
			return {
				mvList: [],
				similarMv: [],
				list: {
					mvInfo: [],
					mvUrl: '',
					mvid: null,
					title: '',
					pageComment: 1,
					commentTotal: 0,
					pageHot: 1,
					hotTotal: 0,
					hotComment: [],
					allComment: [],
				},
				type: '',
				isShow: false,
				swiperIndex: {
					index: 0,
					flag: false,
				},
				otherList: [],
				page: 0,
				videoContext: ''
			}
		},
		components: {
			comment
		},

		onReady: function() {
			this.videoContext = uni.createVideoContext("video0", this);
			this.videoContext.play();
		},
		mounted() {},
		onLoad(options) {
			//暂停歌曲
			this.$store.commit('setPause');
			let mvid = options.id;
			this.type = options.type;
			this.refresh(mvid);
			if (this.type === "独家") {
				this.getprivatecontent();
			}
			if (this.type === 'video') {
				this.getsimilarMv(mvid);
			}
			if (this.type === '网易MV') {
				this.getwangyiMv();
			}
		},
		methods: {
			getmvInfo(mvid) {
				return mvInfo(mvid).then(res => {
					this.list.mvInfo = res.data
					this.list.title = res.data.data.name;
				})
			},
			getMvUrl(mvid) {
				return getMvUrl(mvid).then(res => {
					let url = res.data.data.url;
					if (url) {
						this.list.mvUrl = res.data.data.url;
					} else {
						this.list.mvUrl = "";
					}
				})
			},
			//歌手mv
			getsingerMv(id) {
				singerMv(id).then(res)
			},
			//相似mv
			getsimilarMv(mvid) {
				similarMv(mvid).then(res => {
					//拿到相似mv后遍历拿到所有信息
					let data = res.data.mvs;
					for (let i = 0; i < data.length; i++) {
						let mvidx = data[i].id;
						this.refresh(mvidx);
					}
				})
			},
			//评论信息
			mvComments(mvid, offset = 1) {
				return mvComments(mvid, offset).then(res => {
					this.list.allComment = res.data.comments;
					this.list.commentTotal = res.data.total;
				})
			},
			//热门pinlun
			getHotComment(mvid, offset = 1) {
				return hotComment(mvid, offset).then(res => {
					this.list.hotComment = res.data.hotComments;
					this.list.hotTotal = res.data.total;
				})
			},
			//独家放送5
			getprivatecontent() {
				privatecontent(0, 5).then(res => {
					let data = res.data.result;
					for (let i = 0; i < data.length; i++) {
						let mvidx = data[i].id;
						this.refresh(mvidx);
					}
				})
			},
			//网易出品mv5
			getwangyiMv() {
				wangyiMv(0, 5).then(res => {
					let data = res.data.data;
					for (let i = 0; i < data.length; i++) {
						let mvidx = data[i].id;
						this.refresh(mvidx);
					}
				})
			},
			//上拉加载网易出品mv
			morewangyiMv() {
				let offset = (this.page + 1) * 5;
				wangyiMv(offset, 5).then(res => {
					this.page = this.page + 1;
					let data = res.data.data;
					for (let i = 0; i < data.length; i++) {
						let mvidx = data[i].id;
						this.refresh(mvidx);
					}
				})
			},
			//上拉加载独家
			moreprivatecontent() {
				let offset = (this.page + 1) * 10;
				privatecontent(offset, 5).then(res => {
					this.page = this.page + 1;
					let data = res.data.result;
					for (let i = 0; i < data.length; i++) {
						let mvidx = data[i].id;
						this.refresh(mvidx);
					}
				})
			},
			//刷新数据
			refresh(mvid) {
				//调用promise.all方法等待所有数据请求成功后
				Promise.all([this.getmvInfo(mvid), this.getMvUrl(mvid), this.mvComments(mvid, this.list
						.pageComment)],
					this.getHotComment(mvid, this.list.pageHot)).then(() => {
					this.list.mvid = mvid;
					if (this.list.mvInfo.data) {
						this.mvList.push(this.list);
					}
					this.reList();
				});
			},

			//初始化list信息
			reList() {
				this.list = {
					mvInfo: [],
					mvUrl: '',
					mvid: null,
					title: '',
					pageComment: 1,
					commentTotal: 0,
					pageHot: 1,
					hotTotal: 0,
					hotComment: [],
					allComment: [],
				}
			},
			//加载评论,每页默认20条
			moreHot(item) {
				if (item.pageHot * 20 < item.hotTotal) {
					let offset = titem.pageHot + 1;
					item.pageHot = offset;
					hotComment(item.mvid, offset).then(res => {
						let newData = res.data.hotComments;
						item.hotComment = item.hotComment.concat(newData);
					})

				}
			},
			moreComment(item) {
				if (item.pageComment * 20 < item.commentTotal) {
					let offset = item.pageComment + 1;
					item.pageComment = offset;
					mvComments(item.mvid, offset).then(res => {
						let newData = res.data.comments;
						item.allComment = item.allComment.concat(newData);
					})

				}
			},
			//显示评论
			commentsShow(index) {
				this.isShow = true;
			},
			//关闭评论
			closeComment(index) {
				this.isShow = false;
			},
			//播放歌曲
			start() {
				this.swiperIndex.flag = true;
			},
			//更多评论
			getMoreComment(item) {
				this.moreHot(item);
				this.moreComment(item);
			},
			//轮播图改变
			swiperChange(e) {
				//拿到当前的轮播下标,同时需要让评论关闭
				this.videoContext.pause();
				this.swiperIndex.index = e.detail.current;
				this.swiperIndex.flag = false;
				//根据当前下标动态绑定video上下文
				this.videoContext = uni.createVideoContext('video' + this.swiperIndex.index, this);
				this.isShow = false;
				this.videoContext.play();
				//当前为最后一个的时候，就加载10个新的视频
				if (this.swiperIndex.index === this.mvList.length - 1) {
					if (this.type === "独家") {
						this.moreprivatecontent();
					}
					if (this.type === 'video') {
						this.getsimilarMv(this.mvList[this.swiperIndex.index].mvid)
					}
					if (this.type === '网易MV') {
						this.morewangyiMv()
					}
				}
			}
		},
	}
</script>

<style lang="scss">
	.oth {
		width: 100%;

		swiper {
			width: 100vw;
			height: 100vh;

			swiper-item {
				width: 100vw;
				height: 100vh;
				background-color: black;

				video,
				.vimg {
					position: relative;
					top: 28%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 100vw;
					max-height: 100%;
				}

				.vimg {
					transform: translate(-50%, 35%);
				}

				.changeTop {
					top: 20%;
				}

				.intro {
					width: 100%;
					position: absolute;
					bottom: 32%;

					view {
						width: 100vw;
						color: #FFFFFF;
						height: 60rpx;
						margin-top: 20rpx;
					}

					.singer {
						text {
							height: 60rpx;
							line-height: 60rpx;
							display: block;
							float: left;
							margin-left: 20rpx;
							font-size: 39rpx;
						}

						text:nth-child(1) {
							margin-left: 1%;
						}

						text:nth-child(2) {
							margin-left: 80rpx;
						}

					}

					.name {

						text {
							display: block;
							float: left;
							margin-left: 1%;
							font-size: 33rpx;
						}
					}

					.other {
						text {
							display: block;
							float: left;
							margin-left: 20rpx;
							font-size: 30rpx;
						}

						text:nth-child(1) {
							margin-left: 1%;
						}

						text:nth-child(2) {
							margin-left: 80rpx;
						}
					}
				}

				.icon {
					z-index: 0;
					width: 80rpx;
					display: flex;
					position: absolute;
					right: 4%;
					top: 48%;
					flex-direction: column;
					color: white;

					text {
						font-size: 70rpx;
					}
				}

				scroll-view {
					z-index: 10;
					position: absolute;
					width: 100vw;
					height: 59%;
					top: 40%;
					background-color: white;

					.comm {
						width: 100%;

						.ti,
						.no {
							text-align: center;
							width: 100%;
							height: 80rpx;
							line-height: 80rpx;
							font-size: 35rpx;
							background-color: #BBFFFF;
						}
					}

					.close {
						position: fixed;
						right: 25rpx;
						top: 47%;
						width: 80rpx;
						height: 80rpx;

						text {
							display: block;
							width: 100%;
							height: 100%;
							font-size: 60rpx;
						}
					}


				}
			}
		}
	}
</style>
