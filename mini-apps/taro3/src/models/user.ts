function getData(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    });
}

export default {
    namespace: "user",
    state: {
        username: "zlx",
    },
    effects: {
        *getUser({ payload }, { select, call, put }) {
            const username = yield select(state => state.user);
            console.log(username);
            const value = yield call(getData, payload.username);
            yield put({
                type: "setUser",
                payload: {
                    username: value,
                },
            });
        },
    },
    reducers: {
        setUser(state, { payload }) {
            return {
                ...state,
                username: payload.username,
            };
        },
    },
};
