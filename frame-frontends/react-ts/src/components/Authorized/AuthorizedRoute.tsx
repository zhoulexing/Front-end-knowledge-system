import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import Authorized from "./Authorized";
import { IAuthorityType } from "./CheckPermissions";

interface AuthorizeRouteProps {
    path: string;
    currentAuthority?: string;
    component?: React.ComponentClass<any, any> | React.FunctionComponent;
    render: (props: any) => React.ReactNode;
    redirectPath: string;
    authority: IAuthorityType;
    exact?: boolean;
}

const AuthorizeRoute: React.SFC<AuthorizeRouteProps> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={(
      <Route
        {...rest}
        render={() => <Redirect to={{ pathname: redirectPath }} />}
      />
          )}
  >
    <Route
      {...rest}
      render={(props: any) => (Component ? <Component {...props} /> : render(props))}
    />
  </Authorized>
);

export default AuthorizeRoute;
