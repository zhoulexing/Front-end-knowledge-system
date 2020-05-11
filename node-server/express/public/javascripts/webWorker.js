console.log("come in!");
var pollingWorker = createWorker(function(e) {
  var num;
  setInterval(function() {
    fetch("http://localhost:3000/webWorker/getData").then(function (res) {
      const result = res.json();
      result.then(data => {
        if(data.num === 10) {
          num = data.num;
          self.postMessage(num);
          //self.close();
        }
      });
    });
  }, 1000);
  self.onmessage = function(e) {
    console.log(e.data);
  }
});

pollingWorker.onmessage = function(e) {
  console.log(e.data);
  pollingWorker.terminate();
}

function createWorker(f) {
  var blob = new Blob(["(" + f.toString() + ")()"]);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}
