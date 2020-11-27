export type Code = string | number | null;

export default class Enum {
    private code: Code;
    private desc: string;

    constructor(code: Code, desc: string) {
        this.code = code;
        this.desc = desc;
    }

    public getCode() {
        return this.code;
    }

    public getDesc() {
        return this.desc;
    }
}
