function addAge(constructor: Function) {
    constructor.prototype.age = 18;
}

@addAge
class Decorator {
    name: string;
    age!: number; 
    constructor() {
        this.name = "zlx";
    }
}