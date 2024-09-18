import { View, Text } from '@tarojs/components'
import { Taro, useLoad, useDidShow } from '@tarojs/taro'
import './index.less'
import { checkHasLogined } from '../../utils/index.js'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  useDidShow(() => {
    console.log('Page did show.')
    checkHasLogined().then(isLogined => {
      if (!isLogined) {
        Taro.navigateTo({
          url: 'pages/my/index'
        })
      }
    })
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}
