import { AnyAction, Dispatch } from "redux";
import { GlobalModelState } from "./global";

interface EffectsCommandMap {
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

export interface ListenCallbackParams {
    pathname: string;
    search: string;
}

export type ListenCallback = (params: ListenCallbackParams) => void;

export interface HistoryEnhancer extends History {
    listen: (callback: ListenCallback) => void;
}

export interface SubscriptionAPI {
    history: HistoryEnhancer;
    dispatch: Dispatch<any>;
}

export type Subscription = (api: SubscriptionAPI, done: Function) => void;
