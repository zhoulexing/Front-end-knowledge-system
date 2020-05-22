import * as React from "react";
import ForTest from "@/components/ForTest";
import { shallow, mount, render } from "enzyme";
import { Button } from "antd";

describe("test components ForTest", () => {
    beforeAll(() => {
        console.log("global before all");
    });

    afterAll(() => {
        console.log("global after all");
    });

    beforeEach(() => {
        console.log("global before each");
    });

    afterEach(() => {
        console.log("global after each");
    });

    /**
     * shallow：浅渲染，将组件渲染成虚拟DOM对象,只渲染第一层，子组件不会被渲染;
     * render: 静态渲染，将React组件渲染成静态的HTML字符串；
     * mount：完全渲染，它将组件渲染加载成一个真实的DOM节点，用来测试DOM API的交互和组件的生命周期。
     */
    it("shallow get Button length", () => {
        const sWrapper = shallow(<ForTest />);
        const mWrapper = mount(<ForTest />);
        const rWrapper = render(<ForTest />);
        expect(sWrapper.find(Button).length).toBe(1);
        expect(mWrapper.find(Button).length).toBe(1);
        expect(rWrapper.find("button").length).toBe(1);
    });

    /**
     * simulate: 模拟事件
     */
    it("click Button to be done", () => {
        const props = {
            getCount: jest.fn(),
        };
        const sWrapper = shallow(<ForTest {...props} />);
        sWrapper.find(Button).at(0).simulate("click");
        expect(props.getCount).toBeCalled();
    });

    /**
     * UI测试, 生成快照
     */
    it("UI render", () => {
        const props = {
            getCount: jest.fn(),
        };
        const rWrapper = render(<ForTest {...props} />);
        expect(rWrapper).toMatchSnapshot();
    });

    /**
     * 测试组件生命周期
     */
    it("calls componentDidMount", () => {
        const componentDidMountSpy = jest.spyOn(
            ForTest.prototype,
            "componentDidMount"
        );
        shallow(<ForTest />);
        expect(componentDidMountSpy).toHaveBeenCalled();
        // 测试完要进行mockRestore()
        componentDidMountSpy.mockRestore();
    });

    /**
     * 测试组件的内部函数, 用箭头函数来定义方法
     */
    it("calls component getCount", () => {
        const sWrapper = shallow(<ForTest />);
        const spyFunction = jest.spyOn(sWrapper.instance(), "getName");
        sWrapper.instance().getName();
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockRestore();
    });

    /**
     * 测试组件的内部函数, 在constructor使用bind来定义方法
     */
    it("calls component getGet", () => {
        const props = {
            getCount: jest.fn(),
        };
        const sWrapper = shallow(<ForTest {...props} />);
        const spyFunction = jest.spyOn(ForTest.prototype, "getAge");
        const Construc = sWrapper.instance();
        Construc.getName();
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockRestore();
    });
});
