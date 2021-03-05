## react 初始化渲染流程

react 渲染主要是分为两个阶段，分别是调和阶段和 commit 阶段。在调和阶段，会指定每个 fiber 的 firstEffect、
lastEffect、nextEffect，在 commit 阶段，就是根据这些 Effect 进行处理。

-   react 渲染的核心逻辑在 ReactDOM 对象上，首先调用 ReactDOM 的 render 方法；
-   第一步会根据 dom 容器即挂载点创建一个 root 对象，root 对象通过\_internalroot 属性能获取 FiberRootNode;
-   FiberRootNode 通过 current 属性能获取 HostRootFiber,HostRootFiber 是顶级的 fiber；
-   每个 fiber 对象上都有三个主要的属性，分别是 stateNode、updateQueue、alternate，
    不同的 fiber，stateNode 指向也会不同，HostRootFiber 的 stateNode 指向 FiberRootNode，
    类 fiber 和函数 fiber 的 stateNode 指向 render 方法返回的 element，原声元素的 stateNode 是原声 dom；
    updateQueue 是用来处理 fiber 更新的，alternate 属性是 fiber 和 workInProgress 相互指向对方的。
-   初始化 fiber 节点后，会调用 scheduleUpdateOnFiber 方法，setState 和 hook 里 useState 的更新装状态方法
    都会调用此方法；
-   scheduleUpdateOnFiber 方法中首先会回去 HostRootFiber,然后调用 performSyncWorkOnRoot，
    performSyncWorkOnRoot 方法中会调用 renderRootSync 方法，当然这中间会进行优先级的计算；
-   renderRootSync 方法会调用 workLoopSync 方法，workLoopSync 方法中，会进入一个大循环，
    从根节点一直遍历调用 performUnitOfWork 方法；
-   performUnitOfWork 方法会调用 beginWork 方法，并获取下一个 Fiber，然后判定下个 Fiber 是否为 null，
    如果是 null 则进入 completeUnitOfWork 方法，不是 null 则继续进行调用 performUnitOfWork 方法。
-   beginWork 方法会根据 workInProgress 的 tag 调用的不同的 mount 方法，类组件会在此过程中调用 render 方法，
    以及 render 方法之前的所有生命周期函数。此外还会获取组件 children 中的元素，根据每个子元素生成对应的 fibre 对象，
    并指定 fiber 之间的关系，最后返回第一个子 fiber 对象。
-   completeUnitOfWork 方法只有在子 fiber 为 null 的时候执行，而子 fiber 为 null 要么就是原声元素、字符串或数字，
    所以这个方法的目的就是生成原声元素、字符串或数字，并将其复制给 stateNode。
-   调和过程结束之后，就看是调用 commitRoot 方法；
-   commitRoot 或 commitRootImpl 方法的核心主要是三个方法，分别是 commitBeforeMutationLifeCycles、
    commitMutationEffects、recursivelyCommitLayoutEffects;
-   commitBeforeMutationLifeCycles 方法会执行组件 getSnapShotBeforeUpdate，当前前提是组件处在更新阶段
    且是 class 组件；
-   commitMutationEffects 方法会将组件的 stateNode 进行拼接或插入到对应的 dom 上，编程最终页面上显示的 dom；
    而且类组件
-   recursivelyCommitLayoutEffects 方法会执行组件渲染完之后的生命周期函数，如果是初始化渲染，
    则会执行 componentDidMount 函数，如果是更新，则会执行 componentDidUpdate 方法。

## react 更新渲染流程

react 只有调用 setState 方法或者调用 hook 的方法来进行更新，而这最终都会调用 scheduleUpdateOnFiber 方法，
后续的流程与初始化流程差不多，只不过在过程中会根据不同的条件进行不同的逻辑处理。如果组件是正在更新中，
则会将 performSyncWorkOnRoot 方法添加到 queueCallack 数组中，待上一次渲染完，在执行 queueCallback 数组
中的函数进行更新。

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

react 渲染流程：

1. reactDOM 在调用 render 方法的时候，首先会调用 legacyRenderSubtreeIntoContainer 方法，
   此方法首先会移除挂载点下的所有子 DOM，然后创建 FiberRootNode 和 HostRootFiber 节点，
   FiberRootNode 的 current 指向 HostRootFiber，HostRootFiber 的 stateNode 指向 FiberRootNode。

2. 然后调用 Reconciler 模块里 updateContainer 方法，此方法会获取当前时间，然后根据 Fiber 获取过期时间，
   最后调用 updateContainerAtExpirationTime 方法。

3. updateContainerAtExpirationTime 方法中会先获取上下文 context,然后赋值给 FiberRootNode 的 context 属性，
   或者 pendingContext 属性，最后调用 scheduleRootUpdate 方法。

4. scheduleRootUpdate 会创建一个 update 对象，然后将 element 组件赋值给 update 对象的 payload 属性；
   紧接着调用 flushPassiveEffects 方法、

问题：

flushPassiveEffects 方法干嘛的？
