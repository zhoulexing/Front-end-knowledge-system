export default {

    namespace: "global",

    state: {
        collapsed: false
    },

    effects: {
        
    },

    reducers: {
        changeLayoutCollapsed(state: any, { payload }: any) {
            return {
                ...state,
                collapsed: payload
            }
        }
    },

    subscriptions: {
        setup({ history, dispatch }: any) {
            return history.listen(({ pathname, search }: any) => {
                if (typeof window.ga !== "undefined") {
                    window.ga("send", "pageview", pathname + search);
                }
            });
        },
    }
};
