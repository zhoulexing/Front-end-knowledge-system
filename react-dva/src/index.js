import "./polyfill";
import dva from "dva";
import createHistory from "history/createHashHistory";
import createLoading from "dva-loading";

import "./i18n/index";
import "./index.less";

// 1. Initialize
const app = dva({
    history: createHistory(),
    onError: e => {
        console.error(e.message);
    }
});

// 2. Plugins
app.use( createLoading() );

// 3. Model
app.model(require("./models/global").default);
app.model(require("./models/setting").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");

export default app._store;
