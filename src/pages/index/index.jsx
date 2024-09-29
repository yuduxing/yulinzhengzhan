import { View, Text } from "@tarojs/components";
import React from "react";
import Taro, { useLoad, useDidShow } from "@tarojs/taro";
import "./index.less";

export default function Index() {
  const [logined, setLogined] = React.useState(0);

  useLoad(() => {
    console.log("Page loaded.");
    const intervalId = setInterval(() => {
      const loginedStorage = Taro.getStorageSync("logined");
      if (loginedStorage === 1) {
        console.log("Login is true, stopping the check.");
        setLogined(1);
        clearInterval(intervalId); // 停止检查
      } else {
        console.log("Login is still false, checking again...");
      }
    }, 10);
  });

  useDidShow(() => {
    console.log("Page did show.");
  });

  return (
    <View className="index">
      {logined === 0 ? <Text>Loading</Text> : <Text>Hello world!</Text>}
    </View>
  );
}
