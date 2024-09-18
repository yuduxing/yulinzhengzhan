import Taro from "@tarojs/taro";
import { View, Text } from '@tarojs/components'
import { useLoad, useDidShow } from '@tarojs/taro'
import './index.less'
import { checkHasLogined, authorize } from '../../utils/index.js'
import React, { useState } from 'react';

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
