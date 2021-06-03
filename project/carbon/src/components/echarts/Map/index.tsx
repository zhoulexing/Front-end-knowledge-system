import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/toolbox';


const json = require('./zhejiang.json');

interface IProps {
}

let mapEcharts: any = null;

const DATA = [
    {
        name: '杭州市', 
        value: 20057.34,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '湖州市', 
        value: 15477.48,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '嘉兴市', 
        value: 31686.1,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '绍兴市', 
        value: 6992.6,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '宁波市', 
        value: 44045.49,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '舟山市', 
        value: 40689.64,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '金华市', 
        value: 37659.78,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '衢州市', 
        value: 45180.97,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '台州市', 
        value: 55204.26,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '丽水市', 
        value: 21900.9,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
    {
        name: '温州市', 
        value: 4918.26,
        items: [
            {
                name: '企业数量',
                value: 28
            },
            {
                name: '碳排放量统计',
                value: 5656
            },
        ]
    },
];

const options = {
    title: {
        text: '',
    },
    tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: '#333',
        textColor: {
            color: '#fff',
            fontWeight: 'blod',
        },
        formatter: ({ data }: { data: typeof DATA[0]}) => {
            let str = data.name;
            data.items.forEach(item => {
                str += `</br>${item.name}    ${item.value}`;
            });
            return str;
        }
    },
    toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    visualMap: {
        show: false,
        min: 800,
        max: 50000,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
            color: ['#bde6ff', '#67b1de', '#2fa2e8']
        }
    },
    textStyle: {
        color: '#fff',
        fontWeight: 'blod'
    },
    series: [
        {
            name: '',
            type: 'map',
            roam: false,
            zoom: 1,
            mapType: 'zhejiang',
            label: {
                show: true,
                color: '#fff',
            },
            emphasis: {
                lable: {
                    show: true,
                },
                itemStyle: {
                    areaColor: '#0236f5',
                    
                }
            },
            data: DATA,
        }
    ]
}


const AreaMap: React.FC<IProps> = (props) => {

    useEffect(() => {
        if (!mapEcharts) {
            echarts.registerMap('zhejiang', json);
            mapEcharts = echarts.init(document.getElementById("testMap") as HTMLElement);
            mapEcharts.setOption(options);
        }
        
        return () => {
            mapEcharts = null;
        }
    }, []);

    return (
        <div id="testMap" style={{ width: '900px', height: '700px', paddingLeft: '80px'}}></div>
    )
}

export default AreaMap;
