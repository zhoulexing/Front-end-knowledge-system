var xlsx = require('node-xlsx');
var nodeExcel = require('excel-export'); //这个比较好用
var fs = require('fs');

var data = [[1,2,3], [4,5], ['a','b','c','d','e','f']];

var file = xlsx.build([{name : 'mySheet',data : data}]);
fs.writeFile('test.xlsx', file, 'binary');
