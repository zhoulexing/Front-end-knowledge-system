enum Enum {
    Up = 0,
    Down,
    Left,
    Right
}

enum Enum1 {
    A = 1,
    B = A * 2
}

enum Enum2 {
    A = 10,
    B = 'b',
    C = 'c',
}

enum Enum3 {
    A = 10,
    B,
    C,
}

type c = 0;
let b: c;
b = Enum.Up;

console.log(Enum1.A, Enum1[0]);
console.log(Enum2.A, Enum2[10]);
console.log(Enum3.A, Enum3.B, Enum3.C); // 10, 11, 12