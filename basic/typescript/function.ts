function add(x: number, y: number): number {
    return x + y;
}

function buildName(firstName: string, ...resetOfName: string[]): string {
    return firstName + ' ' + resetOfName.join(' ');
}