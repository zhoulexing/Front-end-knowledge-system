import React from "react";
import ReactDOM from "react-dom";
import TestRender from "./render";
// import lazyLegacyRoot from "./lazyLegacyRoot";


// const Legacy = lazyLegacyRoot(() => import("./legacy"));


debugger
ReactDOM.render(
    <TestRender />,
    document.getElementById("root")
)