import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "@/store";
import { createHashHistory } from "history";
import "./index.less";

const history = createHashHistory();
const store = configureStore({ history });

let render = () => {
  const Routes = require("./router").default;
  ReactDOM.render(
    <Provider store={store}>
      <Routes history={history} />
    </Provider>,
    document.getElementById("root"),
  );
};

render();

if (module.hot) {
  const renderNormally = render;
  const renderException = (error: Error) => {
    const RedBox = require("redbox-react");
    ReactDOM.render(
      <RedBox error={error} />,
      document.getElementById("root"),
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

export default store;
