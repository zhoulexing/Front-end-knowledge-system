import React from 'react';


class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        console.log('hello te lang pu!');
    }

    render() {
        return <h1 onClick={this.onClick}>hello te lang pu!</h1>
    }
}

export default Index;