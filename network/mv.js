import request from './index.js'
//mv信息
export function mvInfo(mvid, timeout) {
	return request({
		url: '/mv/detail',
		data: {
			mvid
		},
	}, 3000)
}
//mv播放地址
export function getMvUrl(id, r = 1080) {
	return request({
		url: '/mv/url',
		data: {
			id,
			r
		}
	})
}
//相识mv
export function similarMv(mvid) {
	return request({
		url: '/simi/mv',
		data: {
			mvid
		}
	})
}
//mv评论
export function mvComments(id, offset = 1) {
	return request({
		url: '/comment/mv',
		data: {
			id,
			offset
		}
	})
}
//mv热门评论
export function hotComment(id, offset = 1, type = 1) {
	return request({
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
	return request({
		url: "/personalized/mv"
	})
}
//网易出品mv
export function wangyiMv(offset = 0, limit = 20) {
	return request({
		url: '/mv/exclusive/rcmd',
		data: {
			offset,
			limit
		}
	})
}
