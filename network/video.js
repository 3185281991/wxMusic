import request from './index.js'
//推荐视频
export function recommendVideo(offset = 10) {
	return request({
		url: "/video/timeline/recommend",
		data: {
			offset
		}
	})
}
//相关视频
export function relatedVideo(id) {
	return request({
		url: '/related/allvideo',
		data: {
			id
		}
	})
}
//视频详情
export function detailVideo(id) {
	return request({
		url: '/video/detail',
		data: {
			id
		}
	})
}
