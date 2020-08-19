import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
    pwa: boolean;
}

const proSettings: DefaultSettings = {
    primaryColor: '#1890ff',
    navTheme: 'dark',
    layout: 'side',
    fixedHeader: false,
    fixSiderbar: false,
    menu: {
        locale: true,
    },
    title: 'Fire Unicorn',
    pwa: false,
    contentWidth: 'Fluid',
    iconfontUrl: '//at.alicdn.com/t/font_1977629_nhaegdoqgb.js'
};

export type { DefaultSettings };

export default proSettings;