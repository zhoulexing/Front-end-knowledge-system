import useGlobalHook from './useGlobalHook';
import * as actions from './actions';

const initialState = {
    count: 0,
    name: 'zlx',
    loading: false,
};

const useGlobal = useGlobalHook(initialState, actions);

export default useGlobal;
