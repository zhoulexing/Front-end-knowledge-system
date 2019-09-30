import './polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import { createHashHistory } from 'history';

// 1. Initialize
const app = dva({
    history: createHashHistory(),
    onError: e => {
        console.error(e.message);
    }
});

// 2. Plugins
app.use( createLoading() );

// 3. Model
app.model(require("./models/global").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");

export default app._store;