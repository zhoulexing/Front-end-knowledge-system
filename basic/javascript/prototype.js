function Test() {
    this.name = 'zlx';
    this.age = 20;
}
Object.prototype.say = function() {
    console.log('Hi');
}
var test = new Test();

console.log(Object.keys(test));

for(let key in test) {
    console.log(key);
}