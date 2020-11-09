## 小程序生命周期

-   小程序初始化完成：onLaunch(options) ==== componentWillMount, componentDidMount(在 willMount 后执行)
    options 可以通过 this.\$router.params 获取；
    options 在 v3 之后通过@tarojs/taro 中的 getCurrentInstance().router 获取；
    对于项目入口组件而言，路由信息推荐在 componentDidShow 声明周期的参数中直接读取；

-   小程序显示（启动或从后台进入前台）：onShow(options) === componentDidShow(options)

-   小程序被隐藏：onHide() === componentDidHide

-   小程序错误监听函数：onError(msg) === componentDidCatchError

-   小程序页面不存在监听函数：onPageNotFount() === componentDidNotFound

## 小程序页面生命周期

-   页面创建时：onLoad(options) === componentWillMount()
-   页面首次渲染完毕时：onReady() === componentDidMount()

-   小程序没有的：componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、componentDidUpdate

-   页面出现在前台：onShow() === componentDidShow()
-   页面从前台变为后台：onHide() === componentDidHide()
-   页面退出：onUnload() === componentWillUnmount()

## 路由跳转

-   navigateTo: 小程序、H5、React Native 都支持
-   redirectTo: 小程序、H5、React Native 都支持
-   switchTab: 小程序、H5、React Native 都支持
-   navigateBack: 小程序、H5、React Native 都支持
-   relaunch: 小程序、H5、React Native 都支持
-   getCurrentPages：H5 不支持

## taro 性能优化

-   在小程序调用 Taro.navigateTo、Taro.redirectTo 或 Taro.switchTab 后，到页面触发会有一定延时，
    因此一些网络请求可以提前到发起跳转前一刻去请求。利用声明周期函数 componentWillPreload(params)，
    另外可以使用 this.\$preload 函数进行页面跳转传参数，具体如下。

    ```
    // A页面
    this.$preload({ x: 1, y: 2 });
    Taro.navigateTo({ url: '/pages/B' });

    // B页面
    {
        componentWillMount() {
            const params = this.$router.preload;
            this.$preloadData
                .then(res => {
                    console.log('res: ', res)
                    this.isFetching = false
                })
        }

        componentWillPreload(params) {
            return this.fetchData(params.url)
        }
    }
    ```

-   shouldComponentUpdate、React.PureComponent、React.memo

-   Taro 框架做了一些性能优化方面的工作，在真正调用小程序的 setData 方法之前，Taro 会做一次 diff。

## 相关问题

-   在文件中如果通过 module.exports 导出对象，如果不引入@taro/tarojs 则可以正常的通过 import 进行解构，
    但是引入之后，import 结构就会报错。
