const app = require("../app");
const request = require("supertest")(app);
const should = require("should");
global.request = request;
