'use strict'

const { EventEmitter } = require('events');


//console.log(Buffer.from([1, 2, 3]));

//console.log(process.env);

const myEvent = new EventEmitter();
myEvent.on('test', (data) => {
  console.log(data);
});
myEvent.emit('test', 'Hello World!');


