export default {
    dev: {
        '/api/': {
            target: 'http://localhost:8004',
            changeOrigin: true,
            pathRewrite: { '^': '' },
        },
    },
    test: {
        '/api/': {
            target: 'http://localhost:8004',
            changeOrigin: true,
            pathRewrite: { '^': '' },
        },
    },
};
