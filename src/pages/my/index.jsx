import { View, Image, Text } from '@tarojs/components'
import { AtTabBar, AtIcon } from "taro-ui"
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <View className='header'>
          <View className='header__left' onClick={this.goUserDetail.bind(this)}>
            <Image
              src={`${userInfo?.profile?.avatarUrl}?imageView&thumbnail=250x0`}
              className='header__img'
            />
            <View className='header__info'>
              <View className='header__info__name'>
                {userInfo?.profile?.nickname}
              </View>
              <View>
                <Text className='header__info__level'>LV.{userInfo.level}</Text>
              </View>
            </View>
          </View>
          <AtIcon
            prefixClass='fa'
            value='sign-out'
            size='30'
            color='#d43c33'
            className='exit_icon'
            onClick={this.signOut.bind(this)}
          ></AtIcon>
        </View>
        <AtTabBar
          fixed
          selectedColor='#d43c33'
          tabList={[
            { title: '发现', iconPrefixClass: 'fa', iconType: 'feed' },
            { title: '我的', iconPrefixClass: 'fa', iconType: 'music' }
          ]}
          onClick={this.switchTab.bind(this)}
          current={this.state.current}
        />
    </View>
  )
}
