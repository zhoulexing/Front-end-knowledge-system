const request = require("supertest");
const should = require("should");
const app = require("../app.js");

describe("login", function() {
    it("signIn should return json object", function(done) {
        request(app)
            .get("/api/login/in?loginname=admin&password=123456")
            .expect(200)
            .expect("Content-Type", /json/)
            .end(function(err, res) {
                if(err) return done(err);
                res.body.success.should.equal(true);
                done();
            });
    });

    it("signOut should return json object", function(done) {
        request(app)
            .get("/api/login/out")
            .expect(200)
            .expect("Content-Type", /json/)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.success.should.equal(true);
                done();
            });
    })
});