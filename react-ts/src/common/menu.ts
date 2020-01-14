export interface MenuItem {
    name: string;
    icon?: string;
    path: string;
    authority?: String[];
    children?: MenuItem[];
}

export interface MenuData extends Array<MenuItem> {};

const menuData: MenuData = [
    {
        name: "系统首页",
        icon: "home",
        path: "desktop"
    },
    {
        name: "研判市场",
        icon: "shopping-cart",
        path: "market"
    },
    {
        name: "数据资源",
        icon: "database",
        path: "datasource"
    },
    {
        name: "我的",
        icon: "user",
        path: "my",
        children: [
            {
                name: "研判",
                path: "determine"
            },
            {
                name: "资源",
                path: "datasource"
            }
        ]
    },
    {
        name: "示例",
        icon: "smile",
        path: "example",
        children: [
            {
                name: "示例1",
                path: "1"
            },
            {
                name: "示例2",
                path: "2"
            }
        ]
    }
];

function formatter(data: MenuData, parentPath: String = "/apps/", parentAuthority?: String[]) {
    return data.map(item => {
        const result: MenuItem = {
            ...item,
            authority: item.authority || parentAuthority,
            path: parentPath + item.path
        };
        if (item.children) {
            result.children = formatter(
                item.children,
                `${parentPath}${item.path}/`,
                item.authority
            );
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
