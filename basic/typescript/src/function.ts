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