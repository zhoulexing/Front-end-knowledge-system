import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

class Count extends Component {
    constructor() {
        super();
        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        console.log('child -> derived -> ', props.count);
        return { ...props, ...state };
    }

    componentDidMount() {
        console.log('child -> didMount -> ', this.props.count);
    }

    render() {
        const { count } = this.props;
        const { name } = this.state;
        return (
            <div>
                <div>{ count }</div>
                <div>{ name }</div>
                <Button onClick={this.handleClick}>点我</Button>
          </div>
        );
    }

    handleClick = () => {
        this.setState({ name: 'yww' });
    }
}

function mapStateToProps({ global }) {
    return {
        count: global.count,
    };
}

export default connect(mapStateToProps)(Count);
