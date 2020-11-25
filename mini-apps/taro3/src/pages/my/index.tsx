import React from "react";
import { View, Button } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Config } from "@tarojs/taro";
import { State } from "../../models/index";

interface MyProps extends State {
    dispatch: Dispatch;
}

interface MyState {}

class My extends React.Component<MyProps, MyState> {
    config: Config = {
        navigationBarTitleText: "个人中心",
    };

    render() {
        const { user } = this.props;
        const handleClick = () => {
            this.props.dispatch({
                type: "user/getUser",
                payload: {
                    username: user.username + 1,
                },
            });
        };

        return (
            <View>
                <Button>{user.username}</Button>
                <AtButton type="primary" onClick={handleClick}>
                    {user.username}
                </AtButton>
            </View>
        );
    }
}

export default connect(({ user }: State) => ({ user }))(My);
