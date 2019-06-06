import { getUserList, getUserMsg } from "../services/example";

export default {

    namespace: "example",

    state: {
        user: null,
        list: null
    },

    effects: {
        *getUserList({ payload }, { call, put }) {
            const result = yield call(getUserList, payload);
            yield put({
                type: "changeList",
                payload: result
            });
        },
        *getUserMsg(_, { call, put }) {
            const result = yield call(getUserMsg);
            console.log(result);
            yield put({
                type: "changeUser",
                payload: result
            });
        }
    },

    reducers: {
        changeUser(state, { payload }) {
            return {
                ...state,
                user: payload
            }
        },
        changeList(state, { payload }) {
            return {
                ...state,
                list: payload
            }
        }
    }
};