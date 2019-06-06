import React, { Component, PureComponent } from "react";
import { Button } from "antd";

export default class DataSource extends PureComponent {
    constructor() {
        super();
        this.state = {
            count: 0,
        };
    }
    componentDidMount() {
        this.setState({ count: this.state.count + 1 });
        console.log(this.state.count);

        this.setState({ count: this.state.count + 1 });
        console.log(this.state.count);

        setTimeout(() => {
            this.setState({ count: this.state.count + 1 });
            console.log(this.state.count);
            
            this.setState({ count: this.state.count + 1 });
            console.log(this.state.count);
        }, 0);
    }
    render() {
        console.log("render");
        return (
            <div>
                Hello World
            </div>
        )
    }

    handleFiber = () => {
        const dom = { 
            name: "a1", 
            render() { 
                return [
                    { 
                        name: "b1", 
                        render() { 
                            return [{ 
                                name: "c1",
                                render() {
                                    return null;
                                }
                            }];
                        } 
                    }, 
                    { 
                        name: "b2",
                        render() {
                            return null;
                        }
                    },
                    { 
                        name: "b3",
                        render() {
                            return null;
                        }
                    },
                ]
            }
        }
        const instance = new Node(dom);
        walk(instance);
    }

    handleClick = () => {
        const { obj } = this.state;
        obj.name = obj.name === "yww" ? "zlx" : "yww";
        this.setState({ obj });
        this.setState({
            count: this.state.count + 1
        });
        console.log(this.state.count);
        this.setState({
            count: this.state.count + 1
        });
        console.log(this.state.count);
        setTimeout(() => {
            this.setState({
                count: this.state.count + 1
            });
            console.log(this.state.count);
            this.setState({
                count: this.state.count + 1
            });
            console.log(this.state.count);
        }, 0);
    }
}

class Node {
    constructor(instance) {
        this.instance = instance;
        this.child = null;
        this.sibling = null;
        this.return = null;
    }
}

function link(parent, elements) {
    if(elements === null) elements = [];

    parent.child = elements.reduceRight((previous, current) => {
        const node = new Node(current);
        node.return = parent;
        node.sibling = previous;
        return node;
    }, null);

    return parent.child;
}

function doWork(node) {
    console.log(node.instance.name);
    const children = node.instance.render();
    return link(node, children);
}

function walk(o) {
    let root = o;
    let current = o;

    while (true) {
        // 为节点执行工作，获取并连接它的children
        let child = doWork(current);

        // 如果child不为空, 将它设置为当前活跃节点
        if (child) {
            current = child;
            continue;
        }

        // 如果我们回到了根节点，退出函数
        if (current === root) {
            return;
        }

        // 遍历直到我们发现兄弟节点
        while (!current.sibling) {

            // 如果我们回到了根节点，退出函数
            if (!current.return || current.return === root) {
                return;
            }

            // 设置父节点为当前活跃节点
            current = current.return;
        }

        // 如果发现兄弟节点，设置兄弟节点为当前活跃节点
        current = current.sibling;
    }
}