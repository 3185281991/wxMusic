export function slice(arr, num) {
	let rs = [];
	for (var i = 0; i < arr.length; i += num) {
		rs.push(arr.slice(i, i + num));
	}
	return rs;
}
//节流
export function throttle(fun, delay = 1500) {
	let cRun = true;
	return function() {
		if (!cRun) {
			return;
		}
		cRun = false;
		setTimeout(() => {
			fun.apply(this);
			cRun = true;
		}, delay)
	}
}
//防抖
export function debounce(fn, delay = 1500) {
	let timer;
	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn.call(context, ...args);
		}, delay);
	};
}
//歌词处理
export function lyric(time, lyric, str) {
	let reg = /\[(\d{2}:\d{2}.\d{2,3})\](.+)/g;
	str = str.replace("\n\r", '');
	let temp = reg.exec(str);
	while (temp) {
		time.push(temp[1].slice(0, 5));
		lyric.push(temp[2]);
		temp = reg.exec(str);
	}
}
