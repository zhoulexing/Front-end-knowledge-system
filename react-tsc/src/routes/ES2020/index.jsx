import * as React from "react";
import { Button } from "antd";



export default class ES2020 extends React.Component {
    #id = 0;

    static name = "zlx";
    
    static #age = 20;

    #increment() {
        this.#id++;
    }

    componentDidCatch(err) {
        console.log(err);
    }

    render() {
        return (
            <div>
                <div>
                    <span>数组扁平化</span>
                    <Button onClick={this.flat}>flat</Button>
                    <Button onClick={this.flatMap}>flatMap</Button>
                </div>
                <div>
                    <span>类的私有变量</span>
                    <Button onClick={this.getPrivite}>操作</Button>
                </div>
                <div>
                    <span>可选操作链</span>
                    <Button onClick={this.getChainProp}>操作</Button>
                </div>
                <div>
                    <span>空位合并操作</span>
                    <Button onClick={this.getOperation}>操作</Button>
                </div>
                <div>
                    <span>BigInt</span>
                    <Button onClick={this.getBigInt}>操作</Button>
                </div>
                <div>
                    <span>Top-level await</span>
                    <Button onClick={this.getAwait}>操作</Button>
                </div>
            </div>
        )
    }

    getAwait = async () => {
        const value = await this.getAsyncData(100);
        console.log(value);
    }

    getAsyncData(value) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(value);
            });
        });
    }

    getBigInt = () => {
        const num = 1111;
        const bigNum = BigInt(num);
        console.log(typeof bigNum, bigNum);
    }

    getOperation = () => {
        let a = 0;
        let b = a ?? 1;
        console.log(b);
    }

    getChainProp = () => {
        const obj = {};
        console.log(obj?.first?.second);
    }

    getPrivite = () => {
        this.#increment();
        console.log(this.id);
        console.log(ES2020.name);
        console.log(ES2020.#age);
    }

    flat = () => {
        console.log([1, 2, [3, 4, [5, 6]]].flat());
    }

    flatMap = () => {
        
    }
}