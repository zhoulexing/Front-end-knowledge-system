import React from 'react';
import useGlobal from './store';
import { Button } from 'antd';

const StateManager = () => {
    return (
        <div>
            <Comp1 />
            <Comp2 />
        </div>
    )
}

const Comp1 = () => {
    const [globalState, globalActions] = useGlobal();
    return (
        <div>
            <span>数量: {globalState.count}, </span>
            <span>姓名: {globalState.name}, </span>
            <Button onClick={globalActions.count.increase}>添加</Button>
            <Button onClick={globalActions.user.getName}>获取姓名</Button>
        </div>
    )   
}

const Comp2 = () => {
    const [globalState, globalActions] = useGlobal();
    return (
        <div>
            <span>数量: {globalState.count}, </span>
            <span>姓名: {globalState.name}, </span>
            <Button onClick={globalActions.count.decrease}>减少</Button>
            <Button onClick={globalActions.user.getName}>获取姓名</Button>
        </div>
    )  
}


export default StateManager;