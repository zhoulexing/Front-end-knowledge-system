import * as React from "react";
import check, { IAuthorityType } from "./CheckPermissions";
import Secured from "./Secured";
import AuthorizedRoute from "./AuthorizedRoute";

interface AuthorizedProps {
    authority: IAuthorityType;
    noMatch?: React.ReactNode;
}

export type IAuthorizedType = React.FunctionComponent<AuthorizedProps> & {
    Secured: typeof Secured;
    check: typeof check;
    AuthorizedRoute: typeof AuthorizedRoute;
};

const Authorized: React.FunctionComponent<AuthorizedProps> = ({
    children,
    authority,
    noMatch = null
}) => {
    const childrenRender: React.ReactNode =
        typeof children === "undefined" ? null : children;
    const dom = check(authority, childrenRender, noMatch);
    return <>{dom}</>;
};

export default Authorized as IAuthorizedType;
