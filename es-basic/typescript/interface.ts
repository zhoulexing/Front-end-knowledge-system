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
    setTime(d: Date);
}
class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) {}
    setTime(d: Date) {
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




