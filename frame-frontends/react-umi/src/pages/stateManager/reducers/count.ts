export interface InitialStateType {
    count: number;
}

export const initialState = {
    count: 0,
};

export const reducer = (state: InitialStateType, action: { type: string }) => {
    switch (action.type) {
        case 'INCREASE':
            return {
                ...state,
                count: state.count + 1,
            };
        case 'DECREASE':
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
};
