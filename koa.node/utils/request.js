const axios = require("axios");
const { baseUrl } = require("../config");

function getUrl(url, params) {
    if(url) {
        url = baseUrl + url;
    }
    if(!params) {
        return url;
    } 
    if(url.indexOf("?") > -1) {
        url = `${ url }&params=${ JSON.stringify(params) }`;
    } else {
        url = `${ url }?params=${ JSON.stringify(params) }`;
    }
    return encodeURI(url);
}

function get(url, params) {
    url = getUrl(url, params);
    console.log(url);
    return new Promise((resolve, reject) => {
        const result = axios.get(url);
        result.then(res => {
            resolve(res.data);
        }).catch(err => {
            console.error(`status: ${ err.response.status }, message: ${ err.message }`);
            reject(err);
        });
    });
}

function post(url, params) {
    if(url) {
        url = baseUrl + url;
    }
    console.log(`${ url } ${ params ? JSON.stringify(params) : "" }`);
    return new Promise((resolve, reject) => {
        const result = axios.post(url, { params });
        result.then(res => {
            resolve(res.data);
        }).catch(err => {
            console.error(`status: ${ err.response.status }, message: ${ err.message }`);
            reject(err);
        });
    });
}

module.exports = {
    get,
    post
};