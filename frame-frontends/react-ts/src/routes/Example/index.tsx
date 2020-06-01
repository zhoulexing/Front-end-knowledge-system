import React from "react";
import { Button, Popover } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import user from "@/assets/images/user.jpg";
import logo from "@/assets/images/logo.svg";
import isEmpty from "lodash/isEmpty";
import { ConnectState } from "@/store/common";
import { ExampleModelState } from "@/models/example";
import style from "./index.less";

export interface ExampleProps extends ExampleModelState{
    dispatch: Dispatch;
}

class Example extends React.Component<ExampleProps> {
  getData(value: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, 1000);
    });
  }

  async componentDidMount() {
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
        <img src={user} />
        <img src={logo} />

        <Popover content="parent">
          <div>
            <Button>123</Button>
            <Popover content="children">
              <Button>456</Button>
            </Popover>
          </div>
        </Popover>
      </div>
    );
  }

    add = () => {
      let { count } = this.props;
      this.props.dispatch({
        type: "example/add",
        payload: {
          count: ++count,
        },
      });
    }

    asyncAction = () => {
      const { count, data } = this.props;
      this.props.dispatch({
        type: "example/fetchData",
        payload: data.concat(count),
      });
    }
}

export default connect(({ example }: ConnectState) => ({
  ...example,
}))(Example);
