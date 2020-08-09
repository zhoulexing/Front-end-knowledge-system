import { defineConfig } from 'umi';
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
                    name: 'home',
                    path: '/mobile/home',
                    component: '@/pages/home',
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
