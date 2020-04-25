import Vue from "vue/dist/vue.esm.js";

function vueRender({ appContent, loading }) {
  return new Vue({
    template: `
      <div id="vue">
        <h4 v-if="loading">Loading...</h4>
        <div v-html="appContent" />
      </div>
    `,
    data() {
      return {
        appContent,
        loading,
      };
    },
  }).$mount("#vue");
}

let app = null;

export default function render({ appContent, loading }) {
  if (!app) {
    app = vueRender({ appContent, loading });
  } else {
    app.appContent = appContent;
    app.loading = loading;
  }
}
