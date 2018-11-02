import React from "react";
import { connect } from "dva";
import { Button, Row, Col, Skeleton } from "antd";

@connect(({ example = {}, loading }) => ({
    ...example,
    loading
}))
export default class Example1 extends React.Component {
    render() {
        const { loading } = this.props;
        return (
            <div>
                <Button type="primary" onClick={ this.handleAsyncRequest }>发送异步请求</Button>
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

    handleAsyncRequest = () => {
        const { dispatch } = this.props;
        dispatch({ type: "example/asyncRequest" });
    }
}