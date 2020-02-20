// import { getSg } from "./main.js";
// import { getAge, getName } from "./content";

// console.log(getName() + getAge() + getSg());
console.log("zlx");

function a() {
    import(/* webpackChunkName: "need" */"./need").then(m => {
        m();
    });
}





