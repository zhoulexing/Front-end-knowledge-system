import React, { Component } from "react";
import { View, Text, Button, NavigationBar } from "@tarojs/components";
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
				<NavigationBar>asd</NavigationBar>
            </View>
        );
	}
	
	handleClick() {
		console.log('Hello');
	}
}
