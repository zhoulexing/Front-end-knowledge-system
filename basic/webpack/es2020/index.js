class Person {
    static #is(obj) {
        return obj instanceof Person;
    }

    constructor(name) {
        if (Person.#is(name)) {
            throw "It is already a person!";
        }
    }

    async getData() {
        try {
            const value = await fetch("www.baidu.com");
            console.log(value);
        } catch (error) {
            
        }
        
    }
}

const element = { index: 0, value: "foo" };
const index = element.index ?? -1;
console.log(index);
