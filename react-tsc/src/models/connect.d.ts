import { AnyAction, Dispatch } from "redux";
import { GlobalModelState } from "./global";

export interface EffectsCommandMap {
    put: <A extends AnyAction>(action: A) => any;
    call: Function;
    select: Function;
    take: Function;
    cancel: Function;
    [key: string]: any;
}

export interface ConnectState {
    global: GlobalModelState;
}

export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & {
        select: <T>(func: (state: ConnectState) => T) => T;
    }
) => void;

export interface SubscriptionAPI {
    history: History;
    dispatch: Dispatch<any>;
}

export type Subscription = (api: SubscriptionAPI, done: Function) => void;
