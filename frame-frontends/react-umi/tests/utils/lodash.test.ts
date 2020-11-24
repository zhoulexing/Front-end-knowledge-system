import * as _ from "lodash";

describe("test lodash", () => {
    it("test isEmpty", () => {
        const bool = _.isEmpty({});
        expect(bool).toBe(true);
    });
});