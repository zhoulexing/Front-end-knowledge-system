import fetch from "isomorphic-fetch";
import { notification } from "antd";
import store from "@/store";
import { push } from "connected-react-router";

interface TypedResponse<T = any> extends Response {
    json<P = T>(): Promise<P>;
}

function parseJSON(response: TypedResponse) {
    return response.json();
}

interface ErrorRest extends Error {
    response: TypedResponse;
}

function checkStatus(response: TypedResponse) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    notification.error({
        message: `请求错误 ${response.status}: ${response.url}`,
        description: response.statusText
    });
    const error = new Error(response.statusText) as ErrorRest;
    error.response = response;
    throw error;
}

interface Options {
    [propName: string]: any;
}

export default function request<T>(url: string, options: object): Promise<T> {
    const defaultOpt: Options = {};
    const newOpt: Options = { ...defaultOpt, ...options };
    newOpt.headers = {
        Accept: "application/json",
        ...newOpt.headers
    };
    return fetch(url, newOpt)
        .then(checkStatus)
        .then(parseJSON)
        .catch(() => {
            const { dispatch } = store;
            dispatch(push("/login"));
        });
}