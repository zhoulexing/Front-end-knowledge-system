interface Advanced {
    [prop: string]: any;
}

function advancedFunc<T extends Advanced, U extends Advanced>(
    first: T,
    second: U
) {
    const result = <T & U>{};
    for (let key in first) {
        (<T>result)[key] = first[key];
    }
    for (let key in second) {
        (<U>result)[key] = second[key];
    }
    return result;
}

function advancedFunc2(arg: string[] | string): string {
    let line = "";
    if (Array.isArray(arg)) {
        line = arg.join(" ").trim();
    } else {
        line = arg.trim();
    }
    return line;
}

interface Advanced2 {
    name: string;
    age: number;
    bool: boolean;
}
// key类型
type Advanced2Keys = keyof Advanced2;
// value类型
type Advanced2Vaules = Advanced2[Advanced2Keys];

// 将所有类型变为可选类型，DeepPartial深度变为可选
interface Advanced3 {
    username: string;
    id: number;
    token: string;
    avatar?: string;
    role?: string;
}
type Advanced3Optional = { [K in keyof Advanced3]?: Advanced3[K] };
type Advanced3Optional2 = Partial<Advanced3>;

// 条件类型
declare function advanced4<T extends boolean>(
    x: T
): T extends true ? string : number;
let advanced41 = advanced4(true);
let advanced42 = advanced4(false);

// 分布式有条件类型
type Advanced5<T> = T extends boolean ? "YES" : "NO";
type Advanced6<T> = [T] extends [boolean] ? "YES" : "NO";
type Advanced51 = Advanced5<number | boolean>;
type Advanced61 = Advanced6<number | boolean>;

// 获取两个类型中的diff
type Diff<T, U> = T extends U ? never : T;
type Advanced7 = Diff<"a" | "b" | "c" | "d", "a" | "b" | "e">;
type Advanced8 = Diff<"a" | "b" | "c" | "d", "a" | "b" | "e">;

// 过滤一个类型中另一个类型的key
type Filter<T, U> = T extends U ? T : never;

// 获取类型中值为函数的keys
type FunctionPropertyName<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// 获取类型中为可选的keys
type NullableKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];
type NullableKeys2<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];
type Advanced9 = NullableKeys<Advanced3>;
type Advanced10 = NullableKeys2<Advanced3>;

// 类型符合(param: infer P) => any，则返回param的类型，否则返回T
type ParamType<T> = T extends (param: infer P) => any ? P : T;

// 用inter P代表函数返回的类型
type ReturnType2<T> = T extends (...args: any[]) => infer P ? P : any;

// 获取构造函数的参数类型
class Advanced11 {
    constructor(public name: string, public age: number) {

    }
}
type Advanced12 = ConstructorParameters<typeof Advanced11>;


type Advanced13<T> = T extends Array<infer E> ? E : never;
type Advanced14 = [string, number];
type Advanced15 = Advanced13<Advanced14>;

// 将 string | number 转为 string & number，string & number 就是never，
type Advanced16<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type Advanced17 = Advanced16<string | number>;