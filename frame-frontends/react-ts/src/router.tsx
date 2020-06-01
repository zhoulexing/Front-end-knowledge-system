import React from "react";
import { getRouterData } from "@/common/router";
import { Route, Switch, Redirect } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import Authorized from "@/utils/Authorized";
import { getQueryPath } from "@/utils/util";

interface RouterConfigProps {
    history: History;
}

const { AuthorizedRoute } = Authorized;

const RouterConfig: React.SFC<RouterConfigProps> = ({ history }: any) => {
  const routerData = getRouterData();
  const LoginLayout = routerData["/login"].component;
  const BasicLayout = routerData["/apps"].component;

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={LoginLayout} />
        <AuthorizedRoute
          path="/apps"
          render={(props) => <BasicLayout {...props} />}
          authority={["admin"]}
          redirectPath={getQueryPath("/login", {
            redirect: window.location.href,
          })}
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default RouterConfig;
