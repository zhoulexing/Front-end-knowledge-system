import React, { useState, useEffect, ReactText,useRef } from "react";
import { ListView } from "antd-mobile";
import ReactDOM from 'react-dom';

interface DataItem {
    id: string;
    img: string;
    title: string;
    des: string;
}

interface DataBolb {
    [key: string]: DataItem;
}

const data: DataItem[] = [
    {
        id: "1",
        img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
        title: "Meet hotel",
        des: "不是所有的兼职汪都需要风吹日晒",
    },
    {
        id: "2",
        img: "https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",
        title: "McDonald's invites you",
        des: "不是所有的兼职汪都需要风吹日晒",
    },
    {
        id: "3",
        img: "https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",
        title: "Eat the week",
        des: "不是所有的兼职汪都需要风吹日晒",
    },
];

function genData() {
    const dataBlobs: DataBolb = {};
    data.forEach((row) => {
        dataBlobs[row.id] = row;
    });
    return dataBlobs;
}

const MyListView = () => {
    let lv = useRef<ListView>();
    const listViewDataSource = new ListView.DataSource({
        rowHasChanged: (row1: DataItem, row2: DataItem) => row1.id !== row2.id,
    });

    const [dataSource, setDataSource] = useState(listViewDataSource);
    const [height, setHeight] = useState<number>(document.documentElement.clientHeight - 30);

    useEffect(() => {
        // if(lv.current) {
        //     const hei = document.documentElement.clientHeight - ((ReactDOM.findDOMNode(lv.current) as HTMLElement).parentNode as HTMLElement).offsetTop;
        //     setHeight(hei);
        // }
        setDataSource(dataSource.cloneWithRows(genData()));
    }, []);

    const row = (rowData: DataItem, sectionID: ReactText, rowID: ReactText) => {
        return (
            <div style={{ display: 'flex' }}>
                <div>{rowData.title}</div>
                <div>{rowData.des}</div>
                <div>{rowData.id}</div>

            </div>
        )
    };

    return <ListView dataSource={dataSource} renderRow={row} style={{ height: document.documentElement.clientHeight }}/>;
};

export default MyListView;


