const b = require("./b");

function component() {
    var element = document.createElement('div');
  
    element.innerHTML = b();
  
    return element;
}
  
document.body.appendChild(component());