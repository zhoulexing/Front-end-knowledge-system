require('css-modules-require-hook/preset');
require('asset-require-hook')({
    extensions: ['jpg', 'png']
});
require('@babel/register');
require('./app');