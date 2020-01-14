declare module "dva";
declare module "dva-loading";
declare module "path-to-regexp";
declare module "connected-react-router";
declare module "redux-devtools-extension";

declare module "*.css";
declare module "*.less";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

interface GAFieldsObject {
    eventCategory: string;
    eventAction: string;
    eventLabel?: string;
    eventValue?: number;
    nonInteraction?: boolean;
}
interface Window {
    ga: (
        command: "send",
        hitType: "event" | "pageview",
        fieldsObject: GAFieldsObject | string
    ) => void;
    devToolsExtension: () => any
}
declare let ga: Function;
