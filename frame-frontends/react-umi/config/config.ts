import { defineConfig } from 'umi';
import pxToViewPort from 'postcss-px-to-viewport';
import postcssAspectRatioMini from 'postcss-aspect-ratio-mini';
import postcssWriteSvg from 'postcss-write-svg';
import px2rem from 'postcss-plugin-px2rem';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

type REACT_APP_ENV_TYPE = 'dev' | 'test' | undefined;
const { REACT_APP_ENV } = process.env;

export default defineConfig({
    dynamicImport: {
        loading: '@/components/PageLoading',
    },
    ignoreMomentLocale: true,
    history: {
        // browser、hash、memory
        type: 'browser',
    },
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    locale: {
        default: 'zh-CN',
        antd: true,
        baseNavigator: true,
    },
    targets: {
        ie: 11,
    },
    devServer: {
        port: 8004,
        https: false,
        http2: false,
        // 生成assets到文件系统
        writeToDisk: false,
    },
    title: false,
    favicon: '/favicon.ico',
    headScripts: [],
    proxy: proxy[(REACT_APP_ENV as REACT_APP_ENV_TYPE) || 'dev'],
    theme: {
        'primary-color': defaultSettings.primaryColor,
    },
    extraPostCSSPlugins: [
        postcssAspectRatioMini({}),
        postcssWriteSvg({ utf8: false }),
        // pxToViewPort({
        //     unitToConvert: 'px', // 需要转换的单位
        //     viewportWidth: 750, // 视窗的宽度，对应的是设计稿的宽度
        //     viewportHeight: 1334,
        //     unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
        //     propList: ['*'], // 能转化为vw的属性列表
        //     viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
        //     fontViewportUnit: 'vw', // 字体使用的视口单位
        //     selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类
        //     minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
        //     mediaQuery: false, // 允许在媒体查询中转换`px`
        //     landscapeUnit: 'vw', //横屏时使用的单位
        //     landscapeWidth: 1334, //横屏时使用的视口宽度
        //     exclude: /node_modules/i,
        // }),
        px2rem({ 
            rootValue: 16, // rootValue=designWidth*100/750,此处设计稿为375，所以375*100/750=50
            unitPrecision: 5,
            mediaQuery: false,
            propList: ['*'],
        })
    ],
    routes: [
        {
            path: '/user',
            component: '@/layouts/UserLayout',
            routes: [
                {
                    path: '/user',
                    redirect: '/user/login',
                },
                {
                    name: 'login',
                    path: '/user/login',
                    component: '@/pages/user/login',
                },
            ],
        },
        {
            path: '/layout',
            component: '@/layouts/SecurityLayout',
            exact: true,
            routes: [
                {
                    path: '/layout',
                    component: '@/layouts/BasicLayout',
                    authority: ['admin'],
                    routes: [
                        {
                            path: '/layout',
                            redirect: '/layout/example',
                        },
                        {
                            path: '/layout/example',
                            name: 'example',
                            icon: 'icon-smile',
                            component: '@/pages/example',
                        },
                        {
                            component: '@/pages/exception/404',
                        },
                    ],
                },
                {
                    component: '@/pages/exception/404',
                },
            ],
        },
        {
            path: '/mobile',
            component: '@/layouts/MobileLayout',
            routes: [
                {
                    path: '/mobile',
                    redirect: '/mobile/home',
                },
                {
                    title: '首页',
                    name: 'home',
                    path: '/mobile/home',
                    component: '@/pages/mobile/home',
                    icon: '/mobile/recycleH5_01.png',
                    selectedIcon: '/mobile/recycleH5_02.png'
                },
                {
                    title: '分类',
                    name: 'class',
                    path: '/mobile/class',
                    component: '@/pages/mobile/class',
                    icon: '/mobile/recycleH5_03.png',
                    selectedIcon: '/mobile/recycleH5_04.png'
                },
                {
                    title: '我的',
                    name: 'my',
                    path: '/mobile/my',
                    component: '@/pages/mobile/my',
                    icon: '/mobile/recycleH5_05.png',
                    selectedIcon: '/mobile/recycleH5_06.png'
                }
            ]
        },
        {
            path: '/test',
            component: '@/layouts/TestLayout',
            routes: [
                {
                    path: '/test',
                    redirect: '/test/qrcode',
                },
                {
                    name: 'qrcode',
                    path: '/test/qrcode',
                    component: '@/pages/qrcode',
                },
                {
                    name: 'stateManager',
                    path: '/test/stateManager',
                    component: '@/pages/stateManager',
                },
                {
                    name: 'umiApi',
                    path: '/test/umiApi',
                    component: '@/pages/umiApi',
                },
            ]
        }
    ],
});
