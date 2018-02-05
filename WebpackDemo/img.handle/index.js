import style from "./index.css";
import img from "./no_photo.jpg";
function component() {
    var element = document.createElement('div');

    element.innerHTML = ['Hello', 'webpack'].join(' ');
    element.classList.add(style.hello);

    return element;
}

function component1() {
    var element = document.createElement('div');
    var myImg = new Image();
    console.log(myImg);
    myImg.src = img;

    element.appendChild(myImg);

    return element;
}

function component2() {
    var element = document.createElement('div');

    //element.innerHTML = `<div><img src=${img}/></div>`;
    element.innerHTML = `<div><img src="no_photo.jpg"/></div>`;

    return element;
}

document.body.appendChild(component()).appendChild(component1()).appendChild(component2());