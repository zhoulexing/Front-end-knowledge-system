// better
const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

// best
const getKeyValue2 = <T extends object, U extends keyof T>(key: U) => (
    obj: T
) => obj[key];
