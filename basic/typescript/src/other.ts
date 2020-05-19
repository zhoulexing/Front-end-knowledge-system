// 明确赋值断言
class Other {
    name!: string; 
}

// is关键字
function other2(arg: any): arg is string{
    return typeof arg === "string";
}
function other3(arg: string | number) {
    if(other2(arg)) {
        console.log(arg.length);
    }
}

// 可调用类型注解
interface Other4 {
    (): string,
    new (): string,
}
declare const other5: Other4;
other5();
new other5();