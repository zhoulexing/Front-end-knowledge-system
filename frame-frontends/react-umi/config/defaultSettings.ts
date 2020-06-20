import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
    pwa: boolean;
}

const proSettings = {
    primaryColor: '#1890ff',
};

export type { DefaultSettings };

export default proSettings;