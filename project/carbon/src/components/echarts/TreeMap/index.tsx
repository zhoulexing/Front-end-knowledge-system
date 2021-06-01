import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface IProps {
}

let mapEcharts: any = null;

const options = {
    series: [{
        type: 'treemap',
        data: [{
            name: 'nodeA',            
            value: 10,
            children: [{
                name: 'nodeAa',       
                value: 4
            }, {
                name: 'nodeAb',       
                value: 6
            }]
        }, {
            name: 'nodeB',            
            value: 20,
            children: [{
                name: 'nodeBa',       
                value: 20,
                children: [{
                    name: 'nodeBa1',  
                    value: 20
                }]
            }]
        }]
    }]
};

const TreeMap: React.FC<IProps> = (props) => {

    useEffect(() => {
        if (!mapEcharts) {
            mapEcharts = echarts.init(document.getElementById("treeMap") as HTMLElement);
            mapEcharts.setOption(options);
        }
        
        return () => {
            mapEcharts = null;
        }
    }, []);

    return (
        <div id="treeMap" style={{ width: '500px', height: '500px'}}></div>
    )
}

export default TreeMap;
