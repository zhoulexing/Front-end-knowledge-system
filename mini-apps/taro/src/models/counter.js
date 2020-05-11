export default {
    namespace: 'counter',
    state: {
        num: 0
    },
    effects: {
        * asyncChange({ payload }, { put }) {
            yield put({
                type: 'change',
                payload,
            });
        }
    },
    reducers: {
        change(state, { payload }) {
            return {
                ...state,
                num: payload.num,
            };
        },
    },
}