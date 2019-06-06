import axios from "axios";
import store from "@/store.js";


// 请求拦截器
axios.interceptors.request.use(config => {
    store.commit("SET_LOADING", true);
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
    store.commit("SET_LOADING", false);
    return response;
}, error => {
    return Promise.reject(error);
});

export function Get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
    });
}

export function Post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
    });
}