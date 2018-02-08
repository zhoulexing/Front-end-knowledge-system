import("./math").then(_ => {
    let num = _.cube(5);
    console.log(num);
});

import _ from "lodash";

function component() {
    var element = document.createElement('div');
  
    element.innerHTML = "Hello World!";
    console.log("element:", element);
  
    return element;
}

console.log(process.env.NODE_ENV); //development
  
document.body.appendChild(component());