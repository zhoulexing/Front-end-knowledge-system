import "./index.css";
import "font-awesome/css/font-awesome.min.css";

function component() {
    var element = document.createElement('div');
  
    element.innerHTML = `<div class="hello">Hello Wrold! <i class="fa fa-adjust"></i></div>`;
  
    return element;
}
  
document.body.appendChild(component());