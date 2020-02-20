import React from "react";
import style from "./index.less";
import { Button } from "antd";
import { connect } from "react-redux"; 
import user from "@/assets/images/user.jpg";
import logo from "@/assets/images/logo.svg";

@connect()
export default class Example extends React.Component {
    getData(value) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(value);
            }, 1000);
        });
    }
    
    async componentDidMount() {
        const obj = { name: "zlx", age: 12 };
        const newObj = { ...obj };
        const data = await this.getData(1000);
        console.log(data);
    }

    render() {
        return (
            <div className={style.example}>
                Example12
                <Button onClick={this.syncAction}>同步action</Button>
                <img src={user}/>
                <img src={logo}/>
            </div>
        )
    }

    syncAction = () => {    
        this.props.dispatch({
            type: "global/changeLayoutCollapsed", 
            payload: true
        });
    }
}