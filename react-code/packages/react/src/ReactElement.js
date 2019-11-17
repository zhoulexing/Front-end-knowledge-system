import warningWithoutStack from '../../shared/warningWithoutStack';
import { REACT_ELEMENT_TYPE } from '../../shared/ReactSymbols';
import ReactCurrentOwner from './ReactCurrentOwner';

const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
};

const ReactElement = function(type, key, ref, self, source, owner, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,

        type: type,
        key: key,
        ref: ref,
        props: props,

        _owner: owner
    };

    if (__DEV__) {
        element._store = {};
        Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
        });
        Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
        });
        Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
        });
        if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
        }
    }

    return element;
};

export function createElement(type, config, children) {
    let propName;

    const props = {};

    let key = null;
    let ref = null;
    let self = null;
    let source = null;

    if (config !== null) {
        if (hasValidRef(config)) {
            ref = config.ref;
        }
        if (hasValidKey(config)) {
            key = "" + config.key;
        }
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    for (propName in config) {
        if (
            hasOwnProperty.call(config, propName) &&
            !RESERVED_PROPS.hasOwnProperty(propName)
        ) {
            props[propName] = config[propName];
        }
    }

    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        const childArray = Array(childrenLength);
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        if (__DEV__) {
            if (Object.freeze) {
                Object.freeze(childArray);
            }
        }
        props.children = childArray;
    }

    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }
    if (__DEV__) {
        if (key || ref) {
            const displayName =
                typeof type === "function"
                    ? type.displayName || type.name || "Unknown"
                    : type;
            if (key) {
                defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
                defineRefPropWarningGetter(props, displayName);
            }
        }
    }

    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props
    );
}

function defineKeyPropWarningGetter(props, displayName) {
    const warnAboutAccessingKey = function() {
        if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            warningWithoutStack(
                false,
                "%s: `key` is not a prop. Trying to access it will result " +
                    "in `undefined` being returned. If you need to access the same " +
                    "value within the child component, you should pass it as a different " +
                    "prop. (https://fb.me/react-special-props)",
                displayName
            );
        }
    };
    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
    });
}

function hasValidKey(config) {
    if (__DEV__) {
        if (hasOwnProperty.call(config, "key")) {
            const getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
                return false;
            }
        }
    }
    return config.key !== undefined;
}

function hasValidRef(config) {
    if (__DEV__) {
        if (hasOwnProperty.call(config, "ref")) {
            const getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
                return false;
            }
        }
    }
    return config.ref !== undefined;
}
