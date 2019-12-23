import less from "./index.less";

function addElement() {
    let element = component();
    let root = document.querySelector("#root");
    root.append(element);
}

function component() {
    let element = document.createElement("div");
    element.innerHTML = "Hello World";
    return element;
}

export default addElement;