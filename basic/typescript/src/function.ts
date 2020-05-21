function func1(num1: number, num2: number): number {
    return num1 + num2;
}
const func2: (num1: number, num2: number) => number = function(num1, num2) {
    return num1 + num2;
}
const func3: (num1: number, num2?: number) => number = function(num1, num2) {
    return num1 + (num2 ? num2 : 0);
}
function func4(num1: number, num2 = 10) {
    return num1 + num2;
}
const func5 = (num1: number, ...num2: number[]) => num2.reduce(((a, b) => a + b), num1); 


interface Func {
    top: number,
    bottom?: number,
    left?: number,
    right?: number,
}
function func6(top: number): Func;
function func6(top: number, bottom: number): Func;
function func6(top: number, bottom: number, left: number): Func;
function func6(top: number, bottom: number, left: number, right: number): Func;
function func6(top: number, bottom?: number, left?: number, right?: number) {
    if(bottom === undefined && left === undefined && right === undefined) {
        bottom = left = right = top;
    } else if(left === undefined && right === undefined) {
        left = top;
        right = bottom;
    }
    return {
        top,
        bottom,
        left,
        right
    };
}
func6(1);
func6(1, 2);
func6(1, 2, 3);
func6(1, 2, 3, 4);

function func7<T extends object, U extends keyof T>(obj: T, key: U): T[U] {
    return obj[key];
}

