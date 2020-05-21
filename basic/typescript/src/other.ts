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


// 返回类型, ReturnType泛型中必须是一个方法，否则没有返回值
const other6 = {
    name: "zlx",
}
const other7 = () => ({
    name: "zlx",
});
type ReturnOther6 = typeof other6;
type ReturnOther61 = ReturnType<typeof other7>;