import * as Sentry from "../../components/sentry/sentry-minapp.wx.min";
import { captureException } from "../../components/sentry/util";

const app = getApp();

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    uploadError: function() {
        // Sentry.captureException(new Error("this is a test error 1."));
        captureException(new Error("this is a test error 1."));
    },
    uploadTypeError: function() {
        const str = null;
        try {
            str.split(",");
        } catch(err) {
            Sentry.captureException(err);
        }
    },
    uploadErrorByOption: function() {
        Sentry.captureException(new Error("this is a test error by option."));
    },
    uploadMsg: function() {
        Sentry.captureMessage("Hello, sentry-miniapp!");
    },
    uploadMsgByLevel: function() {
        Sentry.captureMessage("Hello, sentry-miniapp of level!", "info"); // error, warning, info
    },
    uploadCatch: function() {
        try {
            throw new Error("this is a try catch error.");
        } catch (error) {
            Sentry.captureException(error);
        }
    },
    throwError: function() {
        throw new Error("this is a throw error");
    },
    typeError: function() {
        const str = null;
        str.split(",");
    },
    promiseCatch: function() {
        getData().then(params => {
            console.log(params.name);
        }).catch(err => {
            throw new Error(err);
        });
    }
});

function getData(params) {
    return new Promise(resolve => {
        resolve(params);
    });
}
