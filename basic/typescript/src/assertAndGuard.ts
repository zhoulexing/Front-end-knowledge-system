interface Obj {
    name: string,
    age: number,
}

class Obj1 {
    name = "zlx";
    age = 20;
}

class Obj2 {
    name = "yww";
    color = "pink";
}

type Obj3 = {
    name: "zlx",
    age: number,
}

type Obj4 = {
    name: "yww",
    age: number,
}

const obj = {} as Obj;
obj.name = "zlx";
obj.age = 20;

const obj2 = "zlx" as any as Obj;

function objFunc1(arg: Obj1 | Obj2) {
    if(arg instanceof Obj1) {
        console.log(arg.age);
        console.log(arg.color);
        console.log(arg.name);
    }
    if(arg instanceof Obj2) {
        // console.log(arg.age); Error
        console.log(arg.color);
    }
}

function objFunc2(arg: Obj1 | Obj2) {
    if("age" in arg) {
        console.log(arg.age);
        console.log(arg.color);
        console.log(arg.name);
    }
    if("color" in arg) {
        // console.log(arg.age); Error
        console.log(arg.color);
    }
}

function objFunc3(arg: Obj3 | Obj4) {
    if(arg.name === "zlx") {
        console.log(arg.age);
        console.log(arg.name);
    } else {
        console.log(arg.age); 
        console.log(arg.name);
    }
}




