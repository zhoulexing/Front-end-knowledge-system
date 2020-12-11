import path from "path";
function test() {
    console.log(require(path.resolve(__dirname, "test", "b.js")));
}
test();