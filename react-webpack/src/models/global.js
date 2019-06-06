export default {
    namespace: "global",
    state: {
        count: 0,
    },
    effects: {
        *asyncAdd({ payload }, { call, put }) {
            debugger
            yield put({
                type: "add",
                payload,
            });
        }
    },
    reducers: {
        add(state, { payload }) {
            return {
                ...state,
                count: payload.count,
            };
        },
        subtract(state, { payload }) {
            return {
                ...state,
                count: payload.count,
            };
        },
    },
}