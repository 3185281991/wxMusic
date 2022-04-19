import request from './index.js'
//搜索部分
//默认搜索
export function defaultSearch() {
	return request({
		url: "/search/default"
	})
}
//关键字搜索,单曲
export function keySearch(keywords, offset=1,limit=30) {
	return request({
		url: "/cloudsearch",
		data: {
			keywords,
			offset,
			limit
		}
	})
}
//热搜列表(简略10个)
export function hotSearch(){
	return request({
		url:'/search/hot'
	})
}
//热搜列表(详细20)
export function hotDetailSearch(){
	return request({
		url:'/search/hot/detail'
	})
}
//多重匹配
export function multiSearch(keywords){
	return request({
		url:'/search/multimatch',
		data:{
			keywords
		}
	})
}