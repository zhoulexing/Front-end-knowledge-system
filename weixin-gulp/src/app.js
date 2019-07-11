App({
  onLaunch: function (options) {
    const that = this;
    // 存储日志
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    if (options.scene == 1007 || options.scene == 1008) {
      that.globalData.share = true;
    } else {
      that.globalData.share = false;
    }

    // 获取系统信息
    wx.getSystemInfo({
      success: res => {
        that.globalData.height = res.statusBarHeight;
      }
    });

    // 登陆
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res);
              }
            }
          })
        }
      }
    });
  },

  globalData: {
    userInfo: null,
    share: false,
    height: 0,
  }
})
