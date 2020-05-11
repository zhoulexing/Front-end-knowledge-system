import React, { Component } from "react";

export default class Market extends Component {
    render() {
        return (
            <div>market</div>
        )
    }

    createStore(reducer) {
        let createStore = (reducer) => {
            let state = reducer();
            let listheners = [];
            let getState = () => {
                 return state;
            };
            let subscribe =  (cb)=>{
                listhenners.push(cb);
                return ()=>{
                    listhenners = listhenners.filter(item=>{
                       return  item !== cb
                    });
                }
            };
            let dispatch = (action)=>{
                state = reducer(state, action);
                listhenners.forEeach(listhener=>{ listhener() });
            };
           return {
                getState,
                subscribe,
                dispatch
            }
        }
        export default createStore;
    }

    init() {
        import createStore from 'redux';
        //   此处还用引入reducer 
        let store = createStore(reducer);
        //    导出的store, 在需要的地方引入即可 
        export  default store;
    }

    combineReducer() {
        const rootReducer = combineReducers({
            counter,
            todo,
            ...other
        });
        let combineReducer = (rootReducer) => {
            return (state={}, action={ type: Symbol() })=>{
                let newState = {}; 
                for (let key in reducersObj){
                newState[key]  =  reducersObj[key](state[key], action)
                }
                return newState;
            }
        }

        // import counter from './counter';
        // import todo from './todo';
        // import { combineReducers } from "./../redux";
       
        // const rootReducer = combineReducers({
        //     counter,
        //     todo,
        //     ...
        // });
        // export default rootReducer;


    //     import { createStore } from "redux";
    //     import rootReducers from "./reducers/index";
    //     export default const store = createStore(rootReducers)
    }

    connect() {
        import React, { Component } from 'react'
        import store from "store";
        import { createAction } from "action/actionCreateor"
        //        定义组件
        export default class xxxComponent  extends Component {
            constructor(props){
                super(props);
                this.state = {
                            //        建立从store到state的映射
                    xxx: store.getState().xxx.xxxx
                }
            }
                //       组件挂载之前， 订阅redux
            componentWillMount(){
                        this.unsubscribe = store.subscribe(()=>{
                            this.setState({
                                    number: store.getState().counter.number
                            });
                        })
            }
                //        组件卸载时，取消订阅
            componentWillUnmount(){
                        this.unsubscribe();
            }
                
            render() {
                    return (
                        `渲染页面`
                        
                    )
            }
        }
    }

    connect2() {
        import store from 'store'
        const connect = (mapStateToProps, mapDispatchToProps)=>(WrappedComponent)=>{
            let dispatchProps;
            if(typeof mapStateToProps  === "function" ){
                    dispatchProps = mapDispatchToProps(store.dispatch)
            } else if(typeof mapStateToProps  === "object"){
                dispatchProps =( (s)=>{
                    let obj = {};
                    for(let key in s){
                        obj[key] = (params) =>{
                            store.dispatch(s[key](params));
                        }
                    }
                    return obj;
                })(mapDispatchToProps);
            } else {
                dispatchProps = {};
            }
            class Proxy  extends Component{
                constructor(){
                    super();
                    this.state ={
                        ...store.getState()
                    };  
                }
                componentWillMount(){
                this.unsubscribe =  store.subscribe(()=>{
                    this.setState({
                            ...store.getState()
                        });
                    });
                }
                componentWillUnmount(){
                    this.unsubscribe();
                }
                render(){
                    return (
                        <WrappedComponent  
                            {...mapStateToProps(this.state)}
                            {...dispatchProps}
                        />
                    )
                }
            }
            return Proxy;
        }
    }
}
