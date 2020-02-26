import React from "react";
import Example from "@/routes/Example";
// import { expect } from "chai";
import { shallow } from "enzyme";

describe("test Example Component", () => {
    it("", () => {
        const wrapper = shallow(<Example />);
        expect(wrapper).toContainEqual(<div></div>);
    })
});