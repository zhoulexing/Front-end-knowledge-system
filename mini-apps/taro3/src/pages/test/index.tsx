import React, { Component } from "react";
import { View, ScrollView } from "@tarojs/components";
import Taro, { setNavigationBarTitle } from "@tarojs/taro";
import VirtualList from "@tarojs/components/virtual-list";

const getId = (() => {
    let id = 0;
    return () => {
        return id++;
    };
})();

const getData = (): Promise<ListProps[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const arr: ListProps[] = [];
            for (let i = 0; i < 100; i++) {
                let id = getId();
                arr.push({
                    id,
                    title: `title-${id}`,
                });
            }
            resolve(arr);
        }, 1000);
    });
};

interface ListProps {
    id: number;
    title: string;
}

interface IProps {}
interface IState {
    list: ListProps[];
}

export default class Test extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentWillMount() {
        // console.log(Taro.getCurrentInstance());
    }

    componentDidMount() {
        my.setNavigationBar({
            title: "测试1",
        });
        this.resetList();
    }

    componentWillUnmount() {}

    componentDidShow() {
        console.log("componentDidShow");
    }

    async resetList() {
        const { list } = this.state;
        const data = await getData();
        this.setState({
            list: [...list, ...data],
        });
    }

    componentDidHide() {}

    onReachBottom() {
        this.resetList();
    }

    render() {
        const Row = ({ index, style, data }) => {
            return <View style={style}>{data[index].title}</View>;
        };

        const { list } = this.state;

        return (
            <View className="index">
                <View>虚拟列表</View>
                {/* <VirtualList
                    width="100%"
                    height={300}
                    itemData={list}
                    itemCount={list.length}
                    itemSize={50}
                    onScroll={({ scrollDirection, scrollOffset }) => {
                        if(
                            scrollDirection === 'forward' &&
                            // 6 = (列表高度 / 单项列表高度)
                            // 100 滚动提前加载量，可根据样式情况进行调整
                            scrollOffset > ((list.length - 6) * 50 + 100)
                        ) {
                            this.resetList();
                        }
                    }}
                >
                    {Row}
                </VirtualList> */}
                <ScrollView scrollY style={{ height: "100%" }}>
                    <View>
                        {list.map((item) => (
                            <View key={item.id}>{item.title}</View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }
}
