class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");


class Animal {
    private age: number;
    name: string;
    constructor(theName: string) {
        this.name = theName;
        this.age = 25;
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
class Horse extends Animal {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);

class Employee {
    private _fullName: string;
    constructor() {
        this._fullName = "";
    }


    get fullName(): string {
        return this._fullName;
    }

    set fullName(fullName: string) {
        this._fullName = fullName;
    }
}


class Queue {
    private data = [];
    push = () => {
        
    }
}

abstract class Animal1 {
    abstract makeSound(): void;
    move(): void {
        console.log('Hello World!');
    }
}

class Cat extends Animal1 {
    makeSound() {
        console.log("miao miao");
    }
}

const cat = new Cat();
cat.move();

class Car {
    public run() {

    }
    protected run1() {

    }
    private run2() {

    }
}

const car = new Car();
car.run();


function logParameter(target: object, propertyKey: string, index: number) {
    console.log(target, propertyKey, index);
}
class Person {
    greet(@logParameter message: string, @logParameter name: string) {
        return `${message} ${name}`;
    }
}