interface AssertAndGuard {
    name: string,
    age: number,
}

class AssertAndGuard1 {
    name = "zlx";
    age = 20;
}

class AssertAndGuard2 {
    name = "yww";
    color = "pink";
}

type AssertAndGuard3 = {
    name: "zlx",
    age: number,
}

type AssertAndGuard4 = {
    name: "yww",
    age: number,
}

const obj = {} as AssertAndGuard;
obj.name = "zlx";
obj.age = 20;

const obj2 = "zlx" as any as AssertAndGuard;

function objFunc1(arg: AssertAndGuard1 | AssertAndGuard2) {
    if(arg instanceof AssertAndGuard1) {
        console.log(arg.age);
        // console.log(arg.color); Errro
        console.log(arg.name);
    }
    if(arg instanceof AssertAndGuard2) {
        // console.log(arg.age); Error
        console.log(arg.color);
    }
}

function objFunc2(arg: AssertAndGuard1 | AssertAndGuard2) {
    if("age" in arg) {
        console.log(arg.age);
        // console.log(arg.color); Error
        console.log(arg.name);
    }
    if("color" in arg) {
        // console.log(arg.age); Error
        console.log(arg.color);
    }
}

function objFunc3(arg: AssertAndGuard3 | AssertAndGuard4) {
    if(arg.name === "zlx") {
        console.log(arg.age);
        console.log(arg.name);
    } else {
        console.log(arg.age); 
        console.log(arg.name);
    }
}




