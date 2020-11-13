import { Toast } from "antd-mobile";
import { isSuperLink } from './util';

interface Options {
    method?: "GET" | "POST";
    [propName: string]: any;
}

interface TypedResponse<T = any> extends Response {
    json<P = T>(): Promise<P>;
}

export const baseUrl = "http://localhost:3001";
export const loginBaseUrl = "";

export default function request<T>(url: string, options?: Options): Promise<T> {
    if(!isSuperLink(url)) {
        url = baseUrl + url;
    }

    const defaultOpt: Options = {};
    const newOpt: Options = { ...defaultOpt, ...options };
    newOpt.headers = {
        Accept: "application/json",
        ...newOpt.headers,
    };

    return fetch(url, newOpt)
        .then(checkStatus)
        .then(parseJSON)
        .catch((err) => {
            throw err;
        });
}

function parseJSON(response: TypedResponse) {
    return response.json();
}

function checkStatus(response: TypedResponse) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    Toast.fail(response.statusText);
    const error = new Error(response.statusText);
    throw error;
}
