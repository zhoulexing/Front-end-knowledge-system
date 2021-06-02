import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface IProps {
}

let mapEcharts: any = null;

const options = {
    title: {
        text: '',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['总量', '总目标']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['能源', '工业', '交通', '建筑', '农业', '居民生活']
    },
    series: [
        {
            name: '总量',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230, 134141]
        },
        {
            name: '总目标',
            type: 'bar',
            data: [12203, 13489, 39034, 154970, 31744, 635230, 34141]
        }
    ]
};

const Histogram: React.FC<IProps> = (props) => {

    useEffect(() => {
        if (!mapEcharts) {
            mapEcharts = echarts.init(document.getElementById("histogram") as HTMLElement);
            mapEcharts.setOption(options);
        }
        
        return () => {
            mapEcharts = null;
        }
    }, []);

    return (
        <div id="histogram" style={{ width: '485px', height: '500px'}}></div>
    )
}

export default Histogram;
