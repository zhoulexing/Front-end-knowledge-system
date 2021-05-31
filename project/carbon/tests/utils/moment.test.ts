import * as moment from "moment";

describe("test moment api", () => {
    it("get current month", () => {
        const now = moment();
        expect(now.month()).toBe(new Date().getMonth());

        const time = moment("2020-01-01");
        expect(time.month()).toBe(0);

        time.subtract(1, "month");
        expect(time.month()).toBe(11);
    });
});
