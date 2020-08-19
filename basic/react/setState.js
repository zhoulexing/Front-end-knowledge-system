const queue = [];
const renderQueue = [];

function setState(stateChange, component) {
    if(queue.length === 0) {
        defer(flush);
    }
    console.log('push');
    queue.push({ stateChange, component });
    if ( !renderQueue.some( item => item === component ) ) {
        renderQueue.push( component );
    }
}

function flush() {
    let item, component;
    while( item = queue.shift() ) {
        console.log('queue:', item);
    }
    while( component = renderQueue.shift() ) {
        console.log('renderQueue;', component);
    }
}

function defer(fn) {
    // 利用Promise
    return Promise.resolve().then(fn);
    // 利用setTimeout
    setTimeout(fn, 0);
    // 利用requestAnimationFrame(fn);
}

function run() {
    setState({ count: 0 }, 'component');
    setState({ count: 1 }, 'component');
    setState({ count: 2 }, 'component');
}
run();