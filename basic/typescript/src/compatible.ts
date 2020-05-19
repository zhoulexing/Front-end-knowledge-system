class Compatible {
    constructor(public weight: number, public name: string, public age: number) {

    }
}

interface Compatible2 {
    weight: number,
    name: string;
}

let compatible: Compatible2;
compatible = new Compatible(100, "zlx", 20);

let compatible2 = (x: number, y: number) => {};
let compatible3 = (x: number) => {};
let compatible4 = (x?: number, y?:number) => {}
let compatible5 = (...args: number[]) => {};
compatible2 = compatible3;
// compatible3 = compatible2; Error
compatible2 = compatible4 = compatible5; // 配置strictNullChecks为false
compatible5 = compatible2 = compatible4;

enum Compatible6 {
    Ready,
    Waiting,
}
let compatible6 = Compatible6.Ready;
let num = 0;
compatible6 = num;
num = compatible6;

class Compatible7 {
    feet: number;
    constructor(name: string) {}
}
class Compatible8 {
    feet: number;
    constructor(age: number) {}
}
class Compatible9 extends Compatible8 {};
class Compatible10 {
    protected feet: number;
}
class Compatible11 {
    protected feet: number;
}
let compatible7: Compatible7;
let compatible8: Compatible8;
let compatible9: Compatible9;
let compatible10: Compatible10;
let compatible11: Compatible11;
compatible7 = compatible8;
compatible8 = compatible7;
compatible9 = compatible8;
// compatible10 = compatible11; Error, 私有的和受保护的成员必须来自于相同的类才能相互兼容


interface Compatible12<T> {

}
let compatible12: Compatible12<string>;
let compatible121: Compatible12<number>;
compatible12 = compatible121;