export default defineAppConfig({
  pages: ["pages/index/index", "pages/my/index", "pages/match/index"],

  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "羽林征战",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    selectedColor: '#337ab7',
    position: 'bottom',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '新建',
        iconPath: 'images/icon/add_light.png',
        selectedIconPath: 'images/icon/add.png',
      },
      {
        pagePath: 'pages/match/index',
        text: '赛事',
        iconPath: 'images/icon/find.png',
        selectedIconPath: 'images/icon/find_active.png',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'images/icon/my.png',
        selectedIconPath: 'images/icon/my_active.png',
      },
    ],
  },
});
