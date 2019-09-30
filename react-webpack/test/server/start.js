// require.extensions['.scss'] = function () {
//     return null;
// };
// require.extensions['.css'] = function () {
//     return null;
// };
// require.extensions['.less'] = function (_module, _filename) {
//     console.log(_module, _filename);
// };

require('@babel/register');
require('./index');