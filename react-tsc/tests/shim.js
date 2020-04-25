const jsdom = require("jsdom");


const {
    JSDOM
} = jsdom;
const {
    window
} = new JSDOM("");
const {
    document
} = (new JSDOM(``)).window;

global.document = document;
global.window = window;

global.requestAnimationFrame = function (callback) {
    setTimeout(callback, 0);
}