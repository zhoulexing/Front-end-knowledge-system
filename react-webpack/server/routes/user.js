const router = require('koa-router')();

router.prefix('/user');

router.get('/:id', async function (ctx, next) {
    try {
        ctx.body = { username: 'admin' };
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
