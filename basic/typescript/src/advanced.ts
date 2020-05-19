interface Advanced {
    [prop: string]: any
}

function advancedFunc<T extends Advanced, U extends Advanced>(first: T, second: U) {
    const result = <T & U>{};
    for(let key in first) {
        (<T>result)[key] = first[key];
    }
    for(let key in second) {
        (<U>result)[key] = second[key];
    }
    return result;
}

function advancedFunc2(arg: string[] | string): string {
    let line = "";
    if(Array.isArray(arg)) {
        line = arg.join(" ").trim();
    } else {
        line = arg.trim();
    }
    return line;
}


