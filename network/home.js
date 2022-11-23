import cacheApi from './cache.js';
//登录
export function getLogin(phone, password) {
	return cacheApi.cacheRequest({
		url: '/login/cellphone',
		data: {
			phone,
			password
		}
	});
}
//首页轮播图片
export function getBanner() {
	return cacheApi.cacheRequest({
		url: '/banner?type=1'
	})
}

//推荐新音乐
export function recommendNewMusic() {
	return cacheApi.cacheRequest({
		url: '/personalized/newsong'
	})
}
//推荐歌单
export function recommendSongMenu(limit = 24) {
	return cacheApi.cacheRequest({
		url: '/personalized',
		data: {
			limit
		}
	})
}
//新歌速递
export function newSong(type = 0) {
	return cacheApi.cacheRequest({
		url: '/top/song',
		data: {
			type
		}
	})
}

//独家放送3
export function privatecontent() {
	return cacheApi.cacheRequest({
		url: '/personalized/privatecontent'
	})
}

