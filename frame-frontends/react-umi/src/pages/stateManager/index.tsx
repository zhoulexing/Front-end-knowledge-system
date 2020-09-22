import React from 'react';
import useGlobal from './store';
import { Button } from 'antd';
import { Provider, useGlobalState } from './useContext';
import reducers from './reducers';


const StateManager = () => {
    return (
        <div>
            <h3>自定义use-global-hook</h3>
            <Comp1 />
            <Comp2 />

            <h3>createContext and useContext</h3>
            <Provider reducers={reducers} initialState={{ a: 1 }}>
                <div>
                    <Comp3 />
                    <Comp4 />
                </div>
            </Provider>
        </div>
    );
};

const Comp1 = () => {
    const [globalState, globalActions] = useGlobal();
    return (
        <div>
            <span>数量: {globalState.count}, </span>
            <span>姓名: {globalState.name}, </span>
            <Button onClick={globalActions.count.increase}>添加</Button>
            <Button onClick={globalActions.user.getName}>获取姓名</Button>
        </div>
    );
};

const Comp2 = () => {
    const [globalState, globalActions] = useGlobal();
    return (
        <div>
            <span>数量: {globalState.count}, </span>
            <span>姓名: {globalState.name}, </span>
            <Button onClick={globalActions.count.decrease}>减少</Button>
            <Button onClick={globalActions.user.getName}>获取姓名</Button>
        </div>
    );
};

const Comp3 = () => {
    const {state, dispatch} = useGlobalState();

    const increase = () => {
        dispatch({ type: "INCREASE" });
    }

    return (
        <div>
            <span>数量: {state.count.count}</span>
            <Button onClick={increase}>添加</Button>
        </div>
    );
};

const Comp4 = () => {
    const {state, dispatch} = useGlobalState();
    const decrease = () => {
        dispatch({ type: "DECREASE" });
    }

    return (
        <div>
            <span>数量: {state.count.count}</span>
            <Button onClick={decrease}>减少</Button>
        </div>
    );
};

export default StateManager;
