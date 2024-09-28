import Taro, { useLaunch } from "@tarojs/taro";
import { authorize } from "./utils/index";
import "./app.less";

function App({ children }) {
  useLaunch((options) => {
    console.log("App launched.");
    console.log("onLaunch", options);
    Taro.setStorageSync("enterPath", options.path);
    Taro.setStorageSync("logined", 0)
    Taro.getSystemInfo().then((sysRes) => {
      Taro.setStorageSync("sys_info", sysRes);
    });
    authorize().then(() => {
      Taro.setStorageSync("logined", 1)
    }).catch((err) => {
      Taro.showModal({
        title: "授权失败",
        content: err.message,
      });
    });
  });

  const updateManager = Taro.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate);
  });
  updateManager.onUpdateReady(function () {
    Taro.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
