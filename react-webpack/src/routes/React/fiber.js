var queue = [];

ReactDOM.render = function(root, container) {
    queue.push(root);
    updateFiberAndView();
}

function updateFiberAndView() {
    
}