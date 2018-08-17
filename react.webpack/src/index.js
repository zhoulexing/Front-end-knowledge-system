import style from "./index.less";
import a from "./test/a";

const divDom = document.createElement("div");
divDom.classList.add(style.main);
divDom.innerText = a;
document.getElementById("root").appendChild(divDom);

let another = async function() {
    console.log("timestart");
    let result = new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve("Promise resolve");
        }, 1000);
    });
    console.log(result);
    console.log("timeend");
}
another();

fetch("/api/user").then(res => res.json()).then(data => { console.log(data); });


/*const imgDom = document.createElement("img");
imgDom.src = "../images/head.jpg";
document.getElementById("root").appendChild(imgDom);*/
