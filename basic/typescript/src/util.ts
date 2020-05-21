interface Util {
    readonly id: number;
    name: string;
    age: number;
    weight: number;
    company: Util1;
}

interface Util1 {
    name: string;
    age: number;
    address: string;
    num: number;
}

type DeepPartial<T> = {
    [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
};

// 将属性改为可选的
type Util2 = Partial<Util>;
type Util3 = DeepPartial<Util>;

// type Exclude<T, U> = T extends U ? never : T; 剔除T中含有U中的类型
type Util4 = Exclude<1 | 2, 1 | 3>;

// Pick根据属性选取对象中的类型
type Util5 = Pick<
    { name: string; age: number; weight: number },
    "name" | "age"
>;

// Omit<T, U>, T忽略U中的属性，是Pick和Exclude结合的类型，
// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Util6 = Omit<{ name: string; age: number; weight: number }, "name">;

// 将交叉类型合并
type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] };
type Util7 = Compute<Util & Util1>;

// 将两个对象的属性合并，如果O1和O2都有，则取O1的
type Merge<O1 extends object, O2 extends object> = Compute<
    O1 & Omit<O2, keyof O1>
>;
type Util8 = Merge<Util, Util1>;

// 取T和U中共同的属性
type Intersection<T extends object, U extends object> = Pick<
    T,
    Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;
type Util9 = Intersection<Util, Util1>;

type Overwrite<
    T extends object,
    U extends object,
    I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;
type Util10 = Overwrite<Util, Util1>;

// 将T的所有readonly属性移除
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
type Util11 = Mutable<Util>;
