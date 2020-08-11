import React from 'react';
import { getDvaApp, useStore, useSelector, useDispatch, useHistory } from 'umi';
import { ConnectState } from '@/models/connect';

const UmiApi = () => {
    const dvaApp = getDvaApp();
    console.log('dvaApp:', dvaApp);

    const store = useStore();
    console.log('store:', store);

    const settings = useSelector((state: ConnectState) => state.settings);
    console.log('settings:', settings);

    const dispatch = useDispatch();
    console.log('dispatch:', dispatch);

    const history = useHistory();
    console.log('history:', history);
    return (
        <div>123</div>
    )
}

export default UmiApi;