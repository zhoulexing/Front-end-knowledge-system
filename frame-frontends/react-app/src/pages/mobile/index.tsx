import React from 'react';
import { InputItem, Button }  from 'antd-mobile';
import Spin from '../../components/Spin';
import styles from './index.module.less';
import MyListView from './components/MyListView';


const Mobile = () => {
    const onClick = () => {
        console.log('111');
    }

    return (
        <div className={styles.container}>
            <InputItem className='lt-input'/>
            <Button>测试</Button>
            <Spin spinning={true} tip='测试'>
                <Button onClick={onClick}>123</Button>
            </Spin>

            <MyListView />
        </div>
    )
}

export default Mobile;