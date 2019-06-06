const fs = require("fs");
const path = require("path");
const { delay } = require("roadhog-api-doc");

const noProxy = process.env.NO_PROXY === "true";
const mock = {};
const mockPath = path.resolve(__dirname, "./mock");
fs.readdirSync(mockPath).forEach(file => {
    Object.assign(mock, require(`${ mockPath }/${ file }`));
});

export default noProxy ? {} : delay(mock, 500);
