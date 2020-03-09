import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store, { history } from "./store";
import "./public-path";

let render = () => {
    const Routes = require("./router").default;
    ReactDOM.render(
        <Provider store={store}>
            <Routes history={history} />
        </Provider>,
        document.getElementById("root")
    );
};

render();

if (module.hot) {
    const renderNormally = render;
    const renderException = (error: Error) => {
        const RedBox = require("redbox-react");
        ReactDOM.render(
            <RedBox error={error} />,
            document.getElementById("root")
        );
    };
    render = () => {
        try {
            renderNormally();
        } catch (error) {
            renderException(error);
        }
    };
    module.hot.accept("./router", () => {
        render();
    });
}
