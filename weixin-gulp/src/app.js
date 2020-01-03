import * as Sentry from "./components/sentry/sentry-minapp.wx.min";

const {
  Integrations: { GlobalHandlers }
} = Sentry;

// 初始化 Sentry
Sentry.init({
  dsn: "https://40cdfac753a74ff58da437df56744d46@sentry.800best.com/23", // 事件发送的位置
  debug: false, // 启用调试
  release: "1.0.0", // 版本
  integrations: [new GlobalHandlers({ onerror: true })], 
});

App({
  onLaunch: function() {
    // wx.cloud.init({
    //   env: '', // 前往云控制台获取环境id
    //   traceUser: true //是否要捕捉每个用户的访问记录。设置为true，用户可在管理端看到用户访问记录
    // });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: (res) => {
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
              this.globalData.userInfo = res.userInfo;
              const {
                nickName,
                country,
                province,
                city,
                avatarUrl
              } = res.userInfo;
              Sentry.configureScope(scope => {
                scope.setUser({ id: nickName });
                scope.setTag("country", country);
                scope.setExtra("province", province);
                scope.setExtras({
                  city,
                  avatarUrl,
                  environment: this.globalData.environment
                });
              });
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  onError(error) {
    console.log("in app:", error);
    Sentry.captureException(error);
  },
  globalData: {
    userInfo: null,
    environment: "dev" 
  }
});
