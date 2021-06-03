import React, { Component } from 'react';
import DotTitle from '../../components/DotTitle';
import ProgressTitle from '../../components/ProgressTitle';
import styles from './index.less';
import { Map, Histogram } from '../../components/echarts';
import classNames from 'classnames';
import url2 from '../../assets/2.png';
import right1 from '../../assets/right/1.png';
import right2 from '../../assets/right/2.png';
import right3 from '../../assets/right/3.png';
import right4 from '../../assets/right/4.png';
import left1 from '../../assets/left/1.png';
import left2 from '../../assets/left/2.png';
import left3 from '../../assets/left/3.png';

interface IProps {}

interface IState {
    leftTabKey: number;
}

class Home extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            leftTabKey: 1
        }
    }

    onLeftTabKey = (leftTabKey: number) => {
        this.setState({
            leftTabKey
        });
    }

    render() {
        const { leftTabKey } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div style={{marginBottom: "40px"}}>
                        <DotTitle text="重点行业碳排放量实时监测数据"></DotTitle>
                        <div style={{ marginTop: "10px" }}><img src={url2}/></div>
                    </div>
                    <div className={styles.c17}>
                        <div className={classNames(styles.c18, leftTabKey === 1 && styles.c22)} onClick={this.onLeftTabKey.bind(this, 1)}>6 + 1领域双碳监测</div>
                        <div className={classNames(styles.c19, leftTabKey === 2 && styles.c22)} onClick={this.onLeftTabKey.bind(this, 2)}>产业监测</div>
                        <div className={classNames(styles.c20, leftTabKey === 3 && styles.c22)} onClick={this.onLeftTabKey.bind(this, 3)}>区域双碳监测</div>
                    </div>
                    <div>
                        { 
                            leftTabKey === 1 &&
                            <div><img src={left1} /></div>
                        }
                        { 
                            leftTabKey === 2 &&
                            <div><img src={left2} /></div>
                        }
                        { 
                            leftTabKey === 3 &&
                            <div><img src={left3} /></div>
                        }
                    </div>
                </div>
                <div className={styles.middle}>
                    <div className={styles.mdUp}>
                        <div className={styles.mdLeft}>
                            <div>
                                <DotTitle text="碳达峰倒计时"></DotTitle>
                                <div style={{ fontSize: "15px", color: '#e5e8e9'}}>距离<span style={{ fontSize: "16px", marginLeft: "5px" }}>2029.12.31</span>,还有</div>
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
                            <div className={styles.c23}>
                                <div style={{ marginBottom: "10px"}}>
                                    <div className={styles.c24}>能源消费总量</div>
                                    <div className={styles.c25}>&lt;亿吨标煤&gt;</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>当前</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(归上)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>当前</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(全社会)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>目标</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(全社会)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                            </div>
                            <div className={styles.c23}>
                                <div style={{ marginBottom: "10px"}}>
                                    <div className={styles.c24}>碳排放总量</div>
                                    <div className={styles.c25}>&lt;亿吨&gt;</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>当前</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(归上)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>当前</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(全社会)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>目标</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(全社会)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                            </div>
                            <div className={styles.c23}>
                                <div style={{ marginBottom: "10px"}}>
                                    <div className={styles.c24}>能耗强度</div>
                                    <div className={styles.c25}>&lt;吨标煤/万元&gt;</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>当前</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(归上)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>当前</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(全社会)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>目标</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(全社会)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                            </div>
                            <div className={styles.c23}>
                                <div style={{ marginBottom: "10px"}}>
                                    <div className={styles.c24}>碳排放强度</div>
                                    <div className={styles.c25}>&lt;吨/万元&gt;</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>当前</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(归上)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>当前</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(全社会)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
                                <div className={styles.c26}>
                                    <div className={styles.c27}>
                                        <span>目标</span>
                                        <span style={{fontSize: "12px", marginLeft: "3px"}}>(全社会)：</span>
                                    </div>
                                    <div className={styles.c28}>2.47</div>
                                </div>
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
                    <div style={{marginBottom: "35px"}}>
                        <img src={right1}/>
                    </div>
                    <div style={{marginBottom: "35px"}}>
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