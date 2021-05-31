import React, { Component } from 'react';
import DotTitle from '../../components/DotTitle';
import ProgressTitle from '../../components/ProgressTitle';
import styles from './index.less';

class Home extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div>
                        <DotTitle text="重点行业碳排放量实时监测数据"></DotTitle>
                    </div>
                    <div>
                        <DotTitle text="各行业碳排放量的实时/预测曲线"></DotTitle>
                        <div>
                            <div>钢铁行业</div>
                        </div>

                    </div>
                    <div>
                        <DotTitle text="行业新增产能能耗对比"></DotTitle>
                    </div>
                </div>
                <div className={styles.middle}>
                    <div className={styles.statics}>
                        <div>
                            <DotTitle text="能源消费总量"></DotTitle>
                            <div>当前: <span className={styles.num}>2.47</span>亿吨标煤</div>
                            <div>目标: <span className={styles.num}>2.5</span>亿吨标煤</div>
                            <ProgressTitle text="任务完成" iconType="success" precent="98%"/>
                        </div>
                        <div>
                            <DotTitle text="碳排放总量"></DotTitle>
                            <div>当前: <span className={styles.num}>2.47</span>亿吨</div>
                            <div>目标: <span className={styles.num}>2.5</span>亿吨</div>
                            <ProgressTitle text="任务不通过" iconType="warn" precent="30%"/>
                        </div>
                        <div>
                            <DotTitle text="能耗强度"></DotTitle>
                            <div>当前: <span className={styles.num}>0.32</span>吨标煤/万元</div>
                            <div>目标: <span className={styles.num}>0.41</span>吨标煤/万元</div>
                            <ProgressTitle text="任务未完成" iconType="error" precent="20%"/>
                        </div>
                        <div>
                            <DotTitle text="碳排放强度"></DotTitle>
                            <div>当前: <span className={styles.num}>0.76</span>吨/万元</div>
                            <div>目标: <span className={styles.num}>0.76</span>吨/万元</div>
                            <ProgressTitle text="任务未成" iconType="success" precent="100%"/>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>333</div>
            </div>
        )
    }
}

export default Home;