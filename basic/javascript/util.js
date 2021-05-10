function checkEmoij(value) {
    const regExp = /123/;
    // const regExp = /[\ud800\udbff-\udc00\udfff\ud800-\udfff]/;

    if (!value || typeof value === "number") {
        return false;
    }

    if (typeof value === "string") {
        return regExp.test(value);
    }

    if (Array.isArray(value)) {
        for (const item of value) {
            if (checkEmoij(item)) {
                return true;
            }
        }
        return false;
    }

    if (typeof value === "object") {
        for (const key in value) {
            if (checkEmoij(value[key])) {
                return true;
            }
        }
        return false;
    }

    return false;
}

console.log(checkEmoij(1));
console.log(checkEmoij("2"));
console.log(checkEmoij(["123"]));
console.log(checkEmoij([{ name: "13" }, { age: " 123" }]));
console.log(checkEmoij({ name: "123" }));
