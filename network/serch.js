import cacheApi from './cache.js';
//搜索部分
//默认搜索
export function defaultSearch() {
	return cacheApi.cacheRequest({
		url: "/search/default"
	})
}
//关键字搜索,单曲
export function keySearch(keywords, offset=1,limit=30) {
	return cacheApi.cacheRequest({
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
	return cacheApi.cacheRequest({
		url:'/search/hot'
	})
}
//热搜列表(详细20)
export function hotDetailSearch(){
	return cacheApi.cacheRequest({
		url:'/search/hot/detail'
	})
}
//多重匹配
export function multiSearch(keywords){
	return cacheApi.cacheRequest({
		url:'/search/multimatch',
		data:{
			keywords
		}
	})
}