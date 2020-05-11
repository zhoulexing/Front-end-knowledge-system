'use strict'

const { EventEmitter } = require('events');
const path = require('path');


//console.log(Buffer.from([1, 2, 3]));

//console.log(process.env);

const myEvent = new EventEmitter();
myEvent.on('test', (data) => {
  console.log(data);
});
myEvent.emit('test', 'Hello World!');

const basename = path.basename('../../test.js');
const dirname = path.dirname('../../test.js');
console.log(basename);
console.log(dirname);


