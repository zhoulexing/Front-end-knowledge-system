import "@babel/polyfill";
import 'url-polyfill';
import dva from 'dva';
import './index.less';
import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
    history: createHistory()
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
