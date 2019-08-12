const axios = require("axios");
const q = require("q");
const qs = require("querystring");
const baseUrl = "http://127.0.0.1:3001";

function get(url, params) {
    if (url) {
        url = baseUrl + url;
    }
    console.info(url, JSON.stringify(params));
    var deffered = q.defer();
    axios.get(url, {
        params: params
    })
    .then(function (reps) {
        return deffered.resolve(reps.data);
    })
    .catch(function (error) {
        return deffered.reject({error: error});
    });
    return deffered.promise;
}

function post(url, params) {
    if (url) {
        url = baseUrl + url;
    }
    console.info(url, JSON.stringify(params));
    var deffered = q.defer();
    var data = qs.stringify({params: JSON.stringify(params)});
    axios.post(url, data)
    .then(function (reps) {
        return deffered.resolve(reps.data);
    })
    .catch(function (error) {
        return deffered.reject({error: error});
    });
    return deffered.promise;
}

module.exports = { get, post };
