
(function() {
  if("serviceWorker" in window.navigator) {
    window.addEventListener("load", function () {
      // scope指定service worker控制的内容的子目录
      navigator.serviceWorker.register('/serviceWorker.js', { scope: "/" })
      .then(function(reg) {
        console.log("yes, it did:", reg);
      }).catch(function(err) {
        console.log("No it didn't. This happened:", err);
      });
    });
  }
})();
