import { cube } from "./math";

function component() {
    var element = document.createElement('div');
  
    element.innerHTML = "Hello World!" + cube(5);
    console.log("element:", element);
  
    return element;
}
  
document.body.appendChild(component());