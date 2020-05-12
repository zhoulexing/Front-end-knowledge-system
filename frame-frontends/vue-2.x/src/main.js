import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from "./i18n";
import './element.js';
import './index.less';
import './mock.js';
import './icons';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
