import { fakeAccountLogin } from '../services/api';
import { routerRedux } from 'dva/router';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      	const response = yield call(fakeAccountLogin, payload);
      	yield put({
        	type: 'changeLoginStatus',
        	payload: response,
      	});
      	// 登录成功
      	if (response.status === 'ok') {
			reloadAuthorized();
        	yield put(routerRedux.push('/main'));
      	}
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
		setAuthority(payload.currentAuthority);
      	return {
			...state,
			status: payload.status,
			type: payload.type,
      	};
    },
  },
};
