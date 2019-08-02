// function* helloWorldGenerator() {
//     yield 'hello';
//     yield 'world';
//     return 'ending';
// }

// var hw = helloWorldGenerator();
// var hello = hw.next();
// console.log(hello);


// function* flat() {
//     for(var i = 0; i < 3; i++) {
//         console.log(i);
//         yield i;
//     }
// }

// var ft = flat();
// ft.next();


function* f() {
    for(var i = 0; true; i++) {
        var reset = yield i;
        console.log(reset);
        if(reset) { i = -1; }
    }
}
  
var g = f();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());