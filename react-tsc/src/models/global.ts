import { Effect, EffectsCommandMap, Subscription } from "./connect.d";
import { AnyAction, Reducer } from "redux";

export interface GlobalModelState {
    collapsed: boolean;
    loading: boolean;
}

export interface GlobalModelType {
    namespace: "global";
    state: GlobalModelState;
    effects: {
        fetchNotices: Effect;
    };
    reducers: {
        changeLayoutCollapsed: Reducer<GlobalModelState>;
    };
    subscriptions: {
        setup: Subscription
    }
}

export default {
    namespace: "global",

    state: {
        collapsed: false,
        loading: false
    },

    effects: {
        *fetchNotices(_: AnyAction, { call, put, select }: EffectsCommandMap) {
            const data = yield call();
            yield put({
                type: "saveNotices",
                payload: data
            });
            const unreadCount: number = yield select(
                (state: any) => state.global.notices.filter((item: any) => !item.read).length
            );
            yield put({
                type: "user/changeNotifyCount",
                payload: {
                    totalCount: data.length,
                    unreadCount
                }
            });
        }
    },

    reducers: {
        changeLayoutCollapsed(state: any, { payload }: any) {
            return {
                ...state,
                collapsed: payload
            };
        }
    },

    subscriptions: {
        setup({ history, dispatch }: any) {
            return history.listen(({ pathname, search }: any) => {
                if (typeof window.ga !== "undefined") {
                    window.ga("send", "pageview", pathname + search);
                }
            });
        }
    }
};
