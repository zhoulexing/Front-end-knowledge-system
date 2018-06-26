const expressWs = require('express-ws');

function connect(app) {
  expressWs(app);
  app.ws('/', (ws, req) => {
    console.log('connect success');
    ws.on('message', function(msg) {
      console.log(msg);
      ws.send(msg);
    });
  });
}

module.exports = {
  connect
}
