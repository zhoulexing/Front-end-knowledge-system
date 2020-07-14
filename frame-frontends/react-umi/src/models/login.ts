import { history, Reducer, Effect } from 'umi';
import { fakeAccountLogin } from '@/services/login';

export interface StateType {
    status?: 'success' | 'error';
    user?: {
        username: string;
        usertype: string;
    };
}

export interface LoginModelType {
    namespace: string;
    state: StateType;
    effects: {
        login: Effect;
        logout: Effect;
    };
    reducers: {
        changeLoginStatus: Reducer<StateType>;
    };
}

const Model: LoginModelType = {
    namespace: 'login',

    state: {
        status: undefined,
        user: undefined,
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(fakeAccountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
        },
        *logout(_, { call, put }) {
            if (window.location.pathname !== '/user/login') {
                history.replace({
                    pathname: '/user/login',
                });
                yield put({
					type: 'changeLoginStatus',
                	payload: {
						status: 'error',
						user: undefined,
					},
				});
            }
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            return {
                ...state,
                status: payload.status,
                user: payload.user,
            };
        },
    },
};

export default Model;
