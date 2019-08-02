const menuData = [
    {
        name: '系统首页',
        icon: 'desktop',
        path: 'desktop',
        children: [
            {
                name: '打印发货',
                icon: 'deliver',
                path: 'deliver',
            },
        ],
    },
    {
        name: '示例',
        icon: 'example',
        path: 'example',
    },
];


function formatter(data, parentPath = '/', parentAuthority) {
    return data.map((item) => {
        const result = {
            ...item,
            authority: item.authority || parentAuthority,
            path: parentPath + item.path,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
