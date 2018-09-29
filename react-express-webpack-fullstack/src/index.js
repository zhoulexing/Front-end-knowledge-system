import "./polyfill";
import dva from "dva";
import createHistory from "history/createHashHistory";
import createLoading from "dva-loading";

import "./index.less";

const app = dva({
    history: createHistory()
});

app.use(createLoading());
app.model(require("./models/global").default);
app.router(require("./router").default);
app.start("#root");

export default app._store;

