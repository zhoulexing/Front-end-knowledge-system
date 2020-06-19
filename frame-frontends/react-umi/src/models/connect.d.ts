import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';

export interface Loading {
    global: boolean;
    effects: { [key: string]: boolean | undefined };
    models: {
        global?: boolean;
        menu?: boolean;
        setting?: boolean;
        user?: boolean;
        login?: boolean;
    };
}

export interface ConnectState {
    loading: Loading;
    settings: ProSettings;
}

export interface Route extends MenuDataItem {
    routes?: Route[];
}
