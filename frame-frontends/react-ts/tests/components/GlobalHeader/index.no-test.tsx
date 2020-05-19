import * as React from "react";
import GlobalHeader from "@/components/GlobalHeader";
import { shallow, mount, render } from "enzyme";
import { Tooltip } from "antd";

describe("test components GlobalHeader", () => {
    const props = {
        collapsed: false,
        onCollapse: jest.fn(),
        currentUser: {
            name: "zlx"
        }
    };
    const sWrapper = shallow(<GlobalHeader {...props} />); // 渲染当前组件
    const mWrapper = mount(<GlobalHeader {...props} />); // 渲染当前组件及子组件



    it("get component Tooltip's length", () => {
        expect(sWrapper.find(Tooltip).length).toBe(1);
        expect(mWrapper.find(Tooltip).length).toBe(2);
    });

    it("get component specific class", () => {
        expect(sWrapper.find(".right").length).toBe(0);
        expect(mWrapper.find(".right").length).toBe(0);
    });

    it("shallowWrapper function to be called", () => {
        sWrapper.find(".test").simulate("click");
        expect(props.onCollapse).toBeCalled();
    });

    it("Snapshot", async () => {
        const tree = await render(<GlobalHeader {...props} />);
        expect(tree).toMatchSnapshot();
    });
});