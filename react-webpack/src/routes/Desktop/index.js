import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Count from './count';
import { a, b } from '../../utils/util';

console.log(a, b);

class Desktop extends Component {
    constructor(props) {
        super(props);
        // props.dispatch({
        //     type: "global/add",
        //     payload: {
        //         count: 1,
        //     }
        // });
    }

    componentDidMount() {
        console.log(this.props.count, this.props.name);
    }

    render() {
        const { count } = this.props;
        return (
            <div>
                <Button size="large" type="primary" onClick={this.add}>Desktop1</Button>
                <Count />
          </div>
        );
    }

    add = () => {
        this.props.dispatch({
            type: 'global/add',
            payload: {
                count: 6,
            },
        });
    }
}

function mapStateToProps({ global, example }) {
    return {
        count: global.count,
        name: example.name,
    };
}

export default connect(mapStateToProps)(Desktop);
