import ReactDOMTextComponent from "./ReactDOMTextComponent";
import ReactDOMComponent from "./ReactDOMComponent";
import ReactCompositeComponent from "./ReactCompositeComponent";
import ReactElement from "./ReactElement";

// 定义ReactClass类,所有自定义的超级父类
export const ReactClass = function(){
}
// 留给子类去继承覆盖
ReactClass.prototype.render = function(){};

ReactClass.prototype.setState = function(newState) {
    //还记得我们在ReactCompositeComponent里面mount的时候 做了赋值
    //所以这里可以拿到 对应的ReactCompositeComponent的实例_reactInternalInstance
    this._reactInternalInstance.receiveComponent(null, newState);
}

const React = {
    nextReactRootIndex: 0,
    render: function(element, container) {
        // 根据element返回一个component
        const componentInstance = instantiateReactComponent(element);
        // 渲染生成dom结构
        const markup = componentInstance.mountComponent(React.nextReactRootIndex++);
        // 插入到容器
        $(container).html(markup);
        // 触发完成mount的事件
        $(document).trigger("mountReady");
    },
    createElement: (type, config, children) => {
        const props = {};
        const propName;
        config = config || {};
        const key = config.key || null;
        for(propName in config) {
            if(config.hasOwnProperty(propName) && propName !== "key") {
                props[propName] = config[propName];
            }
        }

        const childrenLength = arguments.length - 2;
        if(childrenLength === 1) {
            props.children = Array.isArray(children) ? children : [children];
        } else if(childrenLength > 1) {
            const childArray = Array(childrenLength);
            for (let i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
        }

        return new ReactElement(type, key, props);
    },
    createClass: (spec) => {
        const Constructor = props => {
            this.props = props;
            this.state = this.getInitialState ? this.getInitialState() : null;
        }
        Constructor.prototype = new ReactClass();
        Constructor.prototype.constructor = Constructor;
        $.extend(Constructor.prototype, spec);
        return Constructor;
    },
};

export function instantiateReactComponent(node) {
    // 如果传进来的node是一个字符串或者一个数值
    if(typeof node === "string" || typeof node === "number") {
        return new ReactDOMTextComponent(node);
    }

    //浏览器基本element,注意基本类型element的type一定是字符串，可以和自定义element时对比
    if(typeof node === "object" && typeof node.type === "string"){
        //注意这里，使用了一种新的component
        return new ReactDOMComponent(node);
    }

    // 自定义的元素节点，类型为构造函数
    if(typeof node === 'object' && typeof node.type === 'function'){
        // 注意这里，使用新的component,专门针对自定义元素
        return new ReactCompositeComponent(node);
    }
}

//用来判定两个element需不需要更新
//这里的key是我们createElement的时候可以选择性的传入的。用来标识这个element，当发现key不同时，我们就可以直接重新渲染，不需要去更新了。
export const _shouldUpdateReactComponent = (prevElement, nextElement) => {
    if (prevElement != null && nextElement != null) {
    var prevType = typeof prevElement;
    var nextType = typeof nextElement;
    if (prevType === 'string' || prevType === 'number') {
      return nextType === 'string' || nextType === 'number';
    } else {
      return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    }
  }
  return false;
}

export default React;