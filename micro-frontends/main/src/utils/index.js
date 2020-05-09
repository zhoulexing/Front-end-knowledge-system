export function getName() {
    return "Hello World";
}

export const subject = (function () {
    class PubSub {
        constructor() {
            this.subs = {};
        }
    
        subscribe(key, fn) {
            if(!this.subs[key]) {
                this.subs[key] = [];
            }
            this.subs[key].push(fn);
        }
    
        unSubscribe(key, fn) {
            let fnList = this.subs[key];
            if(!fnList) {
    
            }
        }
    
        publish(key, ...args) {
            let fn;
            for(fn of this.subs[key]) {
                fn.call(this, ...args);
            }
        }
    }
    return new PubSub();
})();
