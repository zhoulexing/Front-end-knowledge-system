
function parseParam(ag) {
    for (var i = 0; i < ag.length; i++) {
        let arg = ag[i];
        if (/shark:\/\//.test(arg)) {
            return arg.replace(/shark:\/\//, '');
        }
    }
    return '';
}

module.exports = {
    parseParam: parseParam
}