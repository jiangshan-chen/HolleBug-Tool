import request from './axios'
//供货列表
export function getData(data) {
	return request({
		url: 'https://api.66mz8.com/api/music.163.php?format=json',
		method: 'post',
		data
	})
}
