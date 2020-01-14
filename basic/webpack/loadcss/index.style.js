import mainJs from "./main.style.js";
console.log(mainJs[".main"]);

const style = {
    ".menu": {
        color: mainJs[".main"].color,
        height: mainJs[".main"].height
    }
}

module.exports = style;