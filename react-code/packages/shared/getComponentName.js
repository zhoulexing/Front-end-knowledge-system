function getComponentName(type) {
    if (type == null) {
        // Host root, text node or just invalid type.
        return null;
    }
    if (__DEV__) {
        if (typeof type.tag === "number") {
            warningWithoutStack(
                false,
                "Received an unexpected object in getComponentName(). " +
                    "This is likely a bug in React. Please file an issue."
            );
        }
    }
    if (typeof type === "function") {
        return type.displayName || type.name || null;
    }
    if (typeof type === "string") {
        return type;
    }
    switch (type) {
        case REACT_FRAGMENT_TYPE:
            return "Fragment";
        case REACT_PORTAL_TYPE:
            return "Portal";
        case REACT_PROFILER_TYPE:
            return `Profiler`;
        case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
        case REACT_SUSPENSE_TYPE:
            return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
    }
    if (typeof type === "object") {
        switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
                return "Context.Consumer";
            case REACT_PROVIDER_TYPE:
                return "Context.Provider";
            case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
                return getComponentName(type.type);
            case REACT_LAZY_TYPE: {
                const thenable = type;
                const resolvedThenable = refineResolvedLazyComponent(thenable);
                if (resolvedThenable) {
                    return getComponentName(resolvedThenable);
                }
                break;
            }
            case REACT_EVENT_COMPONENT_TYPE: {
                if (enableFlareAPI) {
                    return type.responder.displayName;
                }
                break;
            }
        }
    }
    return null;
}
