import React from "react";

export interface MenuDataItem {
    key?: string;
    name: string;
    path: string;
    icon?: React.ReactNode;
    hideInMenu?: boolean;
    authority?: Array<string>;
    children?: Array<MenuDataItem>;
}

const menuData: MenuDataItem[] = [
    {
        name: "示例",
        path: "example",
        children: [
            {
                name: "示例1",
                path: "1",
            },
        ],
    },
    {
        name: "异常页",
        path: "exception",
        children: [
            {
                name: "404",
                path: "404",
            },
        ],
    },
];

function formatter(
    data: MenuDataItem[],
    parentPath = "/",
    parentAuthority?: string[]
) {
    return data.map((item) => {
        const result = {
            ...item,
            authority: item.authority || parentAuthority,
            path: parentPath + item.path,
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
