import("./jsonP1").then(res => {
    console.log("content:", res);
});

import("./jsonP2").then(res => {
    console.log("content:", res);
});

export function run() {
    console.log("hello");
}