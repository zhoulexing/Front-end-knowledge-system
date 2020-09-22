import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import routeList from "./routerConfig";
import App from "./app";
import matchRoute from "../../share/match-route";

function render() {
    let initialData = JSON.parse(
        document.getElementById("ssrTextInitData").value
    );
    let matchResult = matchRoute(document.location.pathname, routeList);
    let { targetRoute } = matchResult;
    if (targetRoute) {
        targetRoute.initialData = initialData;
    }

    ReactDOM.hydrate(
        <BrowserRouter>
            <App routeList={routeList} />
        </BrowserRouter>,
        document.getElementById("root")
    );
}

render();
