import React, { Component } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default class Test extends Component {
    componentWillMount() {
		console.log(Taro.getCurrentInstance());
	}

    componentDidMount() {
	}

    componentWillUnmount() {}

    componentDidShow() {
	}

    componentDidHide() {}

    render() {
        return (
            <View className="index">
                test
            </View>
        );
    }
}
