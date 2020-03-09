
import { Reducer } from "redux";
import { Effect, Subscription } from "./index.d";

export interface NoticeItem {
    id: string;
    type: string;
    status: string;
    read: boolean;
}

export interface GlobalModelState {
    collapsed: boolean;
    loading: boolean;
    notices: NoticeItem[];
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

const globalModal: GlobalModelType = {
    namespace: "global",

    state: {
        collapsed: false,
        loading: false,
        notices: [],
    },

    effects: {
        *fetchNotices(_, { call, put, select }) {
            const data = yield call();
            yield put({
                type: "saveNotices",
                payload: data
            });
            const unreadCount: number = yield select(
                (state) => state.global.notices.filter((item) => !item.read).length
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
        changeLayoutCollapsed(state = globalModal.state, { payload }) {
            return {
                ...state,
                collapsed: payload
            };
        }
    },

    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname, search }) => {
                if (typeof window.ga !== "undefined") {
                    window.ga("send", "pageview", pathname + search);
                }
            });
        }
    }
};


export default globalModal;