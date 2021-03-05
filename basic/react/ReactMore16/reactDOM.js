/**
 * react更新方式
 * 
 * render/hydrate
 * setState/useState
 * forceUpdate
 */

import { element } from "prop-types";


/**
 * ReactDOM.render()
 * 
 * legacyRenderSubtreeIntoContainer -> ReactRoot
 * 1. 清楚所有子元素
 * 2. 创建new ReactRoot节点
 */
const container = document.getElementById("root");
const root = container._reactRootContainer = {
    _internalRoot: FiberRootNode = {
        current: FiberNode = {
            alternate: FiberNode,
            stateNode: FiberRootNode,
            memoizedProps: null,
            memoizedState: null,
            pendingProps: null,
            key: null,
            tag: 3,
            sibling: null,
            return: null,
            child: null,
            nextEffect: null,
            lastEffect: null,
            firstEffect: null,
            updateQueue: {
                baseState: null,
                effects: null,
                firstBaseUpdate: null,
                lastBaseUpdate: null,
                shared: {
                    pending: Update = {
                        eventTime: eventTime,
                        lane: lane,
                        tag: UpdateState,
                        payload: {
                            element: element
                        },
                        callback: null,
                        next: Update
                    }
                }
            }
        },
        containerInfo: container,
        hydrate: false,
        tag: 0,
        context: null
    },
}

/**
 * 1. enqueueUpdate 是干嘛的？
 * 
 * 2. updateQueue.shared.pending 是干嘛的？
 * pending为null的情况下：
 * update.next = update, updateQueue.shared.pending = update,
 * 
 * pending不为null的情况下：
 * update.next = updateQueue.shared.pending;
 * updateQueue.shared.pending.next = update;
 * 
 * 3. v16 版本的expirationTime 与 v17 版本的lanes的区别？
 * 
 */