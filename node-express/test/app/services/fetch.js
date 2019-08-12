"use strict";

describe("GET /fetch/getMockData", function () {
  it("should response mockdata", function(done) {
    request
      .get("/fetch/getMockData")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if(err) return done(err);
        //console.log("res body:", res.body);
        res.body.should.have.keys("success");
        done();
      });
  });
  it("should response esdata", function(done) {
    request
      .get("/fetch/getEsData")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function(err, res) {
        if(err) return done(err);
        //console.log("res body:", res.body);
        res.body.should.have.keys("success");
        done();
      });
  });
});
