'use strict';

const expect = require("chai").expect;
const config = require("../../../config/index");

describe('config', () => {
  it('should load', () => {
    expect(process.env.NODE_ENV).to.eql("test");
    expect(config.port).to.eql(process.env.port || 3000);
  });
});
