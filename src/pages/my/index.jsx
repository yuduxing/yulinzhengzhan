import { View, Image } from '@tarojs/components'
import { useLoad, useDidShow } from '@tarojs/taro'
import  { useState } from 'react';
import './index.less'
import { checkHasLogined, authorize, getUserInfo } from '../../utils/index.js'

export default function Index () {
  // 使用 useState 定义一个状态变量 userInfo，初始值为一个空对象
  const [userInfo, setUserInfo] = useState({ });

  useLoad(() => {
    console.log('Page loaded.')
  })

  useDidShow(() => {
    console.log('Page did show.')
    checkHasLogined().then(isLogined => {
      if (!isLogined) {
        authorize().then(loginData => {
          console.log(loginData)
          setUserInfo(loginData)
        })
      } else {
        getUserInfo().then(userData => {
          console.log(userData)
          setUserInfo(userData.data)
        })
      }
    })
  })

  return (
    <View className='index'>
      <View className='header'>
          <View className='header__left'>
            <Image
              src={`${userInfo?.avatar}?imageView&thumbnail=250x0`}
              className='header__img'
            />
            <View className='header__info'>
              <View className='header__info__name'>
                {userInfo?.nickname}
              </View>
            </View>
          </View>
        </View>
    </View>
  )
}
