import style from "./index.css";
import style1 from "./index.less";
import img from "./index.jpg";
import "font-awesome/css/font-awesome.css";

function component() {
    let element = document.createElement('div');

    element.innerHTML = `<div class=${style.hello}>Hello World!</di>`;

    return element;
}

function component1() {
    let element = document.createElement('div');

    element.innerHTML = `<div class=${style1.hello1}>Hello1 World!</di>`;

    return element;
}

function component2() {
    var element = document.createElement('div');

    // element.innerHTML = `<div><img src=${img}/></div>`;
    element.innerHTML = `<div><img src="./index.jpg"/></div>`;

    return element;
}

function component3() {
    var element = document.createElement('div');

    element.innerHTML = `<div><i class="fa fa-adjust"></i></div>`;

    return element;
}

document.body.appendChild(component());
document.body.appendChild(component1());
document.body.appendChild(component2());
document.body.appendChild(component3());