import { tag } from './core/tags'

export function createWorkInProgress(updateQueue) {
    const updateTask = updateQueue.shift()
    if (!updateTask) return

    if (updateTask.partialState) {
        // 证明这是一个setState操作
        updateTask.stateNode._internalfiber.partialState = updateTask.partialState
    }

    // 第一次调用rootFiber是空的
    const rootFiber = updateTask.fromTag === tag.HOST_ROOT
        ? updateTask.stateNode._rootContainerFiber
        : getRoot(updateTask.stateNode._internalfiber)

    return {
        tag: tag.HOST_ROOT,
        stateNode: updateTask.stateNode,
        props: updateTask.props || rootFiber.props,
        alternate: rootFiber // 用于保存现有的tree
    }
}

function getRoot(fiber) {
    let _fiber = fiber
    while (_fiber.return) {
        _fiber = _fiber.return
    }
    return _fiber
}