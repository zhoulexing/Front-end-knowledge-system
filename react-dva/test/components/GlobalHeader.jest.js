import React from "react";
import { shallow } from "enzyme";
import GlobalHeader from "../../src/routes/Example/example2.js";

describe("test Component GlobalHeader", () => {
    it("should render without throwing an error", () => {
        expect(shallow(<GlobalHeader />)).toContainEqual(
            <div>
                example2
            </div>
        );
    });
});