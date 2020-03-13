import React from "react";
import Count from "@/routes/Example/Count";
import { shallow } from "enzyme";


describe("test Example Component", () => {
    it("Example is not empty", () => {
        const wrapper = shallow(<Count />);
        expect(wrapper.find('.test')).toHaveLength(1);
    });
});