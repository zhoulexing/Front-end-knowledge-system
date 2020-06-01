import RenderAuthorize from "@/components/Authorized";
import { getAuthority } from "./authority";

let Authorized = RenderAuthorize(getAuthority() as (string | string[]));

const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getAuthority() as (string | string[]));
};

export { reloadAuthorized };
export default Authorized;
