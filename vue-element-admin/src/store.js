import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function loadModules() {
    const out = {};
    const modules = require.context("./modules", true, /[A-Za-z0-9-_,\s]+\.js$/i);
    
    modules.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const name = matched[1];
            out[name] = modules(key).default;
        }
    });
    return out;
}

export default new Vuex.Store({
    modules: loadModules()
});
