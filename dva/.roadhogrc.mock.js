import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';

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
		if(password === '123456' && userName === 'hzjs'){
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
};

export default noProxy ? {} : delay(proxy, 1000);
