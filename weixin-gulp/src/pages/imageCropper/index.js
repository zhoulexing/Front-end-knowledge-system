//获取应用实例
const app = getApp();
Page({
    data: {
        src: '',
        width: 250,//宽度
        height: 300,//高度
        max_width: 400,
        max_height: 400,
        disable_rotate: true,//是否禁用旋转
        disable_ratio: false,//锁定比例
        limit_move: true,//是否限制移动
    },
    onLoad: function (options) {
        this.cropper = this.selectComponent("#image-cropper");
    },
    cropperload(e) {
        console.log('cropper加载完成');
    },
    loadimage(e) {
        wx.hideLoading();
        this.cropper.imgReset();
    },
    clickcut(e) {
        console.log(e.detail);
        //图片预览
        wx.previewImage({
            current: e.detail.url, // 当前显示图片的http链接
            urls: [e.detail.url] // 需要预览的图片http链接列表
        });
    },
    upload() {
        let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                wx.showLoading({
                    title: '加载中',
                })
                const tempFilePaths = res.tempFilePaths[0];
                //重置图片角度、缩放、位置
                that.cropper.imgReset();
                that.setData({
                    src: tempFilePaths
                });
            }
        })
    },
    submit() {
        this.cropper.getImg((obj) => {
            app.globalData.imgSrc = obj.url;
            wx.navigateBack({
                delta: -1
            })
        });
    },
    rotate() {
        //在用户旋转的基础上旋转90°
        this.cropper.setAngle(this.cropper.data.angle += 90);
    },
    end(e) {
        clearInterval(this.data[e.currentTarget.dataset.type]);
    },
});
