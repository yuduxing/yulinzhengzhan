import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constants/status.js'
import { logError } from '../utils/error.js'

export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let contentType = 'application/json'
    data = {
      ...data,
      timestamp: new Date().getTime()
    }
    const option = {
      url: url.indexOf('http') !== -1 ? url : process.env.TARO_APP_API + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'Authorization': 'Bear ' + Taro.getStorageSync('token')
      },
      // mode: 'cors',
      xhrFields: { withCredentials: true },
      success(res) {
        console.log('res', res)
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          return logError('api', '请先登录')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        } else {
          return logError('api', '未知错误' + res.statusCode)  
        }
      },
      error(e) {
        logError('api', '请求接口出现问题' + JSON.stringify(e))
      }
    }
    // eslint-disable-next-line
    return Taro.request(option)
  },
  get(url, data) {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}
