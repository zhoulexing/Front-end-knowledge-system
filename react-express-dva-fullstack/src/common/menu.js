const menuData = [
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
    }
];


function formatter(data, parentPath = "/apps/", parentAuthority) {
    return data.map(item => {
        const result = {
            ...item,
            authority: item.authority || parentAuthority,
            path: parentPath + item.path
        };
        if(item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);