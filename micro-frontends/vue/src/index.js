import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./antd";

// import Antd from "ant-design-vue";
// Vue.use(Antd);

// import Button from "ant-design-vue/es/button";
// import 'ant-design-vue/es/button/style';
// Vue.use(Button);


Vue.config.productionTip = false;

let instance = null;

function render() {
    instance = new Vue({
        router,
        render: h => h(App)
    }).$mount("#root");
}

if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
    console.log("[vue] props from main framework", props);
    render();
}

export async function unmount() {
    instance.$destroy();
    instance = null;
}
