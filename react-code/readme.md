### 三大模块

基础模块：React
渲染模块：ReactDOM | ReactNative | ReactDOM/server
调和模块：Reconciliation

#### React 基础模块

-   React.createElement()
-   React.Component()
-   React.PureComponent()

#### ReactDOM 渲染模块

-   ReactDOM.render()
-   ReactDOM.hydrate()
-   ReactDOM.findDOMNode()

#### Reconcilition 调和模块

-   Fiber 数据结构
-   reconciliation 阶段
    调和阶段分为三个部分，具体内容如下：
    ReactDOM.render ---> legacyRenderSubtreeIntoContainer ---> 创建 ReactSyncRoot 实例 ---> updateContainer --->
    设置优先级, updateContainerAtExpirationTime ---> scheduleRootUpdate ---> 新建 update、enqueueUpdate ---> (第一部分)
    shecduleWork ---> requestwork（区分同步和异步）---> performWork ---> (第二部分：安排工作、申请工作、正式工作)
    renderRoot ---> 创建 workInProgress（Fiber 对象），进入 workLoop 大循环 --->
    performUnitOfWork ---> next = beginWork (根据 next 是否为 null 来判定是否进入循环) --->
    completeWork ---> completeRoot ---> commitRoot (产出 Effect List，进入 Commit 阶段)
    -   第一部分
        从 ReactDOM.render() 方法开始，把接收的 React Element 转换为 Fiber 节点，并为其设置优先级，记录 update 等。这部分主要是一些数据方面的准备工作。比较简单，可以看源码。
    -   第二部分：任务协调
        主要是三个函数：scheduleWork、requestWork、performWork，即安排工作、申请工作、正式工作三部曲。React 16 新增的异步调用的功能则在这部分实现。
        异步任务调度有两种方式，主要通过任务优先级进行判断，主要有以下两种：
        1、animation（动画）：则会调用 requestAnimationFrame API 告诉浏览器，在下一次重绘之前调用该任务来更新动画。
        2、其他异步任务：则会调用 requestIdleCallback API 告诉浏览器，在浏览器空闲时期依次调用任务，这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互等关键的事件产生影响。
    -   第三部分：beginWork
        是一个大循环，遍历所有的 Fiber 节点，通过 Diff 算法计算所有更新工作，产出 EffectList 给到 commit 阶段使用。这部分的核心是 beginWork 函数。
        1、React Fiber 双缓冲
        2、生命周期函数调用
        3、diff 算法
-   commmit 阶段
    将 Host 节点假如 Effect List 中 ---> prepareForCommit ---> commitBeforeMultationLifecycles ---> commitAllHostEffects ---> commitAllLifeCycles
    commit 阶段做的事情是拿到 reconciliation 阶段产出的 EffectList，即所有更新工作，提交这些更新工作并调用渲染模块（react-dom）渲染 UI。
    1、effectTag
    2、commitBeforeMutationLifecycles
    3、commitAllHostEffects
    4、commitAllLifeCycles


ReactDOM.render()的流程
```
const ReactDOM = {
    render(element, container, callback) {
        // ...
        return legacyRenderSubtreeIntoContainer(
            null,
            element,
            container,
            false,
            callback,
        );
    }
}
```

```
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
    // 获取ReactSyncRoot实例
    let root = container._reactRootContainer;
    let fiberRoot;
    if(!root) {
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
        fiberRoot = root._internalRoot;
        unbatchedUpdates(() => {
            updateContainer(children, fiberRoot, parentComponent, callback);
        });
    } else {
        fiberRoot = root._internalRoot;
        // ...
        updateContainer(children, fiberRoot, parentComponent, callback);
    }
}
```

```
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
    // 移除container下所有的子节点
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
        // ...
        container.removeChild(rootSibling);
    }
    // LegacyRoot的值为0, shouldHydrate的值为false
    return new ReactSyncRoot(container, LegacyRoot, shouldHydrate);
}
```

```
function ReactSyncRoot(container, tag, hydrate) {
    const root = createContainer(container, tag, hydrate);
    this._internalRoot = root;
}
```

```
function createContainer(containerInfo, tag, hydrate) {
    return createFiberRoot(containerInfo, tag, hydrate);
}
```

```
function createFiberRoot(containerInfo, tag, hydrate) {
    const root = new FiberRootNode(containerInfo, tag, hydrate);
    const uninitializedFiber = createHostRootFiber(tag);
    root.current = uninitializedFiber;
    uninitializedFiber.stateNode = root;
    return root;
}
function FiberRootNode(containerInfo, tag, hydrate) {
    this.tag = tag;
    this.current = null;
    this.containerInfo = containerInfo;
    this.pendingChildren = null;
    this.pingCache = null;
    this.finishedExpirationTime = NoWork;
    this.finishedWork = null;
    this.timeoutHandle = noTimeout;
    this.context = null;
    this.pendingContext = null;
    this.hydrate = hydrate;
    this.firstBatch = null;
    this.callbackNode = null;
    this.callbackExpirationTime = NoWork;
    this.firstPendingTime = NoWork;
    this.lastPendingTime = NoWork;
    this.pingTime = NoWork;

    if (enableSchedulerTracing) {
        this.interactionThreadID = unstable_getThreadID();
        this.memoizedInteractions = new Set();
        this.pendingInteractionMap = new Map();
    }
}
function createHostRootFiber(tag) {
    // ...
    return new FiberNode(tag, pendingProps, key, mode);
}
function FiberNode(tag, pendingProps, key, mode) {
    // Instance
    this.tag = tag;
    this.key = key;
    this.elementType = null;
    this.type = null;
    this.stateNode = null;

    // Fiber
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.ref = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;
    this.memoizedState = null;
    this.dependencies = null;

    this.mode = mode;

    // Effects
    this.effectTag = NoEffect;
    this.nextEffect = null;
    this.firstEffect = null;
    this.lastEffect = null;
    this.expirationTime = NoWork;
    this.childExpirationTime = NoWork;

    this.alternate = null;

    if (enableProfilerTimer) {
        this.actualDuration = Number.NaN;
        this.actualStartTime = Number.NaN;
        this.selfBaseDuration = Number.NaN;
        this.treeBaseDuration = Number.NaN;

        this.actualDuration = 0;
        this.actualStartTime = -1;
        this.selfBaseDuration = 0;
        this.treeBaseDuration = 0;
    }

    if (__DEV__) {
        this._debugID = debugCounter++;
        this._debugSource = null;
        this._debugOwner = null;
        this._debugIsCurrentlyTiming = false;
        this._debugNeedsRemount = false;
        this._debugHookTypes = null;
        if (
            !hasBadMapPolyfill &&
            typeof Object.preventExtensions === "function"
        ) {
            Object.preventExtensions(this);
        }
    }
}
```
