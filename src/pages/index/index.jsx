import { View, Text } from '@tarojs/components'
import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import './index.less'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
    Taro.showLoading({
			title: '加载中...'
		})
    const intervalId = setInterval(() => {
      const logined = Taro.getStorageSync('logined')
      if (logined === 1) {
        console.log("Login is true, stopping the check.");
        clearInterval(intervalId); // 停止检查
      } else {
        console.log("Login is still false, checking again...");
      }
    }, 10);
    Taro.hideLoading()
  })

  useDidShow(() => {
    console.log('Page did show.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}
