function getData(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(value === "1") {
                reject(false);
            } else {
                resolve(value);
            }
        }, 1000);
    });
}

function getAll() {
    return Promise.all([
        getData("1"),
        getData("2"),
    ]).then(res => {
        console.log(res);
    })
}

export default {
    namespace: "user",
    state: {
        username: "zlx",
        count: 0,
    },
    effects: {
        *test() {
            console.log("is come in");
        },
        *getUser({ payload }, { select, call, put, all }) {
            try {
                let result = yield call(getAll);
                console.log("result--->", result);
            } catch (error) {
                console.log("error--->", error);
            }

            const username = yield select((state) => state.user);
            console.log(username);
            const value = yield call(getData, payload.username);
            yield put({
                type: "setCount",
            });
            const username1 = yield select((state) => state.user);
            console.log("state---->", username1);

            yield put({
                type: "test",
            });
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
        setCount(state, { payload }) {
            return {
                ...state,
                count: state.count + 1,
            };
        },
    },
};
