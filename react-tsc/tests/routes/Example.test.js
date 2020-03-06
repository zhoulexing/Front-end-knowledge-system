// import Example from "@/routes/Example/Count";
import React from "react";
import Count from "@/routes/Example/Count";
import { expect } from "chai";
import { shallow } from "enzyme";


describe("test Example Component", () => {
    it("Example is not empty", () => {
        // const wrapper = mount(<Example />);
        // expect(wrapper).toContainEqual(<div></div>);
        // expect(wrapper).not.toBeEmptyRender();

        const wrapper = shallow(<Count />);
        expect(wrapper.find('.test')).to.have.length(1);

        // const wrapper = render(<Example />);
        //   expect(wrapper).toMatchSnapshot();
    })
});