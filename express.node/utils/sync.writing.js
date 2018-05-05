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
  console.log(value);
});
gen.next().value.then(value => {
  console.log(value);
});


co(function* test2() {
  const val1 = yield getValue("hello");
  console.log(val1);
  const val2 = yield getValue("world");
  console.log(val2);
});


async function testAsync() {
  console.log("value1");
  const value = await getValue("test async");
  console.log("value2");
  return value;
}
const value4 = testAsync();
console.log("value4:", value4);
console.log("value3");





