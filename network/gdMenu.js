import request from './index.js';
//歌单所有歌曲
export function allSongs(id, offset = 0, limit = 15) {
	return request({
		url: '/playlist/track/all',
		data: {
			id,
			offset,
			limit
		}
	},4000)
}
//歌单详情
export function detailMenu(id) {
	return request({
		url: '/playlist/detail',
		data: {
			id
		}
	})
}
//歌单播放量
export function menuCount(id) {
	return request({
		url: '/playlist/update/playcount',
		data: {
			id
		}
	})
}
//歌单评论
export function menuComments(id, offset = 1, limit = 20) {
	return request({
		url: '/comment/playlist',
		data: {
			id,
			offset,
			limit
		}
	})
}
//相关歌单
export function aboutSongsMenu(id) {
	return request({
		url: '/related/playlist',
		data: {
			id
		}
	})
}
//歌单详情动态
export function detaildynamic(id) {
	return request({
		url: '/playlist/detail/dynamic',
		data: {
			id
		}
	})
}
