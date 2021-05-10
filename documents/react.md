## react 初始渲染流程：

1. reactDOM 在调用 render 方法的时候，首先会调用 legacyRenderSubtreeIntoContainer 方法，
   此方法首先会移除挂载点下的所有子 DOM，然后创建 FiberRootNode 和 HostRootFiber 节点。
   (
   Fiber 中有几个属性指向的问题，
   首先看 stateNode，如果是根节点的 Fiber，即 HostRootFiber，则它的 stateNode 指向 FiberRootNode,
   FiberRootNode 的 current 指向 HostRootFiber。
   再看 alternate，Fiber 与 workInProgress 的 Fiber 互相引用。
   )

2. 然后调用 Reconciler（调和） 模块里 ReactFiberReconciler 文件里的 updateContainer 方法，此方法会获取当前时间，
   和过期时间，最后调用 updateContainerAtExpirationTime 方法。

3. updateContainerAtExpirationTime 方法中会先获取上下文 context,然后赋值给 FiberRootNode 的 context 属性，
   或者 pendingContext 属性，最后调用 scheduleRootUpdate 方法。

4. scheduleRootUpdate 会创建一个 update 对象，然后将 element 组件赋值给 update 对象的 payload 属性；
   紧接着调用 flushPassiveEffects 方法、然后调用 enqueueUpdate 方法，将 update 添加到 updateQueue 链上，
   最后调用 scheduleWork 方法。

5. scheduleWork 方法首先根据传进来的 fiber 获取最顶级的 root 节点，也就是 FiberRootNode，然后根据条件
   调用 resetStack 方法，然后调用 markPendingPriorityLevel 方法，然后在非 working 或 commiting 或
   nextRoot !== root 的情况下，调用 requestWork 方法。

6. requestWork 方法会调用 addRootToSchedule 方法指定 firstScheduleRoot 和 lastScheduleRoot, 这在后面生命周期
   如 componentDidMount 方法中调用 setState 会在下面的方法 performWork 中递归用到，
   如果是批量更新并且不在批量更新中，则会调用 performWorkOnRoot 方法，如果 expirationTime 为 Sync，
   则调用 performSyncWork 方法，否则调用 scheduleCallbackWithExpirationTime 方法, 初次渲染时会调用
   performSyncWork 方法，performSyncWork 会调用 performWork 方法。

7. performWork 首先会查找并设置高优先级的节点，如果没有的话就是当前传入的根节点，
   performWork 递归调用 performWorkOnRoot 和 findHighestPriorityRoot 方法。

8. performWorkOnRoot 方法会进行逻辑判断然后调用 renderRoot 方法, renderRoot 方法会调用 workLoop 方法。

9. workLoop 方法会递归调用 performUnitOfWork 方法，performUnitOfWork 方法中调用 beginWork 方法，
   beginWork 方法会根据节点类型进行处理，并返回下一个要处理的 Fiber 节点，也就是第一个子节点。当处理最后一个
   子节点时，返回值为 null，此时会调用 completeUnitOfWork 方法。

10. 在 completeUnitOfWork 方法中会调用 completeWork 方法，completeWork 方法会根据类型标记 Fiber 的 effectTag 属性，
    另外会返回兄弟节点或者父级的兄弟节点，进行另一条边的处理。

11. 处理完之后，会在 performWorkOnRoot 中调用 completeRoot 方法，进入 commit 阶段，在 completeRoot 方法中
    会调用 commitRoot 方法，在此方法中会处理 effect 链，然后调用 commitBeforeMutationLifecycles、
    commitAllHostEffects、commitAllLifeCycles 方法完成更新以及 componentDidMount 等生命周期方法。

## react 更新渲染流程：

1. 调用 Reconciler 模块里的 ReactFiberClassComponent 文件里的 enqueueSetState 方法;
2. enqueueSetState 方法会获取当前时间，然后获取过期时间，最后创建 update 对象，并添加到 updateQueue 链中,
   调用 flushPassiveEffects 和 scheduleWork 方法。
3. 后面的其实与初始渲染流程中的第 5 步之后是一样的，只不过过程中的一些逻辑不一样。

## 渲染过程中的问题：

flushPassiveEffects 方法干嘛的？
调用 resetStack 的条件是啥？resetStack 方法又是干啥的？
markPendingPriorityLevel 方法干嘛的？

setState 内部是如何操作的？同时执行多个 setState 是如何合并 state 的？
props 改变之后，组件是如何进行更新的？
hooks 是如何工作的？

## useState 机制：

1. 获取 disaptcher 对象；
2. 执行 disaptcher.useState(initialState);
3. 执行 mountWorkInProgressHook(), 如果没有 workInProgressHook 对象，就创建一个，并将其赋值给 fiber 对象的 memoizedState；如果有，则将对象的 next 指向新的 hook；
4. 将初始的 state 赋值给 hook 对象的 memoizedState 和 baseState；
5. 返回 state 和 dispatch；

## useEffect 机制：

1. 获取 disaptcher 对象；
2. 执行 disaptcher.useState(create, inputs);
3. 同上第三步，不过这时候 workInProgressHook 对象已经有了；
4. 执行 pushEffect 方法，创建一个 effect，将其赋值给 fiber 的 updateQueue，并且

## useLayoutEffect 机制：

## react 状态管理库

-   redux
    redux、react-redux、redux-thunk、redux-saga（dva）、redux-promise、redux-observable
-   mobx
    mobx、mobx-react-lite、
-   recoil
    recoil
-   xstate
    xstate、@xstate/react
-   hooks
    use-global-hook、mozz、stated-bean、unstated-next、react-duce、
-   context
    useContext、createContext、
