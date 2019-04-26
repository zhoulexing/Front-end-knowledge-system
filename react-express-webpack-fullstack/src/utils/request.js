function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * 通过url请求数据
 * @param {string} url 请求路劲
 * @param {object} options 请求参数 
 * @return {promise} 
 */
export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => data)
        .catch(err => err);
}