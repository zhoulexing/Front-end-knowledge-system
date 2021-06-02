import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface IProps {
}

let mapEcharts: any = null;

const options = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['今年', '去年']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '今年',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '去年',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
    ]
};

const Line: React.FC<IProps> = (props) => {

    useEffect(() => {
        if (!mapEcharts) {
            mapEcharts = echarts.init(document.getElementById("line") as HTMLElement);
            mapEcharts.setOption(options);
        }
        
        return () => {
            mapEcharts = null;
        }
    }, []);

    return (
        <div id="line" style={{ width: '485px', height: '500px'}}></div>
    )
}

export default Line;
