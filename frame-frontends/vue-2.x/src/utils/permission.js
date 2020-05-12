import router from "../router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "./auth";


NProgress.configure({ showSpinner: false });


router.beforeEach((to, from, next) => {
    NProgress.start();
    if(getToken()) {
        if(to.path === "/login") {
            next({ path: "/apps" });
            NProgress.done();
        } else {
            
        }
    }
});