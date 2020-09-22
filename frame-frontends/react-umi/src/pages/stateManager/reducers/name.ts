export const initialState = {
    name: 'zlx',
};

export const reducer = (state: object, action: { payload: string; type: string }) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.payload,
            };
        default:
            return state;
    }
};
