import React from "react";
import { View, Button, Text } from "@tarojs/components";
import { AtButton, AtDivider, AtAvatar } from "taro-ui";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../models/index";
import Tips from "../../utils/tips";
import Taro from "@tarojs/taro";
import avatarUrl from '../../assets/images/unauthorized.png';

interface MyProps extends State {
    dispatch: Dispatch;
}

interface MyState {}

class My extends React.Component<MyProps, MyState> {
    config = {
        navigationBarTitleText: "个人中心",
    };

    handleClick1 = () => {
        const { user } = this.props;
        this.props.dispatch({
            type: "user/getUser",
            payload: {
                username: user.username + 1,
            },
        });
    };

    handleClick2 = () => {
        Tips.toast("hello");
    };

    handleClick3 = () => {
        Taro.redirectTo({
            url: "/pages/test/index",
        });
    };

    render() {
        const { user, loading } = this.props;

        return (
            <View>
                <View>
                    <AtAvatar image={avatarUrl}></AtAvatar>
                    <Text>点击授权登录</Text>
                </View>
                <Button style={{ marginBottom: "5px" }}>{user.username}</Button>
                <AtButton
                    loading={loading.global}
                    type="primary"
                    onClick={this.handleClick1}
                >
                    {user.username}
                </AtButton>
                <AtDivider content="分割线"></AtDivider>
                <AtButton type="primary" onClick={this.handleClick2}>
                    toast
                </AtButton>
                <AtDivider content="分割线"></AtDivider>
                <AtButton onClick={this.handleClick3}>跳转</AtButton>
                <AtButton openType="getUserInfo">授权</AtButton>
            </View>
        );
    }
}

export default connect(({ user, loading }: State) => ({ user, loading }))(My);
