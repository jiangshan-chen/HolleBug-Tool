import axios from 'axios'
import uView from "uview-ui";

// 创建一个错误
function errorCreate(msg) {
	const error = new Error(msg)
	errorLog(error)
	throw error
}
export function setToken (token) {
	service.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
// 记录和显示错误
function errorLog(error) {
	// 显示提示
	console.log(error.message)
}
// 创建一个 axios 实例
const service = axios.create({
	baseURL: '',
	timeout: 60000, // 请求超时时间
	headers: {
		common: {
			Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('user')||"{}").accessToken
		}
	}
	// withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
	config => {
		try{
			var user = JSON.parse(localStorage.getItem('user'))
			if(user && new Date().valueOf() - user.tokenTime > user.expireInSeconds*1000){
        
			} 
		}catch(e){
			// Notify({
			// 	type:'warning',
			// 	message:'登录信息过期'
			// })
		}
		return config
	},
	error => {
		// 发送失败
		Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	response => {
		// dataAxios 是 axios 返回数据中的 data
		const dataAxios = response.data
		// 这个状态码是和后端约定的
		const {
			code
		} = dataAxios
		// 根据 code 进行判断
		if (code === undefined) {
			// 如果没有 code 代表这不是项目后端开发的接口 比如可能是 vuex 请求最新版本
			return dataAxios
		} else {
			// 有 code 代表这是一个后端接口 可以进行进一步的判断
			switch (code) {
				case 200:
					// [ 示例 ] code === 0 代表没有错误
					return dataAxios.result
				case 'xxx':
					// [ 示例 ] 其它和后台约定的 code
					errorCreate(`[ code: xxx ] ${dataAxios.message}`)
					break
				default:
					// 不是正确的 code
					errorCreate(`${dataAxios.message}`)
					break
			}
		}
	},
	error => {
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = '请求错误';
					break
				case 401:
					error.message = '未授权，请登录';
					break
				case 403:
					error.message = '拒绝访问';
					break
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`;
					break
				case 408:
					error.message = '请求超时';
					break
				case 500:
					error.message = '服务器内部错误';
					break
				case 501:
					error.message = '服务未实现';
					break
				case 502:
					error.message = '网关错误';
					break
				case 503:
					error.message = '服务不可用';
					break
				case 504:
					error.message = '网关超时';
					break
				case 505:
					error.message = 'HTTP版本不受支持';
					break
				default:
					break
			}
		}
		errorLog(error)
		return Promise.reject(error)
	}
)

export default service
