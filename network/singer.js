import request from './index.js'
//歌手榜
export function singerTop(type = 1) {
	return request({
		url: '/toplist/artist',
		data: {
			type
		}
	})
}
//热门歌手
export function hotSinger(offset = 0, limit = 30) {
	return request({
		url: '/top/artists',
		data: {
			offset,
			limit
		}
	})
}
//歌手全部歌曲默认按照热度
export function singerAllSing(id, offset = 0, limit = 20, order = 'hot') {
	return request({
		url: '/artist/songs',
		data: {
			id,
			offset,
			limit,
			order
		}
	})
}
//歌手分类
export function singlist(type = -1, area = -1, initial = -1, offset = 0, limit = 20) {
	return request({
		url: '/artist/list',
		data: {
			type,
			area,
			initial,
			offset,
			limit
		}
	}, 3000)
}
//歌手详细信息
export function singerDetailInfo(id) {
	return request({
		url: '/artist/detail',
		data: {
			id
		}
	})
}
//歌手mv
export function singerMv(id) {
	return request({
		url: '/artist/mv',
		data: {
			id
		}
	})
}
