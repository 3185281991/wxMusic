import cacheApi from './cache.js';
//推荐视频
export function recommendVideo(offset = 10) {
	return cacheApi.cacheRequest({
		url: "/video/timeline/recommend",
		data: {
			offset
		}
	})
}
//相关视频
export function relatedVideo(id) {
	return cacheApi.cacheRequest({
		url: '/related/allvideo',
		data: {
			id
		}
	})
}
//视频详情
export function detailVideo(id) {
	return cacheApi.cacheRequest({
		url: '/video/detail',
		data: {
			id
		}
	})
}
