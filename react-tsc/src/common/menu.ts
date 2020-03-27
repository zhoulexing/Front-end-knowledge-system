import * as React from "react";
import {
    HomeOutlined,
    SmileOutlined,
    WarningOutlined
} from "@ant-design/icons";

export interface MenuDataItem {
    key?: string;
    name: string;
    icon?: React.ReactNode;
    path: string;
    hideInMenu?: boolean;
    target?: string;
    authority?: Array<string>;
    children?: Array<MenuDataItem>;
}

export interface MenuData extends Array<MenuDataItem> {}

const menuData: MenuData = [
    {
        name: "示例",
        icon: SmileOutlined,
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
    },
    {
        name: "ES2020",
        icon: HomeOutlined,
        path: "es2020"
    },
    {
        name: "异常页",
        icon: WarningOutlined,
        path: "exception",
        children: [
            {
                name: "404",
                path: "404"
            }
        ]
    }
];

function formatter(
    data: MenuData,
    parentPath = "/apps/",
    parentAuthority?: string[]
) {
    return data.map(item => {
        const result = {
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
