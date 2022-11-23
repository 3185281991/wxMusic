import cacheApi from './cache.js';
//歌单所有歌曲
export function allSongs(id, offset = 0, limit = 15) {
	return cacheApi.cacheRequest({
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
	return cacheApi.cacheRequest({
		url: '/playlist/detail',
		data: {
			id
		}
	})
}
//歌单播放量
export function menuCount(id) {
	return cacheApi.cacheRequest({
		url: '/playlist/update/playcount',
		data: {
			id
		}
	})
}
//歌单评论
export function menuComments(id, offset = 1, limit = 20) {
	return cacheApi.cacheRequest({
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
	return cacheApi.cacheRequest({
		url: '/related/playlist',
		data: {
			id
		}
	})
}
//歌单详情动态
export function detaildynamic(id) {
	return cacheApi.cacheRequest({
		url: '/playlist/detail/dynamic',
		data: {
			id
		}
	})
}
