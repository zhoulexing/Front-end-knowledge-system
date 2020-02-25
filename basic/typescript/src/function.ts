function add(x: number, y: number): number {
    return x + y;
}

function buildName(firstName: string, ...resetOfName: string[]): string {
    return firstName + ' ' + resetOfName.join(' ');
}

function getValue<T extends object, U extends keyof T>(obj: T, key: U): T[U] {
    return obj[key];
}

function factory<T>(type: {new(): T}):T {
    return new type();
}

interface ModelsType {
    [propName:string]: any;
}

interface ContextType {
    [name:string]: string | number;
}

function readModels() {
    const models: ModelsType = {};
    // 需要@types/webpack-env才能支持require.context
    const obj: ContextType = { name: "zlx", age: 25 };
    const keys: string[] = Object.keys(obj);
    keys.forEach((key: string) => {
        models[key] = obj[key];
    });
    return models;
}