const emptyObject = {};

function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.updater = updater;
    this.refs = emptyObject;
}

export { Component };