## 小程序配置
小程序配置分为三个部分，分别是全局配置、页面配置和sitemap配置。

### 全局配置
app.json
```
{
    pages: [
        'pages/index/index', // 第一个为首页
        'pages'/logs/index,
    ],
    window: {
        navigationBarBackgroundColor: '#000000', // 导航条背景色
        navigationBatTextStyle: 'white', // 导航栏标题颜色, 仅支持 black / white
    }
}
```