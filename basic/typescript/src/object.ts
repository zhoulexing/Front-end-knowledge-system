// better
const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];

// best
const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
  obj[key];