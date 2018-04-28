import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';
import { getNotices } from "./mock/notices";

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
	'POST /api/login/account': (req, res) => {
		const { password, userName, type } = req.body;
		if(password === '123456' && userName === 'admin'){
			res.send({
				status: 'ok',
				type,
				currentAuthority: 'admin'
			});
			return ;
		}
		if(password === '123456' && userName === 'user'){
			res.send({
				status: 'ok',
				type,
				currentAuthority: 'user'
			});
			return ;
		}
		res.send({
			status: 'error',
			type,
			currentAuthority: 'guest'
		});
  	},
    'GET /api/login/currentUser': {
        $desc: "获取当前用户接口",
        $params: {
            pageSize: {
                desc: '分页',
                exp: 2,
            }
        },
        $body: {
            name: 'admin',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            userid: '00000001'
        }
    },
    'GET /api/notices': getNotices,
	'GET /api/500': (req, res) => {
		res.status(500).send({
		"timestamp": 1513932555104,
		"status": 500,
		"error": "error",
		"message": "error",
		"path": "/base/category/list"
		});
	},
	'GET /api/404': (req, res) => {
		res.status(404).send({
		"timestamp": 1513932643431,
		"status": 404,
		"error": "Not Found",
		"message": "No message available",
		"path": "/base/category/list/2121212"
		});
	},
	'GET /api/403': (req, res) => {
		res.status(403).send({
			"timestamp": 1513932555104,
			"status": 403,
			"error": "Unauthorized",
			"message": "Unauthorized",
			"path": "/base/category/list"
		});
	},
	'GET /api/401': (req, res) => {
		res.status(401).send({
			"timestamp": 1513932555104,
			"status": 401,
			"error": "Unauthorized",
			"message": "Unauthorized",
			"path": "/base/category/list"
		});
	},
    'GET /api/example/getTblList': {
        $desc: "获取表格数据接口",
        $params: {
            pageSize: {
                desc: '分页',
                exp: 2,
            }
        },
        $body: {
            dataSource: [{
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
            }, {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园2号'
            }, {
                key: '3',
                name: '胡彦清',
                age: 52,
                address: '西湖区湖底公园3号'
            }, {
                key: '4',
                name: '胡彦里',
                age: 62,
                address: '西湖区湖底公园4号'
            }],
            columns: [{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }]
        }
    }
};

export default noProxy ? {} : delay(proxy, 1000);
