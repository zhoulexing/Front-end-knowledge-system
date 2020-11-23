import Taro from '@tarojs/taro';

interface Options {
    data?: any;
    headers?: any;
}

const baseUrl = '';

export default function request(url: string, options?: Options) {
    const defaultOpt: Options = {};
    const newOpt: Options = { ...defaultOpt, ...options };
    newOpt.headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',
        ...newOpt.headers,
    };
    return new Promise((resolve, reject) => {
        Taro.request({
            url: baseUrl + url,
            data: newOpt.data,
            header: newOpt.headers,
            success: (res) => {
                if(res?.data?.result) {
                    resolve(res.data);
                    return;
                } 
                reject(res.data.error);
            },
        });
    });
}