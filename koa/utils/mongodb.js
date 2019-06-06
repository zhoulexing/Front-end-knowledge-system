const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schemas = require("../config/mongodb.schema");
const { mongodb } = require("../config");

function dbconnect() {
    mongoose.connect(mongodb.url, mongodb.options);
    mongoose.connection.on("error", err => {
        console.error("MongoDB connection error: " + err);
        process.exit(-1);
    });
}

const out = {};
for(let key in schemas) {
    let schema = schemas[key];
    let itemSchema = new Schema(schema.cols);
    out[key] = mongoose.model(schema.name, itemSchema);
}

module.exports = {
    dbconnect,
    ...out
};