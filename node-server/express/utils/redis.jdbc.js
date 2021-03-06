/*
* 连接redis内存数据库
* */

const redis = require("redis");
const q = require('q');
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
* 根据key获取数据，通过async，await的方式
* */
/*async function get(key) {
  return await new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if(err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}*/
function get(key) {
  const deferred = q.defer();
  redisClient.get(key, (err, value) => {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(value);
    }
  });
  return deferred.promise;
}

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
/*async function hget(hashkey, key) {
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
function hget(hashkey, key) {
  const deferred = q.defer();
  redisClient.hget(hashkey, key, (err, value) => {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(value);
    }
  });
  return deferred.promise;
}

/*
* hash数据类型，但同时可以设置多对key-value, value也可以是对象
* */
function hmset(key, value) {
  redisClient.hmset(key, value);
}

/*
* 根据key获取所有的东西
* */
/*async function hgetall(key) {
  return await new Promise((resolve, reject) => {
    redisClient.hgetall(key, (err, value) => {
      if(err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}*/
function hgetall(key) {
  const deferred = q.defer();
  redisClient.hgetall(key, (err, value) => {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(value);
    }
  });
  return deferred.promise;
}

module.exports = { initRedis, set, get, hset, hget, hmset, hgetall };

