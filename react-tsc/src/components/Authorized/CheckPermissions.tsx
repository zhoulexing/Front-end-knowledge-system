import * as React from "react";
import PromiseRender from "./PromiseRender";
import { CURRENT } from "./renderAuthorize";

export type IAuthorityType =
    | undefined
    | string
    | string[]
    | Promise<boolean>
    | ((currentAuthority: string | string[]) => boolean | Promise<boolean>);

const checkPermissions = <T, K>(
    authority: IAuthorityType,
    currentAuthority: string | string[],
    target: T,
    Exception: K
): T | K | React.ReactNode => {
    if (!authority) {
        return target;
    }

    if (Array.isArray(authority)) {
        if (Array.isArray(currentAuthority)) {
            if (currentAuthority.some(item => authority.includes(item))) {
                return target;
            }
        } else if (authority.includes(currentAuthority)) {
            return target;
        }
        return Exception;
    }

    if (typeof authority === "string") {
        if (Array.isArray(currentAuthority)) {
            if (currentAuthority.some(item => authority.includes(item))) {
                return target;
            }
        } else if (authority.includes(currentAuthority)) {
            return target;
        }
        return Exception;
    }

    if (authority instanceof Promise) {
        return (
            <PromiseRender<T, K>
                ok={target}
                error={Exception}
                promise={authority}
            />
        );
    }

    if (typeof authority === "function") {
        try {
            const bool = authority(currentAuthority);
            if (bool instanceof Promise) {
                return (
                    <PromiseRender<T, K>
                        ok={target}
                        error={Exception}
                        promise={bool}
                    />
                );
            }
            if (bool) {
                return target;
            }
            return Exception;
        } catch (error) {
            throw error;
        }
    }

    throw new Error("unsupported parameters");
};

function check<T, K>(authority: IAuthorityType, target: T, Exception: K) {
    return checkPermissions<T, K>(authority, CURRENT, target, Exception);
}

export { checkPermissions };

export default check;
