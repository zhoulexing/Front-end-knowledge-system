import { atom } from 'recoil';

export interface GlobalStateProps {
    count: number;
    name: string;
}

const globalState = atom({
    key: 'globalState',
    default: {
        count: 0,
        name: 'zlx'
    } as GlobalStateProps
});

export default globalState;