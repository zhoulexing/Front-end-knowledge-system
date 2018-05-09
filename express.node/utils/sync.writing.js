"use strict";
const co = require("co");


function* test() {
  yield getValue("hello");
  yield getValue("world");
}

function getValue(value) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(value);
    }, 20)
  });
}

const gen = test();



gen.next().value.then(value => {
});
gen.next().value.then(value => {
});


co(function* test2() {
  const val1 = yield getValue("hello");
  const val2 = yield getValue("world");
});


async function testAsync() {
  const value = await getValue("test async");
  return value;
}
const value4 = testAsync();



Promise.all([
  getValue('a'),
  getValue('b'),
  new Promise((resolve, reject) => { reject('c') }),
  Promise.resolve('d')
]).then((value) => {
  console.log(value);
}, (value) => {
  console.log(value);
});

let isTrue = true;
let aaa;
if(isTrue) {
  aaa = getValue('a');
} else {
  aaa = getValue('b');
}
aaa.then(value => {
  console.log(value)
});


