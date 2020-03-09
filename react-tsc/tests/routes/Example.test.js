import React from "react";
import Count from "@/routes/Example/Count";
import { expect } from "chai";
import { shallow } from "enzyme";


describe("test Example Component", () => {
    it("Example is not empty", () => {
        const wrapper = shallow(<Count />);
        expect(wrapper.find('.test')).to.have.length(1);
    });
});