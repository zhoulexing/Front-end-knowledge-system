import "./index.css";
import main from "./main.css";
import style from "./style.js";
console.log(main, style);

addElement();

function addElement() {
    let element = component();
    console.log(element);
    let root = document.querySelector("#root");
    root.append(element);
}

function component() {
    let element = document.createElement("div");
    element.innerHTML = "Hello World";
    // element.classList.add(style.content);
    return element;
}
