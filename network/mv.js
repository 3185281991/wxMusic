import cacheApi from './cache.js';
//mv信息
export function mvInfo(mvid, timeout) {
	return cacheApi.cacheRequest({
		url: '/mv/detail',
		data: {
			mvid
		},
	}, 3000)
}
//mv播放地址
export function getMvUrl(id, r = 1080) {
	return cacheApi.cacheRequest({
		url: '/mv/url',
		data: {
			id,
			r
		}
	})
}
//相识mv
export function similarMv(mvid) {
	return cacheApi.cacheRequest({
		url: '/simi/mv',
		data: {
			mvid
		}
	})
}
//mv评论
export function mvComments(id, offset = 1) {
	return cacheApi.cacheRequest({
		url: '/comment/mv',
		data: {
			id,
			offset
		}
	})
}
//mv热门评论
export function hotComment(id, offset = 1, type = 1) {
	return cacheApi.cacheRequest({
		url: '/comment/hot',
		data: {
			id,
			offset,
			type
		}
	})
}
//推荐mv
export function personalizedMv() {
	return cacheApi.cacheRequest({
		url: "/personalized/mv"
	})
}
//网易出品mv
export function wangyiMv(offset = 0, limit = 20) {
	return cacheApi.cacheRequest({
		url: '/mv/exclusive/rcmd',
		data: {
			offset,
			limit
		}
	})
}
