import React from "react";
import { configureStore, history } from "./store";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

const store = configureStore();

let render = () => {
    const Routes = require("../router").default;
    ReactDOM.render(
        <Provider store={store}>
            <Routes history={history} />
        </Provider>,
        document.getElementById("root")
    );
};

render();
