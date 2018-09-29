const { get } = require("../../utils/axios");

module.exports.getMockData = (req, res) => {
    get("/table/group?userid=admin", {
      params: { groupfield: 'tabletype' },
      createdtorder: 1
    }).then(_d => {
        res.status(200).json(_d);
    });
}

module.exports.getEsData = (req, res) => {
    get("/esql/rest/search", {
        sql: "select * from people_type"
    }).then(_d => {
        res.status(200).json(_d);
    });
}
