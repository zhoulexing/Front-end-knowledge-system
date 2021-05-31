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
            path: '/apps',
            component: '@/layouts/BasicLayout',
            routes: [
                {
                    path: '/apps',
                    redirect: '/apps/home',
                },
                {
                    name: 'hemo',
                    path: '/apps/home',
                    component: '@/pages/home',
                },
            ],
        },
        {
            path: '/',
            redirect: '/apps'
        }
    ],
});
