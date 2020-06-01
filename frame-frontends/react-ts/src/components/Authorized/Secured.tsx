import * as React from "react";
import CheckPermissions from "./CheckPermissions";

export const isComponentClass = (
  component: React.ComponentClass | React.ReactNode,
): boolean => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
};

const Exception403 = () => 403;

const checkIsInstantiation = (
  target: React.ComponentClass | React.ReactNode,
) => {
  if (isComponentClass(target)) {
    const Target = target as React.ComponentClass;
    return (props: any) => <Target {...props} />;
  }
  if (React.isValidElement(target)) {
    return (props: any) => React.cloneElement(target, props);
  }
  return () => target;
};

const authorize = (authority: string, error?: React.ReactNode) => {
  let classError: boolean | React.FunctionComponent = false;
  if (error) {
    classError = (() => error) as React.FunctionComponent;
  }
  if (!authority) {
    throw new Error("authority is required");
  }
  return function decideAuthority(
    target: React.ComponentClass | React.ReactNode,
  ) {
    const component = CheckPermissions(
      authority,
      target,
      classError || Exception403,
    );
    return checkIsInstantiation(component);
  };
};

export default authorize;
