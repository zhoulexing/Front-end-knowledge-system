const expect = require("chai").expect;

describe("test to eql", () => {
  it("should equal", function() {
    expect({ foo: "foo" }).to.eql({ foo: "foo" });
  });
});
