import React, { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import "./index.less";
import Taro from "@tarojs/taro";

export default class Index extends Component {
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
                <Text>Hello world!</Text>
				<Button onClick={this.handleClick}>点我</Button>
            </View>
        );
	}
	
	handleClick() {
		console.log('Hello');
	}
}
