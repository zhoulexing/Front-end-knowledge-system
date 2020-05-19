import * as React from "react";
import ForTest from "@/components/ForTest";
import { shallow } from "enzyme";
import { Button } from "antd";

describe("test components ForTest", () => {
    
    it("get state", () => {
        const sWrapper = shallow(<ForTest />); // 渲染当前组件
        expect(sWrapper.find(Button).length).toBe(1);
    });
});