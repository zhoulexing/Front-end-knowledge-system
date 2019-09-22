### 相关实例
实例便于我们理解其中的属性，更加直观
```
const Renderer = {
    updateQueue: [],
    nextUnitOfWork: null,
    pendingCommit: null,
}
const tag = {
    HOST_COMPONENT: 'host',
    CLASS_COMPONENT: 'class',
    HOST_ROOT: 'root',
    HostText: 'test',
    FunctionalComponent: 'function_component'
}
```

### 渲染逻辑
* React首次渲染的时候会调用render方法, 更新的时候会调用scheduleWork方法。render和scheduleWork方法会根据
  传进来的Vnode和Container创建Fiber节点，添加到跟新队列Renderer.updateQueue中, 并调用requestIdleCallback
  方法
```
function render(Vnode, Container, callback) {
    Renderer.updateQueue.push({
        fromTag: tag.HOST_ROOT,
        stateNode: Container ---> document.getElementById('root'),
        props: { children: Vnode },
        partialState: null,
    });
    requestIdleCallback(performWork);
}
function scheduleWork(instance, partialState) {
    Renderer.updateQueue.push({
        fromTag: tag.CLASS_COMPONENT,
        // 真实dom或者组件实例
        stateNode: instance,
        partialState: partialState
    })
    requestIdleCallback(performWork)
}
```
* requestIdleCallback方法会传入performWork函数, performWork函数中会调用workLoop函数，然后判断当前帧剩余时间是
  否继续渲染，workLoop函数主要是调用createWorkInProgress函数，并返回Fiber的根节点，然后调用performUnitOfWork
  函数和commitAllwork函数
```
function performWork(deadline) {
    workLoop(deadline);        
    if(Renderer.nextUnitOfWork || Renderer.updateQueue.length > 0) {
        requestIdleCallback(performWork);
    }
}
function workLoop(deadline) {
    if(!Renderer.nextUtilOfWork) {
        Renderer.nextUtilOfWork = createWorkInProgress(Renderer.updateQueue);
    }
     while (Renderer.nextUnitOfWork && deadline.timeRemaining() > EXPIRATION_TIME) {
        Renderer.nextUnitOfWork = performUnitOfWork(Renderer.nextUnitOfWork)
    }
    if (Renderer.pendingCommit) {
        //当全局 Renderer.pendingCommit 变量被负值
        commitAllwork(Renderer.pendingCommit)
    }
}
function createWorkInProgress(updateQueue) {
    const updateTask = updateQueue.shift();
    if(!updateTask) return;
    if(updateTask.partialState) {
        updateTask.stateNode._internalfiber.partialState = updateTask.partialState
    }
    // 第一次调用rootFiber是空的
    const rootFiber = updateTask.formTag === 'root' 
        ? updateTask.stateNode._rootContainerFiber
        : getRoot(updateTask.stateNode._internalfiber)
    return {
        tag: 'root',
        stateNode: updateTask.stateNode,
        props: updateTask.props || rootFiber.props,
        alternate: rootFiber // 现有的Fiber和currentInProgress相互指引
    }
}
```
* performUnitOfWork函数主要就是以左遍历树的过程，创建Fiber节点或者找到需要跟新的节点，并push到Fiber的effects数组里，
  然后将所有的effects合并到Fiber的根节点的effects属性。最终根据effects完成创建和更新。
```
function performUnitOfWork(workInProgress) {
    // 整个过程就是一个左遍历树的过程，获取孩子直接返回给nextUnitOfWork
    const nextChild = beginWork(workInProgress)
    if (nextChild) return nextChild
    // 没有 nextChild, 我们看看这个节点有没有 sibling
    let current = workInProgress
    while (current) {
        //收集当前节点的effect，然后向上传递
        completeWork(current)
        if (current.sibling) return current.sibling
        if (!current.return) {
            // 到达最顶端了
            Renderer.pendingCommit = current
        }
        //没有 sibling，回到这个节点的父亲，看看有没有sibling
        current = current.return
    }
}
function completeWork(currentFiber) {
    if (currentFiber.tag === tag.CLASS_COMPONENT) {
        // 用于
        currentFiber.stateNode._internalfiber = currentFiber
    }
    if (currentFiber.return) {
        const currentEffect = currentFiber.effects || [] //收集当前节点的 effect list
        const currentEffectTag = currentFiber.effectTag ? [currentFiber] : []
        const parentEffects = currentFiber.return.effects || []
        currentFiber.return.effects = parentEffects.concat(currentEffect, currentEffectTag)
    }
}
function beginWork(currentFiber) {
    switch (currentFiber.tag) {
        case tag.CLASS_COMPONENT: {
            return updateClassComponent(currentFiber)
        }
        case tag.FunctionalComponent: {
            return updateFunctionalComponent(currentFiber)
        }
        default: {
            return updateHostComponent(currentFiber)
        }
    }
}
```
* 其中diff的过程主要是根据tag的不同调用不同的函数
```
function arrayfiy(val) {
    return val === null ? [] : Array.isArray(val) ? val : [val]
}
function reconcileChildrenArray(currentFiber, newChildren) {
    // 对比节点，相同的标记更新
    // 不同的标记 替换
    // 多余的标记删除，并且记录下来
    const arrayfiyChildren = arrayfiy(newChildren)

    let index = 0
    let oldFiber = currentFiber.alternate ? currentFiber.alternate.child : null
    let newFiber = null

    while (index < arrayfiyChildren.length || oldFiber !== null) {
        const prevFiber = newFiber
        const newChild = arrayfiyChildren[index]
        const isSameFiber = oldFiber && newChild && newChild.type === oldFiber.type

        if (isSameFiber) {
            newFiber = {
                type: oldFiber.type,
                tag: oldFiber.tag,
                stateNode: oldFiber.stateNode,
                props: newChild.props,
                return: currentFiber,
                alternate: oldFiber,
                partialState: oldFiber.partialState,
                effectTag: Effect.UPDATE
            }
        }

        if (!isSameFiber && newChild) {
            newFiber = placeChild(currentFiber, newChild)
        }

        if (!isSameFiber && oldFiber) {
            // 这个情况的意思是新的节点比旧的节点少
            // 这时候，我们要将变更的 effect 放在本节点的 list 里
            oldFiber.effectTag = Effect.DELETION
            currentFiber.effects = currentFiber.effects || []
            currentFiber.effects.push(oldFiber)
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling || null
        }

        if (index === 0) {
            currentFiber.child = newFiber
        } else if (prevFiber && newChild) {
            // 这里不懂是干嘛的
            prevFiber.sibling = newFiber
        }

        index++
    }
    return currentFiber.child
}
function updateHostComponent(currentFiber) {
    // 当一个 fiber 对应的 stateNode 是原生节点，那么他的 children 就放在 props 里
    if (!currentFiber.stateNode) {
        if (currentFiber.type === null) {
            //代表这是文字节点
            currentFiber.stateNode = document.createTextNode(currentFiber.props)
        } else {
            //代表这是真实原生 DOM 节点
            currentFiber.stateNode = document.createElement(currentFiber.type)
        }
    }
    const newChildren = currentFiber.props.children
    return reconcileChildrenArray(currentFiber, newChildren)
}
function updateFunctionalComponent(currentFiber) {
    let type = currentFiber.type
    let props = currentFiber.props
    const newChildren = currentFiber.type(props)

    return reconcileChildrenArray(currentFiber, newChildren)
}
function updateClassComponent(currentFiber) {
    let instance = currentFiber.stateNode
    if (!instance) {
        // 如果是 mount 阶段，构建一个 instance
        instance = currentFiber.stateNode = createInstance(currentFiber)
    } else if (currentFiber.props === instance.props && !currentFiber.partialState) {
        // 如果是 update 阶段,对比发现 props 和 state 没变
        return cloneChildFiber(currentFiber)
    }

    // 将新的state,props刷给当前的instance
    instance.props = currentFiber.props
    instance.state = { ...instance.state, ...currentFiber.partialState }

    // 清空 partialState
    currentFiber.partialState = null
    const newChildren = currentFiber.stateNode.render()

    // currentFiber 代表老的，newChildren代表新的
    // 这个函数会返回孩子队列的第一个
    return reconcileChildrenArray(currentFiber, newChildren)
}
function cloneChildFiber(parentFiber) {
    const oldFiber = parentFiber.alternate
    if (!oldFiber.child) {
        return
    }
    let oldChild = oldFiber.child
    let prevChild = null
    let index = 0
    let next = void 666
    while (oldChild) {
        const newChild = {
            type: oldChild.type,
            tag: oldChild.tag,
            stateNode: oldChild.stateNode,
            props: oldChild.props,
            partialState: oldChild.partialState,
            alternate: oldChild,
            return: parentFiber
        }
        if (prevChild) {
            prevChild.sibling = newChild
        } else {
            parentFiber.child = newChild
        }
        prevChild = newChild
        oldChild = oldChild.sibling

        if (index === 0) {
            next = newChild
        }
        index++
    }
    return next
}
function placeChild(currentFiber, newChild) {
    const type = newChild.type
    if (typeof newChild === 'string' || typeof newChild === 'number') {
        // 如果这个节点没有 type ,这个节点就可能是 number 或者 string
        return createFiber(tag.HostText, null, newChild, currentFiber, Effect.PLACEMENT)
    }
    if (typeof type === 'string') {
        // 原生节点
        return createFiber(tag.HOST_COMPONENT, newChild.type, newChild.props, currentFiber, Effect.PLACEMENT)
    }
    if (typeof type === 'function') {
        // 可能有两种
        const _tag = type.prototype.isReactComponent ? tag.CLASS_COMPONENT : tag.FunctionalComponent
        return {
            type: newChild.type,
            tag: _tag,
            props: newChild.props,
            return: currentFiber,
            effectTag: Effect.PLACEMENT
        }
    }
}
```