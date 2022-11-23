import cacheApi from './cache.js';
export function getMusicUrl(id) {
	return cacheApi.cacheRequest({
		url: '/song/url',
		data: {
			id
		},
	},5000)
}
//歌曲详情
export function musicDetialInfo(ids) {
	return cacheApi.cacheRequest({
		url: '/song/detail',
		data: {
			ids
		}
	})
}
//歌词
export function getlyric(id) {
	return cacheApi.cacheRequest({
		url: '/lyric',
		data: {
			id
		}
	})
}
//相似歌曲
export function similarMusic(id) {
	return cacheApi.cacheRequest({
		url: '/simi/song',
		data: {
			id
		}
	})
}
////专辑信息
export function editorInfo(id) {
	return cacheApi.cacheRequest({
		url: '/album',
		data: {
			id
		}
	})
}
