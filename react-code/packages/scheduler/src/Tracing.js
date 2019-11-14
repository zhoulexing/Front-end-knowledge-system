let threadIDCounter = 0;

export function unstable_getThreadID() {
    return ++threadIDCounter;
}
