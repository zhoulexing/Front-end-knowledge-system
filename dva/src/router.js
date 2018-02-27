import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import { getRouterData } from './common/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import Authorized from './utils/Authorized';
import styles from './index.less';


const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
	return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
	const routerData = getRouterData(app);
	const Login = routerData['/login'].component;
	const MainLayout = routerData['/main'].component;
	const Example = routerData['/example'].component;
	return (
		<LocaleProvider locale={zhCN}>
			<ConnectedRouter history={history}>
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/example" exact component={Example} />
					<AuthorizedRoute
						path="/main"
						render={props => <MainLayout {...props} />}
						authority={['admin', 'user']}
						redirectPath="/main"
					/>
				</Switch>
			</ConnectedRouter>
		</LocaleProvider>
	);
}

export default RouterConfig;
