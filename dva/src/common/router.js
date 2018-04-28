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

/*
* 将层级的菜单转化成扁平化的菜单
* */
function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach((item) => {
        if (item.children) {
            keys[item.path] = { ...item };
            keys = { ...keys, ...getFlatMenuData(item.children) };
        } else {
            keys[item.path] = { ...item };
        }
    });
    return keys;
}

export const getRouterData = (app) => {
	//路由配置
    const routerConfig = {
        '/': {
            component: dynamicWrapper(app, [], () => import('../layouts/MainLayout'))
        },
        '/login': {
            component: dynamicWrapper(app, ['login'], () => import('../routes/Login/Login'))
		},
        '/main': {
            component: dynamicWrapper(app, ['main'], () => import('../routes/Main/Main'))
        },
        '/example': {
            component: dynamicWrapper(app, ['example'], () => import('../routes/Example'))
        },
        '/exception/403': {
            component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
        },
        '/exception/404': {
            component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
        },
        '/exception/500': {
            component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
        },
        '/exception/trigger': {
            component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
        },
    };

  	const routerData = {};

  	const menuData = getFlatMenuData(getMenuData());

	Object.keys(routerConfig).forEach((path) => {
        const pathRegexp = pathToRegexp(path);
        const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
        let menuItem = {};
        if (menuKey) {
            menuItem = menuData[menuKey];
        }
        let router = routerConfig[path];
        router = {
            ...router,
            name: router.name || menuItem.name,
            authority: router.authority || menuItem.authority,
        };
        routerData[path] = router;
	});
	return routerData;
};
