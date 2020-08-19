import { history, Reducer, Effect } from 'umi';
import { fakeAccountLogin } from '@/services/login';

export interface CurrentUser {
    userName: string;
    avatar?: string;
}
export interface LoginStateType {
    status?: 'success' | 'error';
    user?: CurrentUser;
}

export interface LoginModelType {
    namespace: string;
    state: LoginStateType;
    effects: {
        login: Effect;
        logout: Effect;
    };
    reducers: {
        changeLoginStatus: Reducer<LoginStateType>;
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
            if(response.status === 'success') {
                history.push('/');
            }
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
						data: undefined,
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
                user: payload.data,
            };
        },
    },
};

export default Model;
