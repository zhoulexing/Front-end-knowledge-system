import Authorized from "./Authorized";
import renderAuthorize from "./renderAuthorize";

import AuthorizedRoute from "./AuthorizedRoute";
import Secured from "./Secured";
import check from "./CheckPermissions";

Authorized.check = check; 
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.Secured = Secured;

export default renderAuthorize(Authorized);
