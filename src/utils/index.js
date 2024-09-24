import Taro from "@tarojs/taro";
import api from '../services/api' 

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
        api.post('wechat/wechatLogin', {code: code}).then(data => {
          if(data.code === 0) {
            const loginData = data.data;
            Taro.setStorageSync('token', loginData.token)
            Taro.setStorageSync('uid', loginData.uid)
            resolve(data)
          } else {
            reject(new Error(data.msg))
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
  return api.get('users/' + Taro.getStorageSync('uid'))
}