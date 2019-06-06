import Mock from "mockjs";

function loadMocks() {
    const mocks = require.context("../mocks", false, /\.js$/);
    mocks.keys().forEach(key => {
        const obj = mocks(key);
        for(let k in obj) {
            Mock.mock(obj[k].url, obj[k].method, obj[k].data);
        }
    });
}

Mock.setup({
    timeout: "1000"
});

loadMocks();


