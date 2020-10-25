function createTextDom(text) {
    return {
        type: "TEXT",
        props: {
            nodeValue: text,
            children: [],
        },
    };
}

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) => {
                return typeof child === "object" ? child : createTextDom(child);
            }),
        },
    };
}

// 任务调度
let nextUnitOfWork = null;
let workInProgressRoot = null;
let currentRoot = null;
let deletions = null;
function workLoop(deadline) {
    while (nextUnitOfWork && deadline.timeRemaining() > 1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if (!nextUnitOfWork && workInProgressRoot) {
        commitRoot();
    }

    requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

function commitRoot() {
    deletions.forEach(commitRootImpl);
    commitRootImpl(workInProgressRoot.child);
    currentRoot = workInProgressRoot;
    workInProgressRoot = null;
}

function commitRootImpl(fiber) {
    if (!fiber) {
        return;
    }
    let parentFiber = fiber.return;
    while (!parentFiber.dom) {
        parentFiber = parentFiber.return;
    }
    const parentDom = parentFiber.dom;

    if (fiber.effectTag === "REPLACEMENT" && fiber.dom) {
        parentDom.appendChild(fiber.dom);
    } else if (fiber.effectTag === "DELETION") {
        commitDeletion(fiber, parentDom);
    } else if (fiber.effectTag === "UPDATE" && fiber.dom) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    }

    commitRootImpl(fiber.child);
    commitRootImpl(fiber.sibling);
}

function createDom(vDom) {
    let dom;
    if (vDom.type === "TEXT") {
        dom = document.createTextNode(vDom.props.nodeValue);
    } else {
        dom = document.createElement(vDom.type);

        if (vDom.props) {
            Object.keys(vDom.props)
                .filter((key) => key !== "children")
                .forEach((item) => {
                    if (item.indexOf("on") === 0) {
                        dom.addEventListener(
                            item.substr(2).toLowerCase(),
                            vDom.props[item],
                            false
                        );
                    } else {
                        dom[item] = vDom.props[item];
                    }
                });
        }
    }

    return dom;
}

function updateDom(dom, prevProps, nextProps) {
    Object.keys(prevProps)
        .filter((name) => name !== "children")
        .filter((name) => !(name in nextProps))
        .forEach((name) => {
            if (name.indexOf("on") === 0) {
                dom.addEventListener(
                    name.substr(2).toLowerCase(),
                    nextProps[name],
                    false
                );
            } else {
                dom[name] = nextProps[name];
            }
        });

    Object.keys(nextProps)
        .filter((name) => name !== "children")
        .forEach((name) => {
            if (name.indexOf("on") === 0) {
                dom.addEventListener(
                    name.substr(2).toLowerCase(),
                    nextProps[name],
                    false
                );
            } else {
                dom[name] = nextProps[name];
            }
        });
}

function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom);
    } else {
        commitDeletion(fiber.child, domParent);
    }
}

function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function;
    if (isFunctionComponent) {
        updateFunctionComponent(fiber);
    } else {
        updateHostComponent(fiber);
    }

    if (fiber.child) {
        return fiber.child;
    }

    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }

        nextFiber = nextFiber.return;
    }
}

function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }

    const elements = fiber.props && fiber.props.children;
    reconcileChildren(fiber, elements);
}

function reconcileChildren(workInProgressFiber, elements) {
    let oldFiber =
        workInProgressFiber.alternate && workInProgressFiber.alternate.child;
    let prevSibling = null;
    let index = 0;
    if (elements && elements.length) {
        if (!oldFiber) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const newFiber = buildNewFiber(element, workInProgressFiber);

                if (i === 0) {
                    workInProgressFiber.child = newFiber;
                } else {
                    prevSibling.sibling = newFiber;
                }

                prevSibling = newFiber;
            }
        }

        while (index < elements.length && oldFiber) {
            let element = elements[index];
            let newFiber = null;

            const sameType =
                oldFiber && element && oldFiber.type === element.type;
            if (sameType) {
                newFiber = {
                    type: oldFiber.type,
                    props: element.props,
                    dom: oldFiber.dom,
                    return: workInProgressFiber,
                    alternate: oldFiber,
                    effectTag: "UPDATE",
                };
            } else if (!sameType && element) {
                newFiber = buildNewFiber(element, workInProgressFiber);
            } else if (!sameType && oldFiber) {
                oldFiber.effectTag = "DELETION";
                deletions.push(oldFiber);
            }

            oldFiber = oldFiber.sibling;
            if (index === 0) {
                workInProgressFiber.child = newFiber;
            } else {
                prevSibling.sibling = newFiber;
            }

            prevSibling = newFiber;
            index++;
        }
    }
}

function buildNewFiber(fiber, workInProgressFiber) {
    return {
        type: fiber.type,
        props: fiber.props,
        dom: null,
        return: workInProgressFiber,
        alternate: null,
        effectTag: "REPLACEMENT",
    };
}

function render(vDom, container) {
    workInProgressRoot = {
        dom: container,
        props: {
            children: [vDom],
        },
        alternate: currentRoot,
    };

    deletions = [];

    nextUnitOfWork = workInProgressRoot;
}

let wipFiber = null;
let hookIndex = null;
function useState(init) {
    const oldHook =
        wipFiber.alternate &&
        wipFiber.alternate.hooks &&
        wipFiber.alternate.hooks[hookIndex];
    const hook = {
        state: oldHook ? oldHook.state : init, // state是每个具体的值
    };
    wipFiber.hooks.push(hook);
    hookIndex++;

    const setState = (value) => {
        hook.state = value;

        workInProgressRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
        };

        nextUnitOfWork = workInProgressRoot;
        deletions = [];
    };

    return [hook.state, setState];
}

function updateFunctionComponent(fiber) {
    // 支持useState，初始化变量
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = []; // hooks用来存储具体的state序列

    // 函数组件的type就是个函数，直接拿来执行可以获得DOM元素
    const children = [fiber.type(fiber.props)];

    reconcileChildren(fiber, children);
}

class Component {
    constructor(props) {
        this.props = props;
    }
}

function transfer(Component) {
    return function (props) {
        const component = new Component(props);
        let [state, setState] = useState(component.state);
        component.props = props;
        component.state = state;
        component.setState = setState;

        return component.render();
    };
}

module.exports = {
    createElement,
    render,
    useState,
    Component,
    transfer
};
