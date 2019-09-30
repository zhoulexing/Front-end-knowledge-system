// import './polyfill';
import dva from './dva';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { LocaleProvider } from 'antd';

moment.locale('zh-cn');

const app = dva();
addModel();

const initialState = getInitialState();
app.start(initialState);


render();
if (module.hot) {
    const renderNormally = render;
    const renderException = (error) => {
        const RedBox = require('redbox-react');
        ReactDOM.hydrate(<RedBox error={error} />, document.getElementById('root'));
    };
    render = () => {
        try {
            renderNormally();
        } catch (error) {
            renderException(error);
        }
    };
    module.hot.accept('./router', () => {
        render();
    });
}


// module.hot.accept("../reducers", () => {
//     const nextRootReducer = require("../reducers/index");
//     store.replaceReducer(nextRootReducer);
// });
// module.hot.accept("../sagas", () => {
//     const getNewSagas = require("../sagas");
//     sagaTask.cancel()
//     sagaTask.done.then(() => {
//         sagaTask = sagaMiddleware.run(function* replacedSaga(action) {
//             yield getNewSagas()
//         })
//     })
// });


function render() {
    const Routes = require('./router').default;
    ReactDOM.render(
        <Provider store={app._store}>
            <LocaleProvider locale={zhCN}>
                <Routes history={app._history} />
            </LocaleProvider>
        </Provider>,
        document.getElementById('root'),
    );
}


function addModel() {
    const context = require.context('./models', true, /\.js$/);
    const keys = context.keys();
    keys.forEach((key) => {
        if (context(key)) {
            app.model(context(key).default);
        }
    });
}

function getInitialState() {
    return {};
}

export default app._store;