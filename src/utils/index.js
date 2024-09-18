import Taro from "@tarojs/taro";
import { post, get } from '../services/api.js' 

const checkSession = async () => {
  return new Promise((resolve, reject) => {
    Taro.checkSession({
      success() {
        return resolve(true)
      },
      fail() {
        return reject(false)
      }
    })
  })
}

// 检测登录状态，返回 true / false
export const checkHasLogined = async () => {
  const token = Taro.getStorageSync('token')
  if (!token) {
    return false
  }
  const loggined = await checkSession()
  if (!loggined) {
    Taro.removeStorageSync('token')
    return false
  }

  return true
}

export const authorize = async () => {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: (res) => {
        const code = res.code
        post('wechat/wechatLogin', {code: code}).then(data => {
          if(data.code === 0) {
            const loginData = data.data;
            Taro.setStorageSync('token', loginData.token)
            Taro.setStorageSync('uid', loginData.uid)
            resolve(data)
          } else {
            Taro.showToast({
              title: data.msg,
              icon: 'none'              
            })
          }
        })
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export const getUserInfo = async () => {
  return get('users/' + Taro.getStorageSync('uid'))
}