import React, { Component } from 'react';
import DotTitle from '../../components/DotTitle';
import ProgressTitle from '../../components/ProgressTitle';
import styles from './index.less';
import { Map, Histogram } from '../../components/echarts';
import url2 from '../../assets/2.png';
import right1 from '../../assets/right/1.png';
import right2 from '../../assets/right/2.png';
import right3 from '../../assets/right/3.png';
import right4 from '../../assets/right/4.png';

class Home extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div style={{marginBottom: "40px"}}>
                        <DotTitle text="重点行业碳排放量实时监测数据"></DotTitle>
                        <div style={{ marginTop: "10px" }}><img src={url2}/></div>
                    </div>
                    <div className={styles.c17}>
                        <div className={styles.c18}>6 + 1领域双碳监测</div>
                        <div className={styles.c19}>产业监测</div>
                        <div className={styles.c20}>区域双碳监测</div>
                    </div>
                    <div>
                        <Histogram />
                    </div>
                </div>
                <div className={styles.middle}>
                    <div className={styles.mdUp}>
                        <div className={styles.mdLeft}>
                            <div>
                                <DotTitle text="碳达峰倒计时"></DotTitle>
                                <div>距离<span style={{ fontSize: "16px", marginLeft: "5px" }}>2029.12.31</span>,还有</div>
                                <div className={styles.mdTime}>
                                    <div className={styles.c21}>3</div>
                                    <div className={styles.c21}>2</div>
                                    <div className={styles.c21}>8</div>
                                    <div className={styles.c21}>7</div>
                                </div>
                                <div style={{ color: "#77818e", textAlign: "center" }}>(天)</div>
                            </div>
                        </div>
                        <div className={styles.mdRight}>
                            <div>
                                <DotTitle text="能源消费总量"></DotTitle>
                                <div>当前: <span className={styles.num}>2.47</span>亿吨标煤</div>
                                <div>目标: <span className={styles.num}>2.5</span>亿吨标煤</div>
                                <ProgressTitle text="任务完成" iconType="success" precent="98%" />
                            </div>
                            <div>
                                <DotTitle text="碳排放总量"></DotTitle>
                                <div>当前: <span className={styles.num}>2.47</span>亿吨</div>
                                <div>目标: <span className={styles.num}>2.5</span>亿吨</div>
                                <ProgressTitle text="任务不通过" iconType="warn" precent="30%" />
                            </div>
                            <div>
                                <DotTitle text="能耗强度"></DotTitle>
                                <div>当前: <span className={styles.num}>0.32</span>吨标煤/万元</div>
                                <div>目标: <span className={styles.num}>0.41</span>吨标煤/万元</div>
                                <ProgressTitle text="任务未完成" iconType="error" precent="20%" />
                            </div>
                            <div>
                                <DotTitle text="碳排放强度"></DotTitle>
                                <div>当前: <span className={styles.num}>0.76</span>吨/万元</div>
                                <div>目标: <span className={styles.num}>0.76</span>吨/万元</div>
                                <ProgressTitle text="任务未成" iconType="success" precent="100%" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.mapContainer}>
                        <Map />
                        <div className={styles.mapTime}>
                            <div className={styles.c1}>
                                <div className={styles.c3}>月</div>
                                <div className={styles.c2}>季</div>
                                <div className={styles.c2}>年</div>
                            </div>
                            <div className={styles.c4}>
                                {['5月', '4月', '3月', '2月', '1月'].map((item, index) => (
                                    <div className={styles.c5} key={item}>
                                        {
                                            index === 0 ?
                                            <div className={styles.c7}>
                                                <div className={styles.c8}></div>
                                            </div>
                                            :
                                            <div className={styles.c11}></div>
                                        }
                                        
                                        <div className={index === 0 ? styles.c6 : styles.c10}>{item}</div>
                                        { index !== 4 && <div className={styles.c9}></div> }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.c12}>
                        <div className={styles.c13}>
                            <div className={styles.c14}></div>
                            总领域
                        </div>
                        <div className={styles.c15}>
                            <div className={styles.c16}></div>
                            能源
                        </div>
                        <div className={styles.c15}>
                            <div className={styles.c14}></div>
                            工业
                        </div>
                        <div className={styles.c15}>
                            <div className={styles.c14}></div>
                            交通
                        </div>
                        <div className={styles.c15}>
                            <div className={styles.c16}></div>
                            建筑
                        </div>
                        <div className={styles.c15}>
                            <div className={styles.c14}></div>
                            农业
                        </div>
                        <div className={styles.c15}>
                            <div className={styles.c14}></div>
                            居民生活
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div>
                        <img src={right1}/>
                    </div>
                    <div>
                        <img src={right2}/>
                    </div>
                    <div>
                        <img src={right4}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;