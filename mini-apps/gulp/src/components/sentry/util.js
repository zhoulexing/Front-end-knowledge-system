import * as Sentry from "./sentry-minapp.wx.min";

const app = getApp();
const { environment } = app.globalData;

export function captureException(error) {
    if (environment === "dev" && error) {
        captureException = function() {
            Sentry.captureException(error);
        };
        Sentry.captureException(error);
    }
}

export function captureMessage(message, _level) {
    const level = _level || "info";
    if (environment === "dev" && message) {
        captureMessage = function() {
            Sentry.captureMessage(error, level);
        };
        Sentry.captureMessage(error, level);
    }
}
