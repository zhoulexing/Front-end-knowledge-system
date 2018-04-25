/*
* 连接redis内存数据库
* */

const redis = require("redis");
let redisClient = null;


/*
* 初始化redis
* */
function initRedis(ip, port) {
  // 创建客户端， 并且增加超时选项
  redisClient = redis.createClient(port || 6379, ip || "127.0.0.1", { connect_timeout: 1000 });
  
  // 进行连接
  redisClient.on("connect", error => {
    if(!error) {
      console.log("redis connect success !");
    }
  });
  
  // 连接失败
  redisClient.on("error", error => {
    console.log("连接失败:", error);
  });
  
  return redisClient;
}

/*
* 根据key获取数据
* */
function* get(key) {
  yield new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if(err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}
/*async function get(key) {
  return await new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if(err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
}*/

/*
* 设置一队key，value
* */
function set(key, value) {
  redisClient.set(key, value);
}

/*
* 设置哈希数据类型的key, value
* */
function hset(hashkey, key, value) {
  redisClient.hset(hashkey, key, value);
}

/*
* 获取哈希数据中的某一个字段值
* */
/*async function hget(hashkey) {
  return await new Promise((resolve, reject) => {
    redisClient.hget(hashkey, key, (err, value) => {
      if(err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}*/

module.exports = { initRedis, set, get };

