import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';
import { Reducer } from 'umi';

export interface SettingsModelType {
    namespace: 'settings';
    state: DefaultSettings;
    reducers: {
        changeSettings: Reducer<DefaultSettings>;
    };
}

const Model: SettingsModelType = {
    namespace: 'settings',
    state: defaultSettings,
    reducers: {
        changeSettings(state = defaultSettings, { payload }) {
            const { contentWidth } = payload;
            if (state.contentWidth !== contentWidth && window.dispatchEvent) {
                window.dispatchEvent(new Event('resize'));
            }

            return {
                ...state,
                ...payload,
            };
        },
    },
};

export default Model;
