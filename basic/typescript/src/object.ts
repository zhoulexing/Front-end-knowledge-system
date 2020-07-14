// better
const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

// best
const getKeyValue2 = <T extends object, U extends keyof T>(key: U) => (
    obj: T
) => obj[key];


interface ObjMapInter {
    name: string;
    value: string;
    [key: string]: any;
}
const objMap: ObjMapInter = {
    'name': '123',
    'value': '222'
}
type keyProps = keyof typeof objMap;


Object.entries(objMap).forEach(([key, value]) => {
    console.log(value);
});

type objMapKeys = keyof typeof objMap;
const keys = Object.keys(objMap);
keys.forEach((key) => {
    const item = keys[key];
})