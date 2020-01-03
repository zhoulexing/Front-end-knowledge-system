import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button } from 'antd';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import style from './MainLayout.less';
import { getRoutes } from '../utils/util';

@connect(({ global }) => ({
    global,
}))
export default class MainLayout extends PureComponent {
    componentDidMount() {
        this.login();
    }

    render() {
        const {
            routerData,
            match,
        } = this.props;
        return (
          <div className={style.mainLayout}>
            <div>MainLayout</div>
            <Button onClick={this.goOtherRoute.bind(this, '/apps/example')}>go to example</Button>
            <Button onClick={this.goOtherRoute.bind(this, '/apps/desktop')}>go to desktop</Button>
            <Button onClick={this.goOtherRoute.bind(this, '/apps/hooks')}>go to hooks</Button>
            <Button onClick={this.goOtherRoute.bind(this, '/apps/hotkeys')}>go to hotkeys</Button>
            <Button onClick={this.goOtherRoute.bind(this, '/apps/clodop')}>go to clodop</Button>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
                    ))}
            </Switch>
          </div>
        );
    }

    goOtherRoute(url) {
        this.props.dispatch(push(url));
    }

    async login() {
        const data = await this.getData();
        console.log(data);
    }

    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(100);
            }, 200);
        });
    }
}
