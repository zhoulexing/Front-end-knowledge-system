import Taro from "@tarojs/taro";

interface Options {
    data?: any;
    header?: any;
    method?: "GET" | "POST";
    "Content-Type"?: string;
}
interface ResponseSuccess {
    result: boolean;
    data: any;
}

interface ResponseError {
    errorCode: number;
    errorMessage: string;
    data?: null;
}

const baseUrl = "";

export default function request(
    url: string,
    options?: Options
): Promise<ResponseSuccess | ResponseError> {
    const defaultOpt: Options = {
        method: "GET",
    };
    const newOpt: Options = { ...defaultOpt, ...options };
    newOpt.header = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...newOpt.header,
    };
    return new Promise((resolve, reject) => {
        Taro.request({
            url: baseUrl + url,
            mode: "cors",
            credentials: "include",
            data: newOpt.data,
            success: (res) => {
                if (res?.data?.result) {
                    resolve(res.data);
                    return;
                }
                reject(res?.data?.error);
            },
            ...newOpt,
        });
    });
}
