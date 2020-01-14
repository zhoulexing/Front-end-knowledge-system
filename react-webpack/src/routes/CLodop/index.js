import React, { Component } from 'react';
import { Button } from 'antd';
import { printImage, previewImage, previewHtm, previewTable } from '../../utils/cLodop';
import { test } from '../../../../react-dva-webpack/src/utils/util';

export default class CLodop extends Component {

    preview = () => {
        previewImage(0, 0, 1000, 1000, "https://img.alicdn.com/bao/uploaded/i2/663734805/O1CN01DBJIGA1lMjeFTryym_!!663734805.jpg");
    }

    previewHtm = () => {
        previewHtm(0, 0, "100%", "100%");
    }

    previewTable = () => {
        previewTable(0, 0, "100%", "100%");
    }

    print = () => {
        printImage(0, 0, 100, 100, "https://img.alicdn.com/bao/uploaded/i2/663734805/O1CN01DBJIGA1lMjeFTryym_!!663734805.jpg");
    }

    componentDidMount() {
        console.log(test());
    }

    render() {
        return (
            <>
                <Button type="primary" onClick={this.preview}>预览</Button>
                <Button type="primary" onClick={this.print}>打印</Button>
                <Button type="primary" onClick={this.previewHtm}>预览网页</Button>
                <Button type="primary" onClick={this.previewTable}>预览表格</Button>
            </>
        )
    }
}
