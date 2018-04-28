import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import Loading from './Loading';


@connect(({ example, loading }) => ({
    ...example,
    loading: loading.effects['example/getTblList'],
}))
class Example extends Component {
    
    componentDidMount() {
        this.props.dispatch({
            type: 'example/getTblList'
        });
    }
    
    render() {
        const { loading, tblList } = this.props;
        return (
            <div>
                <Row gutter={ 16 }>
                    <Col span={ 12 }>
                        <div className={ styles.container }>
                            <h1>Blur word Animation</h1>
                        </div>
                    </Col>
                    <Col span={ 12 }>
                        <Loading loading={ loading }>
                            <Table dataSource={ tblList.dataSource } columns={ tblList.columns } />
                        </Loading>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Example;
