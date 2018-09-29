module.exports = {
    "GET /table/group": {
        "proxy": "http://192.168.10.142:8080/comparison/rest",
        "response": {
            "success": true,
            "total": 234343242,
            "took": 15,
            "hits|5": [
                {
                    "_id": "345234542435435",
                    "_index": "people_all_v4",
                    "_type": "base",
                    "_source": {
                        "XM": "@cname()",
                        "ZJHM": "@id",
                        "MZ": "汉族",
                        "CSRQ": "@date()",
                        "HJDXZ": "@county(true) @cword(3)街道@natural(60, 100)号"
                    }
                }
            ]
        }
    },
    "GET /esql/rest/search": {
        "proxy": "http://192.168.10.84:8086",
        "response": {
            "success": true,
            "total": 234343242,
            "took": 15,
            "hits|5": [
                {
                    "_id": "3452345424354351111",
                    "_index": "people_all_v4",
                    "_type": "base",
                    "_source": {
                        "XM": "@cname()",
                        "ZJHM": "@id",
                        "MZ": "汉族",
                        "CSRQ": "@date()",
                        "HJDXZ": "@county(true) @cword(3)街道@natural(60, 100)号"
                    }
                }
            ]
        }
    }
};
