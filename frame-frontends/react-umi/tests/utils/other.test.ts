describe("test es grammar", () => {
    // expect.assertions(1);
    it("es2020 gramar ??", () => {
        const value = 0 ?? "zlx";
        expect(value).toBe("zlx");
    });
});