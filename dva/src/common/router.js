import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

// 判断组件对应的model是否定义了
const modelNotExisted = (app, model) => (
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// 动态包装组件
const dynamicWrapper = (app, models, component) => {
  //判断组件是否含有.then
  	if (component.toString().indexOf('.then(') < 0) {
		models.forEach((model) => {
			if (modelNotExisted(app, model)) {
				app.model(require(`../models/${model}`).default);
			}
		});
		// 将routerData添加到每个组件
		return (props) => {
			if (!routerDataCache) {
				routerDataCache = getRouterData(app);
			}
			return createElement(component().default, {
				...props,
				routerData: routerDataCache,
			});
		};
	}

  	return dynamic({
		app,
		models: () => models.filter(
			model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
		),
		// 将routerData添加到每个组件
		component: () => {
			if (!routerDataCache) {
				routerDataCache = getRouterData(app);
			}
			return component().then((raw) => {
				const Component = raw.default || raw;
				return props => createElement(Component, {
				...props,
				routerData: routerDataCache,
				});
			});
		},
  	});
};

export const getRouterData = (app) => {
	//路由配置
    const routerConfig = {
        '/login': {
            component: dynamicWrapper(app, ['login'], () => import('../routes/Login/Login'))
		},
		'/main': {
			component: dynamicWrapper(app, [], () => import('../layouts/MainLayout'))
		},
        '/example': {
            component: dynamicWrapper(app, ['example'], () => import('../routes/Example/Example'))
        }
    };

  	const routerData = {};

	Object.keys(routerConfig).forEach((path) => {
		let router = routerConfig[path];
		router = {
			...router,
			name: router.name,
			authority: router.authority
		};
		routerData[path] = router;
	});
	return routerData;
};
