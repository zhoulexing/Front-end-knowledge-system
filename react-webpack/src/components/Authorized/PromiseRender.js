import React from 'react';
import { Spin } from 'antd';

export default class PromiseRender extends React.PureComponent {
    state = {
        component: null,
    }

    componentDidMount() {
        this.setRenderComponent(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setRenderComponent(nextProps);
    }

    setRenderComponent(props) {
        const ok = this.checkIsInstantiation(props.ok);
        const error = this.checkIsInstantiation(props.error);
        props.promise.then(() => {
            this.setState({ component: ok });
        }).catch(() => {
            this.setState({ component: error });
        });
    }

    checkIsInstantiation(target) {
        if (!React.isValidElement(target)) {
            return target;
        }
        return () => target;
    }

    render() {
        const { component: Component } = this.state;
        if (Component) {
            return <Component {...this.props} />;
        }
        return (
            <div style={{
                width: '100%',
                height: '100%',
                margin: 'auto',
                paddingTop: 50,
                textAlign: 'center',
            }}
          >
                <Spin size="large" />
          </div>
        );
    }
}
