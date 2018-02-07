import "./index.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

function component() {
    var element = document.createElement('div');
  
    element.innerHTML = `<div class="hello">Hello Wrold!</div>`;
  
    return element;
}
  
document.body.appendChild(component());