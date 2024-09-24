import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function Match () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='match'>
      <Text>Hello world!</Text>
    </View>
  )
}
