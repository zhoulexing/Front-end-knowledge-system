import {fakeAccountLogin, queryCurrent} from '../services/login';
import {routerRedux} from 'dva/router';
import {setAuthority} from '../utils/authority';
import {reloadAuthorized} from '../utils/Authorized';

export default {
    namespace: 'login',
    
    state: {
        status: undefined,
        currentUser: {}
    },
    
    effects: {
        *login({payload}, {call, put}) {
            const response = yield call(fakeAccountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            // 登录成功
            if (response.status === 'ok') {
                reloadAuthorized();
                yield put(routerRedux.push('/'));
            }
        },
        *fetchCurrentUser(_, { call, put }) {
            const response = yield call(queryCurrent);
            yield put({
                type: 'saveCurrentUser',
                payload: response
            });
        },
        *logout(_, { put, select }) {
            try {
                const urlParams = new URL(window.location.href);
                const pathname = yield select(state => state.routing.location.pathname);
                urlParams.searchParams.set('redirect', pathname);
                window.history.replaceState(null, 'login', urlParams.href);
            } finally {
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: false,
                        currentAuthority: 'guest',
                    },
                });
                reloadAuthorized();
                yield put(routerRedux.push('/login'));
            }
        }
    },
    
    reducers: {
        changeLoginStatus(state, {payload}) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
        saveCurrentUser(state, { payload }) {
            return {
                ...state,
                currentUser: payload
            }
        },
        changeNotifyCount(state, action) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload
                }
            };
        }
    }
};
