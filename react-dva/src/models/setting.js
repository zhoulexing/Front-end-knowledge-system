import { message } from "antd";
import { mappings, i18n } from "../i18n/index";

let defaultLocale = localStorage.getItem("locale");
if(!defaultLocale || defaultLocale === "undefined") {
    defaultLocale = mappings.ZH_CN;
}
export default {
    namespace: "setting",
    state: {
        locale: defaultLocale,
        messages: i18n[defaultLocale]
    },
    effects: {},
    reducers: {
        setLocale(state, { payload }) {
            localStorage.setItem("locale", payload);
            return {
                ...state,
                locale: payload,
                messages: i18n[payload]
            }
        },
        setTheme(state, { payload }) {
            updateTheme(payload);
            return { ...state }
        }
    },
    subscriptions: {
        set({dispatch, history}) {
            return history.listen(() => {
                
            });
        }
    }
}

let lessNodesAppended;
function updateTheme(primaryColor) {
    if(!primaryColor) {
        return;
    }
    const hideMessage = message.loading("正在编译主题!", 0);
    function buildIt() {
        if(!window.less) {
            return;
        }
        setTimeout(() => {
            window.less.modifyVars({
                "@primary-color": primaryColor
            })
            .then(() => {
                hideMessage();
            })
            .catch(() => {
                message.error("Failed to update theme");
                hideMessage();
            });
        }, 200);
    }
    if(!lessNodesAppended) {
        const lessStyleNode = document.createElement("link");
        const lessConfigNode = document.createElement("script");
        const lessScriptNode = document.createElement("script");
        lessStyleNode.setAttribute("rel", "stylesheet/less");
        lessStyleNode.setAttribute("href", "/color.less");
        lessConfigNode.innerHTML = `window.less = {
            async: true,
            env: "development",
            javascriptEnabled: true
        }`;
        lessScriptNode.src = "https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js";
        lessScriptNode.async = true;
        lessScriptNode.onload = () => {
            buildIt();
            lessScriptNode.onload = null;
        };
        document.body.appendChild(lessStyleNode);
        document.body.appendChild(lessConfigNode);
        document.body.appendChild(lessScriptNode);
        lessNodesAppended = true;
    } else {
        buildIt();
    }
}