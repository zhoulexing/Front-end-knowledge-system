import React from 'react';
import ReactDOM from 'react-dom';

export default function createLegacyRoot(container) {
    return {
        render(Component, props, context) {
            ReactDOM.render(
                <Component {...props} context={context} />,
                container
            );
        },

        unmount() {
            ReactDOM.unmountComponentAtNode(container);
        },
    };
}
