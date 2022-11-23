import cacheApi from './cache.js';

//精品歌单标签列表
export function BestMenuTag() {
	return cacheApi.cacheRequest({
		url: '/playlist/highquality/tags'
	})
}
//获取精品歌单
export function BestMenu(cat = '全部', before = '', limit = 20) {
	return cacheApi.cacheRequest({
		url: '/top/playlist/highquality',
		data: {
			cat,
			before,
			limit,
		}
	})
}
//歌单（网友精选碟）
export function menuW(offset = 0, limit = 20, cate = '全部', order = 'hot') {
	return cacheApi.cacheRequest({
		url: '/top/playlist',
		data: {
			offset,
			limit,
			cate,
			order
		}
	})
}

//独家放送列表
export function privatecontent(offset = 0, limit = 10) {
	return cacheApi.cacheRequest({
		url: '/personalized/privatecontent/list',
		data: {
			offset,
			limit
		}
	})
}
//全部新碟
export function allnewAlbum(offset=0,area='ALL',limit=20){
	return cacheApi.cacheRequest({
		url:'/album/new',
		data:{
			offset,area,limit
		}
	})
}
//新碟上架
export function newAlbum() {
	return cacheApi.cacheRequest({
		url: '/top/album',
	})
}
//榜单内容摘要
export function toplistDetail() {
	return cacheApi.cacheRequest({
		url: '/toplist/detail'
	})
}
