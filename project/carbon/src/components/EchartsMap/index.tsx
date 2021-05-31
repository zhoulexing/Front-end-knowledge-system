import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';


class AreaMap extends Component {
    componentDidMount() {
        this.chart = echarts.init(document.getElementById('mapZhejiang'));
        echarts.registerMap('china',);
    }

    render() {
        return (
            <div>
                <div id="mapZhejiang"></div>
            </div>
        )
    }
}

export default AreaMap;
