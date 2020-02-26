import { expect } from "chai";
import { isPromise } from "@/utils/util";

describe("test object is promise", () => {
    it("should return true", () => {
        const promise = Promise.resolve(100);
        const bool = isPromise(promise);
        expect(bool).to.equal(true);
    });

    it("should return false", () => {
        const bool = isPromise({});
        expect(bool).to.equal(false);
    });
});