import React from "react";
import { Button, Row, Col, Skeleton } from "antd";
import styles from "./example2.less";
import { connect } from "dva";

@connect(({ loading, example }) => ({
    ...example,
    loading
}))
export default class Example2 extends React.Component {

    render() {
        const { loading, user, list } = this.props;
        return (
            <div className={ styles.example2 }>
                <h1>{ user && user.loginname }</h1>
                <Button type="primary" onClick={ this.getUserMsg }>发送异步请求</Button>
                <Button type="primary" onClick={ this.getUserList }>测试mock</Button>
                <ul>
                    { list && list.map((item, index) => <li key={ index }>{ item }</li>) }
                </ul>
                <Row gutter={ 32 }>
                    <Col span={ 12 }>
                        <Skeleton loading={ loading.global } avatar paragraph={{ rows: 4 }} >
                            <div>111</div>
                            <div>222</div>
                            <div>333</div>
                            <div>444</div>
                        </Skeleton>
                    </Col>
                    <Col span={ 12 }>222</Col>
                </Row>
            </div>
        )
    }

    getUserMsg = () => {
        const { dispatch } = this.props;
        dispatch({ type: "example/getUserMsg" });
    }

    getUserList = () => {
        const { dispatch } = this.props;
        dispatch({ type: "example/getUserList" });
    }
}
