import { getList } from "../services/example";

export default {

    namespace: "example",

    state: {
        list: null
    },

    effects: {
        *asyncRequest({ payload }, { call, put }) {
            const result = yield call(getList, payload);
            yield put({
                type: "changeList",
                payload: result.list
            });
        }
    },

    reducers: {
        changeList(state, { payload }) {
            return {
                ...state,
                list: payload
            }
        }
    },

    subscriptions: {
        
    }
};
