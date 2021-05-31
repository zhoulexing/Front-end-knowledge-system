import React from 'react';
import styles from './index.less';
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';

interface IProps {
    text: string;
    iconType: 'success' | 'warn' | 'error';
    precent: string;
}

const iconMap = {
    success: <CheckCircleOutlined style={{ color: '#aaff03'}}/>,
    warn: <ExclamationCircleOutlined style={{ color: '#eada11'}}/>,
    error: <CloseCircleOutlined style={{ color: '#dc1616'}}/>
}

const ProgressTitle: React.FC<IProps> = ({text, iconType, precent }) => {
    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                <span>{text}</span>
                {iconMap[iconType]}
            </div>
            <div className={styles.progress}>
                <div className={styles[iconType]} style={{ width: precent }}></div>
            </div>
        </div>
    )
}

export default ProgressTitle;