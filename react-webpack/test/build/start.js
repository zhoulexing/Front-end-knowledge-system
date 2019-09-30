"use strict";

// require.extensions['.scss'] = function () {
//     return null;
// };
// require.extensions['.css'] = function () {
//     return null;
// };
// require.extensions['.less'] = function () {
//     return 'less';
// };
var hook = require('node-hook');

hook.hook('.less', function () {
  return 'less';
});

require('@babel/register');

require('./index');