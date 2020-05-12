
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
    __REDUX_DEVTOOLS_EXTENSION__: any
}
