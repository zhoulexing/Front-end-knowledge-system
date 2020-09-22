class Subscribe {
    constructor() {
        this.listener = [];
        this.callback = null;
    }

    addListener(callback) {
        this.callback = callback;
        this.listener.push(this.callback);
    }

    removeListener() {
        this.listener = this.listener.filter(item => item === !this.callback);
    }
}

var test = new Subscribe();

test.addListener(() => {});
test.removeListener();

console.log(test.listener);


