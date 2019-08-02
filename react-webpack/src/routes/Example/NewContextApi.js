import React, { Component, createContext } from 'react';

const DEFAULT_STATE = { color: 'red' };
const { Provider, Consumer } = createContext(DEFAULT_STATE);

const ReceiverComponent = props => (
    <Consumer>
        {context => <div style={{ color: context.color }}> Hello, this is receiver. </div>}
  </Consumer>
);

const MidComponent = props => <ReceiverComponent />;

export default class DeliverComponent extends Component {
    state = { color: 'purple' };

    render() {
        return (
            // 如果没有Provider,则默认是DEFAULT_STATE
            <Provider value={this.state}>
                <MidComponent />
          </Provider>
        );
    }
}
