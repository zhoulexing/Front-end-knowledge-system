import React from "react";
import createApp from "./store";
import { Provider } from "react-redux";
import Taro from "@tarojs/taro";
import models from "./models/index";
import "./app.scss";

const store = createApp({ models });
class App extends React.Component {
    globalData = {
        env: "test",
    };

    componentDidMount() {
        console.log(Taro.getSetting);
        Taro.getSetting({
            success: (res) => {
                if (res.authSetting["scope.userInfo"]) {
                    this.getUserInfo();
                }
            },
            fail: (err) => {
                console.log("Taro.getSetting:", err);
            },
        });
    }

    getUserInfo() {
        Taro.getUserInfo({
            success: (res) => {
                store.dispatch({
                    type: 'user/setUser',
                    payload: {
                        username: res.userInfo.nickName
                    }
                });
            },
        });
    }

    componentDidShow(options) {}

    componentDidHide() {}

    componentDidCatchError() {}

    render() {
        return <Provider store={store}>{this.props.children}</Provider>;
    }
}

export default App;
