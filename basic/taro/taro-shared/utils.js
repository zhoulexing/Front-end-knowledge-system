export function toCamelCase(s) {
    let camel = "";
    let nextCap = false;
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== "-") {
            camel += nextCap ? s[i].toUpperCase() : s[i];
            nextCap = false;
        } else {
            nextCap = true;
        }
    }
    return camel;
}

export function toDashed(s) {
    return s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export const hasOwn = (val, key) => hasOwnProperty.call(val, key);
