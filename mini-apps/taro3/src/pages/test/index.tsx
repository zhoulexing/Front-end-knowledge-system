import React, { Component } from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { a } from './test1';
import b from './test2';

console.log(a, b);

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
