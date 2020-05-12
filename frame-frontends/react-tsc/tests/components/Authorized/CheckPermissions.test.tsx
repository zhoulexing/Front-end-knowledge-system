import * as React from "react";
import check from "@/components/Authorized/CheckPermissions";
import PromiseRender from "@/components/Authorized/PromiseRender";


describe("test check", () => {
    it("check null", () => {
        const result = check(undefined, true, false);
        expect(result).toBe(true);
    });

    it("check string true", () => {
        const result = check("NULL", true, false);
        expect(result).toBe(true);
    });

    it("check string false", () => {
        const result = check("admin", true, false);
        expect(result).toBe(false);
    });

    it("check array true", () => {
        const result = check(["NULL"], true, false);
        expect(result).toBe(true);
    });

    it("check array false", () => {
        const result = check(["admin"], true, false);
        expect(result).toBe(false);
    });

    it("check function true",() => {
        const result = check(() => true, true, false);
        expect(result).toBe(true);
    });

    it("check function false", () => {
        const result = check(() => false, true, false);
        expect(result).toBe(false);
    });

    it("check promise true", () => {
        const promise = new Promise(resolve => resolve(true)) as Promise<boolean>;
        const result = check(promise, true, false);
        expect(React.isValidElement(result)).toBe(true);
    });

    it("check promise false", () => {
        const promise = new Promise(resolve => resolve(false)) as Promise<boolean>;
        const result = check(promise, true, false);
        expect(result).toEqual(<PromiseRender ok={true} error={false} promise={promise}/>);
    });
});