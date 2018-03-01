import request from "../../src/utils/request";

export async function queryNotices() {
    return request('/api/notices');
}
