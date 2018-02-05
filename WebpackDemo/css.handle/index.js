import style from "./index.css";
import style1 from "./index.less";
function component() {
    var element = document.createElement('div');
  
    element.innerHTML = ['Hello', 'webpack'].join(' ');
    element.classList.add(style.hello);
  
    return element;
}

function component1() {
    var element = document.createElement('div');
  
    element.innerHTML = `<div class=${style1.hello1}>Hello1 webpack</div>`;

    return element;
}
  
  document.body.appendChild(component()).appendChild(component1());