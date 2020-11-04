import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default class My extends Component {
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
                <Text>My</Text>
            </View>
        );
    }
}
