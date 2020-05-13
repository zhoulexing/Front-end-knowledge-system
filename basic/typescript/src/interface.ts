interface Fun1 {
    (word: string): string;
}

interface Arr2 {
    [index: number]: string;
}

interface Obj {
    [propName: string]: any;
}

interface Obj1 {
    [name: string]: string;
}

interface Inter {
    num: number;
    str: string;
    str1?: string; // 可选属性
    readonly str2: string; // 只度属性
    fun: (word: string) => string; // 函数类型
    fun1: Fun1; 
    fun2: (word: string) => void;
    func3: (date: Date) => Date;
    arr: string[];
    arr1: Array<string>;
    arr2: Arr2;
    obj: Obj;
    obj1: Obj1;
    children: Inter;
}

const inter = {} as Inter;
inter.fun2 = (str) => str;
inter.fun2("hello");

const inter1 = <Inter>{};
inter1.num = 1;
