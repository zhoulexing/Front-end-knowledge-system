import { Get } from "utils/request";

export default {
    state: {
        success: false
    },
    mutations: {
        DO_LOGIN(state, data) {
            state.success = data.success;
        }
    },
    actions: {
        async doLogin({ commit }, { loginForm, that }) {
            const data = await Get("/api/doLogin", loginForm);
            commit("DO_LOGIN", data);
            if(data.success) {
                that.$router.push("/apps/desktop");
            }
        }
    },
}