import MAX_SIGNED_31_BIT_INT from "./maxSigned31BitInt";

export const NoWork = 0;
export const Never = 1;
export const Sync = MAX_SIGNED_31_BIT_INT;
export const Batched = Sync - 1;

const UNIT_SIZE = 10;
const MAGIC_NUMBER_OFFSET = Batched - 1;

export function msToExpirationTime(ms) {
    return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0);
}
