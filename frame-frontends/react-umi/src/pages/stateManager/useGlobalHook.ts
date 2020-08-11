import { useState, useEffect } from 'react';

interface ObjectModel {
    [key: string]: any;
}

interface ListenerFunc {
    (state: ObjectModel): void;
}

export interface StoreModel {
    state: ObjectModel;
    listeners: ListenerFunc[];
    setState: (state: any) => void;
    actions: ObjectModel;
}

function setState(this: StoreModel, newState: ObjectModel) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => {
        listener(this.state);
    });
}

function associateActions(store: StoreModel, actions: ObjectModel) {
    const associatedActions = {};

    Object.keys(actions).forEach(key => {
        if (typeof actions[key] === 'function') {
            associatedActions[key] = actions[key].bind(null, store);
        }

        if (typeof actions[key] === 'object') {
            associatedActions[key] = associateActions(store, actions[key]);
        }
    });

    return associatedActions;
}

function useCustom(this: StoreModel) {
    const newListener = useState<ObjectModel>()[1];

    useEffect(() => {
        this.listeners.push(newListener);

        return () => {
            this.listeners = this.listeners.filter(
                listener => listener !== newListener,
            );
        };
    }, []);

    return [this.state, this.actions];
}

const useGlobalHook = (initialState: ObjectModel, actions: ObjectModel) => {
    const store = ({
        state: initialState,
        listeners: [],
    } as unknown) as StoreModel;
    store.setState = setState.bind(store);
    store.actions = associateActions(store, actions);
    return useCustom.bind(store);
};

export default useGlobalHook;
