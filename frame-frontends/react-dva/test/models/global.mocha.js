import { expect } from "chai";
import globalModel from "../../src/models/global";

describe("test global models", () => {
    it("validate initial state", () => {
        expect(globalModel.state).to.deep.equal({ collapsed: false });
    });

    it("reducers/changeLayoutCollapsed is a function", () => {
        const { changeLayoutCollapsed } = globalModel.reducers;
        expect(changeLayoutCollapsed).to.be.a("function");
    });

    it("reducers/changeLayoutCollapsed return object", () => {
        const { changeLayoutCollapsed } = globalModel.reducers;
        expect(changeLayoutCollapsed({}, { payload: true })).to.deep.equal({ collapsed: true });
    });
});

