const app = getApp();

Page({
  data: {
    userInfo: {},
  },
  onLoad: function () {
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        });
      }
    }
  },
})
