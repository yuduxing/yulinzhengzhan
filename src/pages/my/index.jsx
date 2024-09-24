import { View, Image, Button, Input } from "@tarojs/components";
import { useLoad, useDidShow } from "@tarojs/taro";
import { useState } from "react";
import "./index.less";
import { checkHasLogined, authorize, getUserInfo } from "../../utils/index.js";
import defaultPng from "../../images/default.png";

export default function Index() {
  // 使用 useState 定义一个状态变量 userInfo，初始值为一个空对象
  const [userInfo, setUserInfo] = useState({ avatar: null, nickname: null });

  useLoad(() => {
    console.log("Page loaded.");
  });

  useDidShow(() => {
    console.log("Page did show.");
    checkHasLogined().then((isLogined) => {
      if (!isLogined) {
        authorize().then((loginData) => {
          console.log(loginData);
          setUserInfo(loginData);
        });
      } else {
        getUserInfo().then((userData) => {
          console.log(userData);
          setUserInfo(userData.data);
        });
      }
    });
  });

  const onChooseAvatar = (event) => {
    console.log(event);
  };

  const handleNickNameReview = (event) => {
    console.log(event);
  };

  return (
    <View className='index'>
      <View className='header'>
        <View className='header__left'>
          <Button open-type='chooseAvatar' onChooseAvatar={onChooseAvatar}>
            <Image
              src={userInfo.avatar ? userInfo.avatar : defaultPng}
              className='header__img'
            />
          </Button>
          <View className='header__info'>
            <View className='header__info__name'>
              <Input
                controlled={false}
                name='name'
                value={userInfo?.nickname}
                type='nickname'
                onNickNameReview={handleNickNameReview}
                placeholder='自定义昵称'
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
