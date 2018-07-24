const CACHE_NAME = "EXPRESS_NODE";

/*
* 监听安装事件
* */
this.addEventListener("install", event => {
  // 安装阶段跳过waiting
  this.skipWaiting();
  // 创建和打开一个缓存库
  caches.open(CACHE_NAME);
  
  let cacheResources = [
  ];
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(cacheResources);
    })
  );
});

/*
* 监听active事件
* */
this.addEventListener("active", event => {
  console.log("service worker is active");
});

/*
* 监听fetch事件
* */
this.addEventListener("fetch", event => {
  event.respondWith(
    // ignoreVary: 表示只要请求url相同就认为是同一个资源
    caches.match(event.request, { ignoreVary: true }).then(response => {
      if(response) {
        // 如果取得是html，则发个请求看html是否更新了,因为serviceWorker.js内容也在html里
        /*if(response.headers.get("Content-Type").indexOf("text/html") >= 0) {
          let url = new URL(event.request.url);
          util.updateHtmlPage(url, event.request.clone(), event.clientId);
        }*/
        return response;
      }
      return util.fetchPut(event.request.clone());
    })
  );
});

let util = {
  fetchPut: function (request, callback) {
    return fetch(request).then(response => {
      // 跨域的资源直接return, response.status会返回0
      if(!response || response.status !== 200 || response.type !== "basic") {
        return response;
      }
      util.putCache(request, response.clone());
      typeof callback === "function" && callback();
      return response;
    });
  },
  
  putCache: function (request, resource) {
    // 缓存里面的资源只能是GET，通过POST请求是不能缓存的
    if(request.method === "GET") {
      caches.open(CACHE_NAME).then(cache => {
        cache.put(request, resource);
      });
    }
  },
  
  delCache: function (url) {
    caches.open(CACHE_NAME).then(cache => {
      cache.delete(url, { ignoreVary: true });
    });
  }
};
