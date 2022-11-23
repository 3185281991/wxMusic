export default function request(options,timeout=5000) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: "http://124.221.69.31:3000" + options.url,
			data: options.data,
			method: options.method,
			timeout: timeout,
			success(res) {
				if (res.statusCode !== 200) {
					return uni.showToast({
						title: "服务器错误！"
					})
				}
				resolve(res);
			},
			fail(err) {
				uni.showToast({
					title: "请求错误！"
				})
				reject(err);
			}
		})
	})
}
