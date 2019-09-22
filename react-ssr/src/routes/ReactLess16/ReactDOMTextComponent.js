function ReactDOMTextComponent(text) {
    // 存下当前的字符串(该component绑定的element)
    this._currentElement = `${text}`;
    // 用来表示当前component的Id
    this._rootNodeID = null;
}

ReactDOMTextComponent.prototype.mountComponent = (rootID) => {
    this._rootNodeID = rootID;
    return `<span data-reactid=".${this._rootNodeID}">${this._currentElement}</span>`;
};

ReactDOMTextComponent.prototype.receiveComponent = (nextText) => {
    const nextStringText = `${nextText}`;
    // 跟以前保存的字符串比较
    if (nextStringText !== this._currentElement) {
        this._currentElement = nextStringText;
        // 替换整个节点
        $(`[data-reactid="${this._rootNodeID}"]`).html(this._currentElement);
    }
};

export default ReactDOMTextComponent;
