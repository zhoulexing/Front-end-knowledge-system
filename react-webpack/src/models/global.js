export default {
    namespace: 'global',
    state: {
        count: 3,
    },
    effects: {
        * asyncAdd({ payload }, { put }) {
            yield put({
                type: 'add',
                payload,
            });
        },
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
};
