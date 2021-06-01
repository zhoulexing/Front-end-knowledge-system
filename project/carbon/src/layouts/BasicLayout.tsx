import React from 'react';
import styles from './BasicLayout.less';

const LEFT_MENUS = [
    {
        name: "总览",
    },
    {
        name: "时序",
    },
    {
        name: "路线",
    },
    {
        name: "能源",
    },
    {
        name: "工业",
    },
    {
        name: "交通",
    }
];


const RIGHT_MENUS = [
    {
        name: "建筑",
    },
    {
        name: "农业",
    },
    {
        name: "居民生活",
    },
    {
        name: "科技创新",
    },
];


const BlankLayout: React.FC = ({ children }) => {
    return (
        <div className={styles.bg}>
            <header className={styles.header}>
                <div className={styles.left}>
                    {LEFT_MENUS.map(item => (
                        <div className={styles.leftMenu} key={item.name}>{item.name}</div>
                    ))}
                </div>
                <div className={styles.middle}></div>
                <div className={styles.right}>
                    {RIGHT_MENUS.map(item => (
                        <div className={styles.rightMenu} key={item.name}>{item.name}</div>
                    ))}
                </div>
            </header>
            {children}
        </div>
    )
};

export default BlankLayout;
