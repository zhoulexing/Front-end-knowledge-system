import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { getRoutes } from "../utils/util";
import style from "./MainLayout.less";

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
        )
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