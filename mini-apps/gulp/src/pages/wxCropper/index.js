const app = getApp();
const WeCropper = require('../../components/we-cropper/we-cropper.js');
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 100;


Page({
    data: {
        rotateI: 0,
        cropperOpt: {
            id: 'cropper',
            rotateI: 0, // 旋转默认角度
            tranlateX: width / 2, // 定义canvas的原点
            tranlateY: height / 2, // 定义canvas的原点
            width: width, // 画布宽
            height: height, // 画布高
            scale: 2.5, // 最大放大倍数
            zoom: 8, // 缩放系数
            cut: {
                x: -width / 2,  // 裁剪框的坐标
                y: -(height - (width / 1.4)) / 2, // 裁剪框的坐标
                width: width, //裁剪框的大小
                height: width / 1.4
            }
        },
        chooseImg: false,
        imgSrc: ''
    },
    onLoad: function () {
        const { cropperOpt } = this.data;
        this.cropper = new WeCropper(cropperOpt)
            .on('ready', (ctx) => {
                console.log(`wecropper is ready for work!`)
                // self.wecropper.updateCanvas(this.data.rotateI);
            })
            .on('beforeImageLoad', (ctx) => {
                wx.showToast({
                    title: '上传中',
                    icon: 'loading',
                    duration: 20000
                })
            })
            .on('imageLoad', (ctx) => {
                wx.hideToast();
            });
    },
    chooseImg: function () {
        const self = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success(res) {
                const src = res.tempFilePaths[0];
                if (src) {
                    // 将图片参数传递给插件
                    self.cropper.pushOrign(src);
                    self.setData({
                        chooseImg: true,
                        imgSrc: src,
                        rotateI: 0
                    });
                };
                wx.hideToast();
            },
            fail(res) {
                wx.hideToast();
                wx.navigateBack();
            }
        });
    },
    touchStart(e) {
        this.cropper.touchStart(e);
    },
    touchMove(e) {
        this.cropper.touchMove(e);
    },
    touchEnd(e) {
        this.cropper.touchEnd(e);
    },
    // 获取裁剪后的图片
    getCropperImage: function () {
        if (this.data.chooseImg) {
            this.cropper.getCropperImage((src) => {
                //获取上个页面的参数
                let pages = getCurrentPages();
                //prevPage 相当于上个页面的this，可以通过setData修改上个页面参数执行上个页面的方法等
                let prevPage = pages[pages.length - 2]
                if (src) {
                    // 身份证
                    if (this.data.cuttype == 1) {
                        prevPage.setData({
                            IDCard: src,
                            cuttype: this.data.cuttype
                        });
                        //荣誉证书
                    } else if (this.data.cuttype == 2) {
                        prevPage.setData({
                            hornerCard: src,
                            cuttype: this.data.cuttype
                        });
                    } else if (this.data.cuttype == 3) {
                        prevPage.setData({
                            licenceCard: src,
                            cuttype: this.data.cuttype
                        });
                    } else if (this.data.cuttype == 4) {
                        prevPage.setData({
                            certificationCard: src,
                            cuttype: this.data.cuttype
                        });
                    };
                    wx.navigateBack();
                } else {
                    wx.hideToast();
                    wx.showToast({
                        title: '获取图片地址失败，请稍后再试！',
                    });
                }
            })
        } else {
            wx.showToast({
                title: '您还没选择图片！',
                icon: 'none'
            })
        }
    },
    cancleCropper() {
        wx.hideToast()
        wx.navigateBack()
    },
    // 图片旋转
    rotateImg() {
        const self = this;
        let rotateI = this.data.rotateI + 1;
        this.setData({
            rotateI: rotateI
        });
        // 将旋转的角度传递给插件
        self.cropper.updateCanvas(rotateI);
    }
});