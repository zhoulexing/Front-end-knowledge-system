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

  preview: function(e) {
    const src = '/images/harmful.jpg';
    wx.previewImage({
      current: src,
      urls: ['/images/harmful.jpg', '/images/recyclable.jpg']
    });
  },
})
