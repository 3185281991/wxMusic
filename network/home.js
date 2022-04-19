import request from './index.js';
//登录
export function getLogin(phone, password) {
	return request({
		url: '/login/cellphone',
		data: {
			phone,
			password
		}
	});
}
//首页轮播图片
export function getBanner() {
	return request({
		url: '/banner?type=1'
	})
}

//推荐新音乐
export function recommendNewMusic() {
	return request({
		url: '/personalized/newsong'
	})
}
//推荐歌单
export function recommendSongMenu(limit = 24) {
	return request({
		url: '/personalized',
		data: {
			limit
		}
	})
}
//新歌速递
export function newSong(type = 0) {
	return request({
		url: '/top/song',
		data: {
			type
		}
	})
}

//独家放送3
export function privatecontent() {
	return request({
		url: '/personalized/privatecontent'
	})
}

