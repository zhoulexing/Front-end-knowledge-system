import React from 'react';
import styles from './index.less';

interface IProps {
    text: string;
}

const DotTitle: React.FC<IProps> = ({text}) => {
    return (
        <div className={styles.container}>
            <div className={styles.dot}></div>
            <div className={styles.text}>{text}</div>
            <div className={styles.dot}></div>
        </div>
    )
}

export default DotTitle;