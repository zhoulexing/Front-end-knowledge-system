export function remove(key) {
    key._reactInternalFiber = undefined;
}

export function get(key) {
    return key._reactInternalFiber;
}

export function has(key) {
    return key._reactInternalFiber !== undefined;
}

export function set(key, value) {
    key._reactInternalFiber = value;
}
