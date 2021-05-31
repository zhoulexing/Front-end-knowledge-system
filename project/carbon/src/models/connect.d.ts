import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { LoginStateType } from './login';

export interface Loading {
    global: boolean;
    effects: { [key: string]: boolean | undefined };
    models: {
        global?: boolean;
        settings?: boolean;
        user?: boolean;
        login?: boolean;
    };
}

export interface ConnectState {
    loading: Loading;
    settings: ProSettings;
    login: LoginStateType
}

export interface Route extends MenuDataItem {
    routes?: Route[];
}
