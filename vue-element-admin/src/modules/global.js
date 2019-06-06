export default {
    state: {
        loading: false,
        language: localStorage.getItem("language") || "zh"
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language
            localStorage.setItem("language", language);
        },
        SET_LOADING: (state, loading) => {
            state.loading = loading;
        }
    },
    actions: {
        setLanguage({ commit }, language) {
            commit("SET_LANGUAGE", language);
        }
    }
}