const app = getApp();

Page({
  data: {
    userInfo: {},
    navbarData: {
      showCapsule: 1, //是否现实在左上角， 1表示现实， 0表示不显示
      title: "我的主页"
    },
    height: app.globalData.height,
  },
  onLoad: function () {
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
      console.log("up:", this.data.userInfo);
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        });
      }
      console.log("down:", this.data.userInfo);
    }
  },
})
