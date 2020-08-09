export interface Obj {
    name: string;
    getName(this: Obj): string;
}
const obj: Obj = {
    name: 'zlx',
    getName() {
        return this.name;
    }
}



interface People {
    name: string;
    getName(): string;
}
interface PeopleConstructor {
    new (name: string): People;
    prototype: People;
}
function People(this: People, name: string) {
    this.name = name;
} 

