import React, { Component } from "react";
import { View, Button } from "@tarojs/components";
import styles from "./index.module.scss";
export default class Index extends Component {
    
    handleClick = () => {
        Taro.redirectTo({
            url: "/pages/xxx/index"
        })
    }

    render() {
        return (
            <View className={styles.container}>
                <Button onClick={this.handleClick}>点我</Button>
            </View>
        );
    }
}
