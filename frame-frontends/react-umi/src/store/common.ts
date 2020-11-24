import {
  ReducersMapObject, Reducer, AnyAction, Dispatch,
} from "redux";
import { GlobalModelState } from "@/models/global";
import { ExampleModelState } from "@/models/example";

export interface EffectsCommandMap {
    put: <A extends AnyAction>(action: A) => any;
    call: Function;
    select: Function;
    take: Function;
    cancel: Function;
    [key: string]: any;
}

export type MiddlewareFunction = (store: any) => (next: any) => (action: any) => any;

export interface ReducerEnhancer {
    (reducer: Reducer<any, any>): void;
}

export type EffectType = "takeEvery" | "takeLatest" | "watcher" | "throttle";
export type EffectWithType = [Effect, { type: EffectType }];
export type ReducersMapObjectWithEnhancer = ReducersMapObject | [
    ReducersMapObject,
    ReducerEnhancer
];

export interface EffectsMapObject {
    [key: string]: Effect | EffectWithType;
}

export interface SubscriptionsMapObject {
    [key: string]: Subscription;
}

export interface Model {
    namespace: string;
    state?: any;
    reducers?: ReducersMapObjectWithEnhancer
    effects?: EffectsMapObject;
    subscriptions?: SubscriptionsMapObject;
}

export interface RouterModelState {
    location: any;
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

export interface ErrorEnhancer extends Error {

}

export interface ConnectState {
    router: RouterModelState;
    global: GlobalModelState;
    example: ExampleModelState;
}
