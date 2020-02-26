import React from "react";
import Example from "@/routes/Example/index.js";
import { expect } from "chai";
import { shallow } from "enzyme";

describe("test Example Component", () => {
    it("Example is not empty", () => {
        // const wrapper = mount(<Example />);
        // expect(wrapper).toContainEqual(<div></div>);
        // expect(wrapper).not.toBeEmptyRender();

        const wrapper = shallow(<Example />);
        expect(wrapper.find('.icon-star')).to.have.length(1);
    })
});