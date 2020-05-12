export function parseQueryString(url) {
    const reg_url = /^[^\?]+\?([\w\W]+)$/;
    const reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g;
    const arr_url = reg_url.exec(url);
    const ret = {};
    if(arr_url && arr_url[1]) {
        const str_para = arr_url[1];
        let result;
        while((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;
}