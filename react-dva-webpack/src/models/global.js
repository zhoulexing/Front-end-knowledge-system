export default {

    namespace: "global",

    state: {
        collapsed: false,
        loading: false,
    },

    effects: {
        
    },

    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload
            }
        }
    },

    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname, search }) => {
                if (typeof window.ga !== "undefined") {
                    window.ga("send", "pageview", pathname + search);
                }
            });
        },
    }
};
