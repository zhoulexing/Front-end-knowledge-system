import {queryNotices} from "../services/global.js";

export default {
    namespace: 'global',
  
    state: {
      collapsed: false,
      notices: [],
    },
    
    effects: {
        *fetchNotices(_, { call, put }) {
            const data = yield call(queryNotices);
            yield put({
                type: 'saveNotices',
                payload: data,
            });
            yield put({
                type: 'login/changeNotifyCount',
                payload: data.length,
            });
        },
        *clearNotices({ payload }, { put, select }) {
            yield put({
                type: 'saveClearedNotices',
                payload,
            });
            const count = yield select(state => state.global.notices.length);
            yield put({
                type: 'login/changeNotifyCount',
                payload: count,
            });
        }
    },
    
    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload
            };
        },
        saveNotices(state, { payload }) {
            return {
                ...state,
                notices: payload,
            };
        },
        saveClearedNotices(state, { payload }) {
            return {
                ...state,
                notices: state.notices.filter(item => item.type !== payload)
            };
        }
    },
}
