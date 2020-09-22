import React, { createContext, useContext, useReducer, Reducer } from 'react';

interface ReducersType {
    [key: string]: { reducer: Reducer<any, any>, initialState: any };
}

interface ProviderProps {
    reducers: ReducersType;
    initialState: any;
}

const StateContext = createContext({});

const combine = (reducers: ReducersType, initialState: any) => {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};
    const finalStates = { global: initialState };
    reducerKeys.forEach(key => {
        if(typeof reducers[key].reducer === 'function') {
            finalReducers[key] = reducers[key].reducer;
            finalStates[key] = reducers[key].initialState;
        }
    });

    const finalReducerKeys = Object.keys(finalReducers);

    function combination(state = {}, action: { type: string }) {
        const nextState = {};
        finalReducerKeys.forEach(key => {
            const reducer = finalReducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
        });
        return nextState;
    }

    return {
        reducer: combination,
        state: finalStates
    }
}

const createStore = (reducers: Reducer<any, any>, initialState: any) => {
    const [state, dispatch] = useReducer(reducers, initialState);
    return { state, dispatch };
}


export const Provider: React.FC<ProviderProps> = ({ children, reducers, initialState }) => {
    const result = combine(reducers, initialState);
    return <StateContext.Provider value={createStore(result.reducer, result.state)}>{children}</StateContext.Provider>;
};

export const useGlobalState = () => {
    return useContext<any>(StateContext);
};
