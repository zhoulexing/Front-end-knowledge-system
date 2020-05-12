import request from "utils/request";

export function getUserList() {
  return request("/api/userList");
}

export function getUserMsg() {
  return request("/api/userMsg");
}
