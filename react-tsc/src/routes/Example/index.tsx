import React from "react";
import style from "./index.less";
import { Button } from "antd";
import { connect } from "react-redux"; 
import user from "@/assets/images/user.jpg";
import logo from "@/assets/images/logo.svg";
import isEmpty from "lodash/isEmpty";
import { ConnectState } from "@/store/index.d";
import {} from "@/models/example";

export interface ExampleProps extends ExampleModelState{
    
}

@connect(({ example }: ConnectState) => ({
    ...example
}))
export default class Example extends React.Component<ExampleProps> {

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
        console.log(isEmpty({}));
    }

    render() {
        const { count } = this.props;
        return (
            <div className={style.example}>
                <span>{ count }</span>
                <Button onClick={this.add}>增加</Button>
                <Button onClick={this.asyncAction}>异步action</Button>
                <img src={user}/>
                <img src={logo}/>
                
                
            </div>
        )
    }

    add = () => {
        const { count } = this.props;
        this.props.dispatch({
            type: "example/add", 
            payload: {
                count: ++count
            }
        });
    }

    asyncAction = () => {
        const { count, data } = this.props;
        this.props.dispatch({
            type: "example/fetchData",
            payload: data.concat(count)
        });
    }
}