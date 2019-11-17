import { ELEMENT_NODE, DOCUMENT_NODE } from "../shared/HTMLNodeType";
import { ROOT_ATTRIBUTE_NAME } from "../shared/DOMProperty";
import { LegacyRoot } from "../../../shared/ReactRootTags";
import {
    createContainer,
    updateContainer,
    unbatchedUpdates
} from "../../../react-reconciler/inline.dom";
import warningWithoutStack from "../../../shared/warningWithoutStack";

const ReactDOM = {
    render(element, container, callback) {
        return legacyRenderSubtreeIntoContainer(
            null,
            element,
            container,
            false,
            callback
        );
    }
};

function legacyRenderSubtreeIntoContainer(
    parentComponent,
    children,
    container,
    forceHydrate,
    callback
) {
    let root = container._reactRootContainer;
    let fiberRoot;
    if (!root) {
        // 创建一个ReactRoot实例
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
            container,
            forceHydrate
        );
        fiberRoot = root._internalRoot;
        unbatchedUpdates(() => {
            updateContainer(children, fiberRoot, parentComponent, callback);
        });
    } else {
        fiberRoot = root._internalRoot;
        updateContainer(children, fiberRoot, parentComponent, callback);
    }
    return getPublicRootInstance(fiberRoot);
}

function legacyCreateRootFromDOMContainer(container, forceHydrate) {
    // 初始化渲染为false
    const shouldHydrate =
        forceHydrate || shouldHydrateDueToLegacyHeuristic(container);

    if (!shouldHydrate) {
        let warned = false;
        let rootSibling;
        // 移除所有的子节点
        while ((rootSibling = container.lastChild)) {
            if (__DEV__) {
                if (
                    !warned &&
                    rootSibling.nodeType === ELEMENT_NODE &&
                    rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)
                ) {
                    warned = true;
                    warningWithoutStack(
                        false,
                        "render(): Target node has markup rendered by React, but there " +
                            "are unrelated nodes as well. This is most commonly caused by " +
                            "white-space inserted around server-rendered markup."
                    );
                }
            }
            container.removeChild(rootSibling);
        }
    }
    return new ReactSyncRoot(container, LegacyRoot, shouldHydrate);
}

/**
 *
 * @param {*} container dom
 * @param {*} tag 0
 * @param {*} hydrate false
 */
function ReactSyncRoot(container, tag, hydrate) {
    const root = createContainer(container, tag, hydrate);
    this._internalRoot = root;
}

function shouldHydrateDueToLegacyHeuristic(container) {
    const rootElement = getReactRootElementInContainer(container);
    return !!(
        rootElement &&
        rootElement.nodeType === ELEMENT_NODE &&
        rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME)
    );
}

function getReactRootElementInContainer(container) {
    if (!container) {
        return null;
    }
    if (container.nodeType === DOCUMENT_NODE) {
        return container.documentElement;
    } else {
        return container.firstChild;
    }
}

export default ReactDOM;
