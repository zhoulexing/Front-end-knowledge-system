function generic<T>(arg: T): T {
    return arg;
}
function generic2<T, U>(arg1: T, arg2: U): [U, T] {
    return [arg2, arg1];
}
function generic3<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}
interface generic4<T> {
    (params: T): T,
}
class Generic5<T> {
    private arr: T[] = [];
    public push(item: T) {
        this.arr.push(item);
    }
    public pop() {
        return this.arr.pop();
    }
}
const generic5 = new Generic5();
generic5.push("T");
generic5.push(1);
generic5.push(true);

type GenericParams = number | string;
class Generic6<T extends GenericParams> {
    private arr: T[] = [];
    public push(item: T) {
        this.arr.push(item);
    }
    public pop() {
        return this.arr.pop();
    }
}
const generic6 = new Generic6();
generic6.push(1);
generic6.push("Hello");


function generic7<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}
function generic8(key: string, obj: Record<string, any>) {
    return obj[key];
}

function generic9<T extends string & number>(arg: T) {
    return arg;
}

function generic10<T>(type: {new (): T}): T {
    return new type;
}
function generic11<T>(type: new () => T): T {
    return new type();
}