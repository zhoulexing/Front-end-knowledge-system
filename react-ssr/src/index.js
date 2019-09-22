import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';


function render() {
    const Routes = require('./router').default;
    ReactDOM.render(
        <Provider store={store}>
            <Routes />
        </Provider>,
        document.getElementById('root'),
    );
}
render();

if (module.hot) {
    const renderNormally = render;
    const renderException = (error) => {
        const RedBox = require('redbox-react');
        ReactDOM.render(<RedBox error={error} />, document.getElementById('root'));
    };
    render = () => {
        try {
            renderNormally();
        } catch (error) {
            renderException(error);
        }
    };
    module.hot.accept('./router', () => {
        render();
    });
}