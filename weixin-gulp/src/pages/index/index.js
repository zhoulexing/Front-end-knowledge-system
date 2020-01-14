const app = getApp();

Page({
    data: {},
    goWxCropper: function() {
        wx.navigateTo({
            url: '/pages/wxCropper/index'
        });
    },
    goImageCropper: function() {
        wx.navigateTo({
            url: '/pages/imageCropper/index'
        });
    },
    goRubbish: function() {
        wx.navigateTo({
            url: '/pages/rubbish/index'
        });
    },
    goSentry: function() {
        wx.navigateTo({
            url: '/pages/sentry/index'
        });
    }
});