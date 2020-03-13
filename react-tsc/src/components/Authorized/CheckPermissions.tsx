export type IAuthorityType =
    | undefined
    | string
    | string[]
    | Promise<boolean>
    | ((currentAuthority: string | string[]) => IAuthorityType);

function check<T, K>(authority: IAuthorityType, target: T, Exception: K) {
    return 
}

export default check;
