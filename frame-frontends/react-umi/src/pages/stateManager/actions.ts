import { StoreModel } from './useGlobalHook';

function asyncGet(data: any) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, 20);
    })
}

const count = {
    increase(store: StoreModel) {
        store.setState({
            count: store.state.count + 1,
        });
    },
    decrease(store: StoreModel) {
        store.setState({
            count: store.state.count - 1,
        });
    },
};

const user = {
    async getName(store: StoreModel) {
        store.setState({ loading: true });
        const name = await asyncGet(store.state.name === 'zlx' ? 'yww' : 'zlx');
        store.setState({ name, loading: false });
    }
};

export { count, user };
