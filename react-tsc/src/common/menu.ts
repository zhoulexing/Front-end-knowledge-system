export interface MenuDataItem {
    name: string;
    icon?: string;
    path: string;
    authority?: Array<string>,
    children?: Array<MenuDataItem>
}

export interface MenuData extends Array<MenuDataItem> {}

const menuData: MenuData = [
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


function formatter(data: MenuData, parentPath = "/apps/", parentAuthority?: Array<string>) {
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