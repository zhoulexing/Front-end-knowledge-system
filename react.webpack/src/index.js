import style from "./index.less";
import a from "./test/a";

const divDom = document.createElement("div");
divDom.classList.add(style.main);
divDom.innerText = a;
document.getElementById("root").appendChild(divDom);


/*const imgDom = document.createElement("img");
imgDom.src = "../images/head.jpg";
document.getElementById("root").appendChild(imgDom);*/
