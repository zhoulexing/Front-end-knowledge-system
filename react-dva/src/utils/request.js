import fetch from "dva/fetch";
import { notification } from "antd"; 
import store from "../index";
import { routerRedux } from "dva/router";

function parseJSON(response) {
	return response.json();
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	notification.error({
		message: `请求错误 ${response.status}: ${response.url}`,
		description: response.statusText,
	});
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

/**
 * 发起请求
 * @param  {string} url       
 * @param  {object} [options] 
 * @return {promise}           
 */
export default function request(url, options) {
	const defaultOpt = {
		credentials: "include",
	};
	const newOpt = { ...defaultOpt, ...options };

	if (newOpt.method === "POST" || newOpt.method === "PUT") {
		newOpt.headers = {
			Accept: "application/json",
			"Content-Type": "application/json; charset=utf-8",
			...newOpt.headers,
		};
		newOpt.body = JSON.stringify(newOpt.body);
	}

	return fetch(url, newOpt)
		.then(checkStatus)
		.then(parseJSON)
		.catch(err => {
			const { dispatch } = store;
			dispatch(routerRedux.push("/login"));
		});
}
