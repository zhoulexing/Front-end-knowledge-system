import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./antd";


Vue.config.productionTip = false;

let instance = null;

function render(routes) {
    instance = new Vue({
        router: routes || router,
        render: h => h(App)
    }).$mount("#root");
}

if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap(props) {
    console.log("[vue] vue app bootstraped：", props);
    Vue.prototype.$mainUtils = props.utils || {};
}

export async function mount({ ROUTES }) {
    console.log("[vue] props from main framework");
    render(ROUTES);
}

export async function unmount() {
    instance.$destroy();
    instance = null;
}

