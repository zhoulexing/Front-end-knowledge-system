/* 初探 */
interface LabelledValue {
    label: string;
    color?: string;
    readonly name: string;
}
function printLabel(labelObj: LabelledValue) {
    // labelObj.name = "yww"; error
    console.log(labelObj.label);
}
let myObj = {
    size: 10, 
    label: "Size 10 Object",
    name: "zlx",
};
printLabel(myObj);

/* 只读 */
let a: number[] = [1,2,3,4];
let ro: ReadonlyArray<number> = a;
a.push(5);
// ro.push(5); error

/* 函数类型 */
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > 1;
};

/* 可索引的类型 */
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray = ["Bob", "Fred"];
let myStr: string = myArray[0];


/* 类类型 */
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}
class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) {
        this.currentTime = new Date();
    }
    setTime(d: Date): void {
        this.currentTime = d;
    }
}

interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
let square = <Square>{};
square.color = "red";
square.sideLength = 5;
square.penWidth = 4;


interface MenuItem {
    name: string,
    icon: string,
    path: string,
    children: MenuItem[]
}

interface MenuData extends Array<MenuItem> {}

// interface MenuData {
//     [index: number]: MenuItem
// }

// type MenuData = MenuItem[];

const menuData = [
    {
        name: "数据资源",
        icon: "database",
        path: "datasource"
    },
    {
        name: "我的",
        icon: "user",
        path: "my",
        children: [
            {
                name: "研判",
                path: "determine"
            },
            {
                name: "资源",
                path: "datasource"
            }
        ]
    },
    {
        name: "示例",
        icon: "smile",
        path: "example",
        children: [
            {
                name: "示例1",
                path: "1"
            },
            {
                name: "示例2",
                path: "2"
            }
        ]
    }
];

interface Config {
    width?: string;
    [propName:string]: any;
}

interface Config1 {
    [name:string]: string
}
