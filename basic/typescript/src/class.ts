function logParameter(target: object, propertyKey: string, index: number) {
    console.log(target, propertyKey, index);
}

class MyClass {
    str: string;
    public str1?: string;
    private str2?: string;
    protected str3?: string;
    constructor(str: string) {
        this.str = str;
    }
    get _str(): string {
        return this.str;
    }
    set _str(str: string) {
        this.str = str;
    }
    public func() {
        console.log("func");
    }
    private func2() {}
    protected func3() {}
    func4(@logParameter message: string, @logParameter name: string) {
        return `${message} ${name}`;
    }
}

abstract class MyClass1 {
    abstract func(): void;
    func1(): void {
        console.log('func1');
    }
}

class Myclass2 extends MyClass1 {
    func() {
        console.log("func");
    }
}

