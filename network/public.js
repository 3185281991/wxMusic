import request from './index.js';
export function getMusicUrl(id) {
	return request({
		url: '/song/url',
		data: {
			id
		},
	},5000)
}
//歌曲详情
export function musicDetialInfo(ids) {
	return request({
		url: '/song/detail',
		data: {
			ids
		}
	})
}
//歌词
export function getlyric(id) {
	return request({
		url: '/lyric',
		data: {
			id
		}
	})
}
//相似歌曲
export function similarMusic(id) {
	return request({
		url: '/simi/song',
		data: {
			id
		}
	})
}
////专辑信息
export function editorInfo(id) {
	return request({
		url: '/album',
		data: {
			id
		}
	})
}
